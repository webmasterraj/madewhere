importScripts("../lib/CStorage.js");
importScripts("../lib/country.js");

// sites to check for country
const amazonSites = ["www.amazon.com", "www.amazon.ca","www.amazon.co.uk", "www.amazon.in"];

// page sections configuration
const pageSections = [
    {
        name: "detailBullets",
        regex: /<div id="detailBulletsWrapper_feature_div"[\s\S]+?<\/div>/g,
        extractFn: (html) => {
            const a = html.substr(html.toLowerCase().indexOf("country of origin") + "country of origin".length);
            const b = a.substr(0, a.indexOf("</li>"));
            return b.match(/(?<=<span>).+?(?=<\/span>)/g)?.at(0);
        }
    },
    {
        name: "productDetails",
        regex: /<table id="productDetails_detailBullets_sections1"[\s\S]+?<\/table>/g,
        extractFn: (html) => {
            const a = html.substr(html.toLowerCase().indexOf("country of origin") + "country of origin".length);
            const b = a.substr(0, a.indexOf("</tr>"));
            return b.match(/(?<=<td[\s\S]+>)[\s\S]+?(?=<\/td>)/g)?.at(0);
        }
    },
    {
        name: "techSpecs",
        regex: /<table id="productDetails_techSpec_section_1"[\s\S]+?<\/table>/g,
        extractFn: (html) => {
            const a = html.substr(html.toLowerCase().indexOf("country of origin") + "country of origin".length);
            const b = a.substr(0, a.indexOf("</tr>"));
            return b.match(/(?<=<td[\s\S]+>)[\s\S]+?(?=<\/td>)/g)?.at(0);
        }
    }
];

async function checkSite(asin, site) {
    // console.log(`Checking ${site}...`);
	try {
        const pageHtml = await fetch(`https://${site}/dp/${asin}`).then(r => r.text());
        
        // Initialize source info
        let sourceInfo = {
            domain: site,
            url: `https://${site}/dp/${asin}`,
            section: null,
            country: null,
            timestamp: new Date().toISOString()
        };

        const countryOfOriginRegex = /[Oo]f [Oo]rigin/;
        
        for (const {name, regex, extractFn} of pageSections) {
            // console.log(`Checking ${name}...`);
			const html = pageHtml.match(regex)?.at(0);
            if (html && countryOfOriginRegex.test(html)) {
                const extractedText = extractFn(html);
                if (extractedText) {
                    // Clean the extracted text
                    const cleanText = extractedText
                        .replace(/[\u{0080}-\u{FFFF}]/gu, "")
                        .replace(/&.+;/g, "")
                        .trim();
                    
                    const country = getCountryFromText(cleanText);
                    if (country) {
                        sourceInfo = {
                            ...sourceInfo,
                            section: name,
                            country: country
                        };
                        break;
                    }
                }
            }
        }

        // console.log(`Finished checking ${site}: ${JSON.stringify(sourceInfo)}`);
		return sourceInfo;

    } catch (error) {
        console.error(`Error fetching ${site}:`, error);
        return {
            domain: site,
            url: `https://${site}/dp/${asin}`,
            section: null,
            country: null,
            timestamp: new Date().toISOString()
        };
    }
}

function handleCountryConflict(result, host) {
    const foundSources = result.sources.filter(s => s.country);
    const uniqueCountries = new Set(foundSources.map(s => s.country));
    
    // Set conflict flag if we found different countries
    result.hasConflict = uniqueCountries.size > 1;
    
    if (!result.hasConflict) {
        // No conflict - use the only country we found
        const countryName = foundSources[0].country;
        result.country = {
            name: countryName,
            code: getCountryCode(countryName),
            flag: getFlagUrl(getCountryCode(countryName))
        };
    } else {
        // We have a conflict - choose based on priority
        let selectedSource;
        
        if (host) {
            // Try to find country from current host first
            selectedSource = foundSources.find(s => s.domain === host);
        }
        
        if (!selectedSource) {
            // Go through amazonSites in order
            for (const site of amazonSites) {
                selectedSource = foundSources.find(s => s.domain === site);
                if (selectedSource) break;
            }
        }

        // Set the country from our selected source
        if (selectedSource) {
            const countryName = selectedSource.country;
            result.country = {
                name: countryName,
                code: getCountryCode(countryName),
                flag: getFlagUrl(getCountryCode(countryName))
            };
        }
    }
}

async function getCountry(asin, host) {
    // console.log(`Getting country for ${asin}...`);
	
	// Check storage first
    let savedData = await CSGet(asin);
    if (savedData?.sources?.length > 0) {
        return savedData;
    }

    // Initialize result structure
    const result = {
        country: undefined,
        sources: [],
        hasConflict: false
    };

    // Check all sites in parallel
    result.sources = await Promise.all(
        amazonSites.map(site => checkSite(asin, site))
    );

    // Handle conflicts and set the country
    handleCountryConflict(result, host);

    // Save to storage
    await CSSet(asin, result);
    
    return result;
}

const contentScript = {
    id: 'amazonFlags',
    matches: ['https://www.amazon.com/*'],
	js: [
		"lib/jquery-3.6.0.min.js",
		"js/contentScript.js"
	],
	css:["css/contentScript.css"],
    runAt: 'document_end'
};

// Set up content script at install time
chrome.runtime.onInstalled.addListener(function () 
{
    chrome.scripting.registerContentScripts([contentScript]);
    chrome.storage.local.clear();
    chrome.storage.sync.set({ enabled: true });
    console.log("Made in Where Installed.");
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) 
{
    if (request.action == "getCountryInfos") 
    {
        (async () => {
            try 
            {
                let countries = await Promise.allSettled(request.asins.map(asin=>getCountry(asin, request.host)));
                sendResponse(countries.map(c=>c.value));
            }
            catch (error) 
            {
                sendResponse(error);
            }
        })();

        return true;
    }
    else if (request.action == "toggle") 
    {
        if(request.enabled ?? true)
        {
            chrome.scripting.registerContentScripts([contentScript]);
            console.log("Script Enabled.");
        }
        else
        {
            chrome.scripting.unregisterContentScripts({ids: [contentScript.id]});
            console.log("Script Disabled.");
        }
        chrome.storage.sync.set({ enabled: (request.enabled ?? true) });
    }
});

// For testing to see if the code can get country of origin from different sections of each website
// (async () => {
//     console.log("🧪 Starting Country Detection Tests");
//     console.log("==================================");
    
//     const testCases = [
//         {
//             asin: "B081H3Y5NW",
//             description: "Product showing different countries (testing conflict resolution)",
//             expectedSources: {
//                 "www.amazon.com": {
//                     country: "China",
//                     section: "techSpecs"
//                 },
//                 "www.amazon.in": {
//                     country: null,
//                     section: null
//                 },
//                 "www.amazon.ca": {
//                     country: "Vietnam",
//                     section: "detailBullets"
//                 },
//                 "www.amazon.co.uk": {
//                     country: null,
//                     section: null
//                 }
//             },
//             hasConflict: true
//         },
//         {
//             asin: "B01B0ADMP8",
//             description: "Product with country in detailBullets",
//             expectedSources: {
//                 "www.amazon.com": {
//                     country: "USA",
//                     section: "detailBullets"
//                 },
//                 "www.amazon.in": {
//                     country: "USA",
//                     section: "techSpecs"
//                 },
//                 "www.amazon.ca": {
//                     country: null,
//                     section: null
//                 },
//                 "www.amazon.co.uk": {
//                     country: null,
//                     section: null
//                 }
//             },
//             hasConflict: false
//         },
//         {
//             asin: "B007RM3010",
//             description: "Product with country in detailBullets on .in",
//             expectedSources: {
//                 "www.amazon.com": {
//                     country: null,
//                     section: null
//                 },
//                 "www.amazon.in": {
//                     country: "United Kingdom",
//                     section: "detailBullets"
//                 },
//                 "www.amazon.ca": {
//                     country: null,
//                     section: null
//                 },
//                 "www.amazon.co.uk": {
//                     country: "Ireland",
//                     section: "techSpecs"
//                 }
//             },
//             hasConflict: true
//         }
//     ];
    
//     let totalTests = 0;
//     let passedTests = 0;
    
//     for (const testCase of testCases) {
//         console.log(`\n📦 Testing ${testCase.asin}: ${testCase.description}`);
        
//         // Clear storage for this ASIN
//         await CSRemove(testCase.asin);
        
//         // Run test once - it will check all sources
//         const result = await getCountry(testCase.asin);
        
//         // Test conflict flag
//         const conflictMatch = result.hasConflict === testCase.hasConflict;
//         totalTests++;
//         passedTests += conflictMatch ? 1 : 0;
//         console.log(`Conflict Flag: ${conflictMatch ? '✅' : '❌'} Expected: ${testCase.hasConflict}, Got: ${result.hasConflict}`);
        
//         // Test each source
//         for (const [site, expected] of Object.entries(testCase.expectedSources)) {
//             const source = result.sources.find(s => s.domain === site);
//             totalTests += 2; // country, section
            
//             // Compare results
//             const countryMatch = source?.country === expected.country;
//             const sectionMatch = source?.section === expected.section;
            
//             passedTests += countryMatch ? 1 : 0;
//             passedTests += sectionMatch ? 1 : 0;
            
//             // Log detailed results for this source
//             console.log(
//                 `\n   ${site} (${source?.url}):\n` +
//                 `      Country: ${countryMatch ? '✅' : '❌'} Expected: ${expected.country || 'null'}, Got: ${source?.country || 'null'}\n` +
//                 `      Section: ${sectionMatch ? '✅' : '❌'} Expected: ${expected.section || 'null'}, Got: ${source?.section || 'null'}`
//             );
//         }
        
//         // Log the full result object
//         console.log("\n   Full Result:");
//         console.log("   ", JSON.stringify(result, null, 2).replace(/\n/g, '\n   '));
//     }
    
//     // Print summary
//     console.log("\n📊 Test Summary");
//     console.log("==============");
//     console.log(`Passed: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
// })();