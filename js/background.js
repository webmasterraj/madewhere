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
// Uncomment and run to see results in console
// (async () => 
// {
	// console.log(".com china", "B081H3Y5NW", await getCountry("B081H3Y5NW", "www.amazon.com")); 
	// await chrome.storage.local.clear();
	// console.log(".in vietnam", "B081H3Y5NW", await getCountry("B081H3Y5NW", "www.amazon.in"));

	// console.log(".com detailBullets", "B01B0ADMP8", await getCountry("B01B0ADMP8"));
	// console.log(".com techSpecs", "B08SBQXJQB", await getCountry("B08SBQXJQB"));
	// console.log(".com productDetails", "B0B9H8CCSL", await getCountry("B0B9H8CCSL"));

	
	// console.log(".in detailBullets", "B007RM3010", await getCountry("B007RM3010"));
	// console.log(".in techSpecs", "B0C811KLKZ", await getCountry("B0C811KLKZ"));
	// console.log(".in productDetails", "",await getCountry(""));

	
	// console.log(".ca detailBullets", "B07W7XK55Q", await getCountry("B07W7XK55Q"));
	// console.log(".ca techSpecs", "", await getCountry(""));
	// console.log(".ca productDetails", "B005W2BVMM", await getCountry("B005W2BVMM"));
// })();

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