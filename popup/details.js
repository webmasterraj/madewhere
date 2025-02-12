// DOM Elements
const sourcesList = document.getElementById('sourcesList');
const sourceTemplate = document.getElementById('sourceTemplate');
const notFoundImg = chrome.runtime.getURL("assets/notfound.png");

// Get marketplace name from domain
function getMarketplaceName(domain) {
    const marketplaces = {
        'www.amazon.com': 'Amazon US',
        'www.amazon.in': 'Amazon India',
        'www.amazon.co.uk': 'Amazon UK',
        'www.amazon.de': 'Amazon Germany',
        'www.amazon.co.jp': 'Amazon Japan',
        'www.amazon.fr': 'Amazon France',
        'www.amazon.it': 'Amazon Italy',
        'www.amazon.es': 'Amazon Spain',
        'www.amazon.ca': 'Amazon Canada',
        'www.amazon.com.au': 'Amazon Australia'
    };
    return marketplaces[domain] || domain;
}

// Create source element from template
function createSourceElement(source) {
    const template = sourceTemplate.content.cloneNode(true);
    
    // Set marketplace name and link
    const marketplaceLink = template.querySelector('.marketplace-link');
    const marketplaceName = template.querySelector('.marketplace-name');
    marketplaceLink.href = source.url;
    marketplaceName.textContent = getMarketplaceName(source.domain);
    
    // Add origin country flag
    const flagImg = template.querySelector('.origin-flag');
    const originName = template.querySelector('.origin-name');
    if (source.country) {
        flagImg.src = source.country.flag;
        flagImg.alt = source.country.name;
        originName.textContent = source.country.name;
    } else {
        flagImg.src = notFoundImg;
        flagImg.alt = "Country not found";
        originName.textContent = "Country not found";
    }
    
    return template;
}

// Initialize popup
document.addEventListener("DOMContentLoaded", () => {
    console.log('Initializing popup');
    chrome.storage.local.get('countryInfo', (result) => {
        if (result.countryInfo) {
            console.log('Initializing popup with countryInfo', result.countryInfo);
            const { sources } = result.countryInfo;
            // Clear existing sources
            sourcesList.innerHTML = '';
            
            
            // Add each source
            console.log('Initializing popup with sources', sources);
            sources.forEach(source => {
                const sourceElement = createSourceElement(source);
                sourcesList.appendChild(sourceElement);
            });
            console.log('Sources list', sourcesList);
            
            // Clear the stored data
            chrome.storage.local.remove('countryInfo');
            console.log('Removing countryInfo');
        }
    });
});