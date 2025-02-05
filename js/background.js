importScripts("../lib/CStorage.js");
importScripts("../lib/country.js");

// sites to check for country
const amazonSites = ["www.amazon.ca","www.amazon.in", "www.amazon.com"];

async function getCountry(asin, host) 
{
	let savedCountry = await CSGet(asin);

	if (savedCountry === undefined) 
	{
		let pageDatas = await Promise.allSettled(
			amazonSites.map(async amazonSite=>{
				return new Promise(async (resolve, reject)=>{
					try
					{
						let data = {};
						data.pageHtml = await (await fetch(`https://${amazonSite}/dp/${asin}`, {credentials:"include",headers:{"same-cookies":"true"}})).text();
						data.host = amazonSite;
						resolve(data);
					}
					catch (error)
					{
						// console.log("There was an error...", error);
						resolve(null);
					}
				});
			})
		);

		pageDatas = pageDatas.filter(pageData=>pageData?.value?.pageHtml); // remove null values

		pageDatas.sort((a, b) => (a.value.host === host ? -1 : b.value.host === host ? 1 : 0)); // bringing the current host to the top

		for (let pageData of pageDatas) 
		{
			try
			{
				let pageHtml = pageData.value.pageHtml;

				// page sections where country of origin is found
				const detailBulletsHtml = pageHtml.match(/<div id="detailBulletsWrapper_feature_div"[\s\S]+?<\/div>/g)?.at(0);
				const prodDetailsHtml = pageHtml.match(/<table id="productDetails_detailBullets_sections1"[\s\S]+?<\/table>/g)?.at(0);
				const techSpecHtml = pageHtml.match(/<table id="productDetails_techSpec_section_1"[\s\S]+?<\/table>/g)?.at(0);
				
				// regex to check if 'country of origin' text is present in the page section
				const countryOfOriginRegex = /[Oo]f [Oo]rigin/;

				// Check page source to get a better idea of what this code is doing
				if (detailBulletsHtml && countryOfOriginRegex.test(detailBulletsHtml)) 
				{
					let a = detailBulletsHtml.substr(detailBulletsHtml.toLowerCase().indexOf("country of origin") + "country of origin".length);
					let b = a.substr(0, a.indexOf("</li>"));
					savedCountry = b.match(/(?<=<span>).+?(?=<\/span>)/g)?.at(0);
				}
				else if (prodDetailsHtml && countryOfOriginRegex.test(prodDetailsHtml))
				{
					let a = prodDetailsHtml.substr(prodDetailsHtml.toLowerCase().indexOf("country of origin") + "country of origin".length);
					let b = a.substr(0, a.indexOf("</tr>"));
					savedCountry = b.match(/(?<=<td[\s\S]+>)[\s\S]+?(?=<\/td>)/g)?.at(0);
				}
				else if (techSpecHtml && countryOfOriginRegex.test(techSpecHtml)) 
				{
					let a = techSpecHtml.substr(techSpecHtml.toLowerCase().indexOf("country of origin") + "country of origin".length);
					let b = a.substr(0, a.indexOf("</tr>"));
					savedCountry = b.match(/(?<=<td[\s\S]+>)[\s\S]+?(?=<\/td>)/g)?.at(0);
				}
				else continue;
				
				if(savedCountry) 
				{
					savedCountry = savedCountry.replace(/[\u{0080}-\u{FFFF}]/gu, "").replace(/&.+;/g, "").trim(); // removing any useless unicode characters
					
					CSSet(asin, savedCountry);

					return {asin, country: CountryData.find(x => x.name.toLowerCase() == savedCountry?.toLowerCase())};
				}
			}
			catch (error)
			{
				console.log("There was an error getting product info from", pageHtml, "for", asin, error);
			}
		}

		CSSet(asin, null); // no country was found for this asin
	}

	return {asin, country: CountryData.find(x => x.name.toLowerCase() == savedCountry?.toLowerCase())};
}

// For testing to see if the code can get country of origin from different sections of each website
(async () => {
    console.log("🧪 Starting Country Detection Tests");
    console.log("==================================");
    
    const testCases = [
        {
            asin: "B081H3Y5NW",
            description: "Product showing different countries on different sites",
            expectedResults: {
                "www.amazon.com": "China",
                "www.amazon.in": "Vietnam"
            }
        },
        {
            asin: "B01B0ADMP8",
            description: "Product with country in detailBullets",
            expectedResults: {
                "www.amazon.com": "USA"
            }
        },
        {
            asin: "B007RM3010",
            description: "Product with country in detailBullets on .in",
            expectedResults: {
                "www.amazon.in": "United Kingdom"
            }
        },
        {
            asin: "B0C811KLKZ",
            description: "Product with country in techSpecs on .in",
            expectedResults: {
                "www.amazon.in": "India"
            }
        }
    ];
    
    let totalTests = 0;
    let passedTests = 0;
    
    for (const testCase of testCases) {
        console.log(`\n📦 Testing ${testCase.asin}: ${testCase.description}`);
        
        for (const [site, expectedCountry] of Object.entries(testCase.expectedResults)) {
            totalTests++;
            
            // Clear storage only for this ASIN
            await CSRemove(testCase.asin);
            
            // Run test
            const result = await getCountry(testCase.asin, site);
            const actualCountry = result?.country?.name;
            
            // Compare result
            const passed = actualCountry === expectedCountry;
            passedTests += passed ? 1 : 0;
            
            // Log result with emoji and colors
            console.log(
                `   ${site}: ${passed ? '✅' : '❌'} ` +
                `Expected: ${expectedCountry}, ` +
                `Got: ${actualCountry || 'undefined'}`
            );
        }
    }
    
    // Print summary
    console.log("\n📊 Test Summary");
    console.log("==============");
    console.log(`Passed: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
})();

const contentScript = {
	id: 'amazonFlags',
	matches: ['https://www.amazon.com/*'],
	js: [
		"lib/jquery-3.6.0.min.js",
		"js/contentScript.js"
	],
	css:["css/contentScript.css"],
	runAt: 'document_end',
};

// Set up content script at install time
chrome.runtime.onInstalled.addListener(function () 
{
	chrome.scripting.registerContentScripts([contentScript]);
	chrome.storage.local.clear();
	chrome.storage.sync.set({ enabled: true });
	console.log("Made in Where Installed.");
});


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