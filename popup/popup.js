// Handle enable/disable toggle
EnabledCheck.addEventListener("change", function(e) {
    chrome.runtime.sendMessage({action:"toggle", enabled:this.checked});
});

chrome.storage.sync.get("enabled", function (data) {
    EnabledCheck.checked = data.enabled;
});

const notFoundImg = chrome.runtime.getURL("assets/notfound.png");

// DOM Elements
const defaultView = document.getElementById('defaultView');
const detailsView = document.getElementById('detailsView');
const backButton = document.getElementById('backButton');
const productTitle = document.getElementById('productTitle');
const sourcesList = document.getElementById('sourcesList');
const sourceTemplate = document.getElementById('sourceTemplate');

// Handle back button
backButton.addEventListener('click', () => {
    showDefaultView();
});

// View management
function showDefaultView() {
    defaultView.style.display = 'block';
    detailsView.style.display = 'none';
}

function showDetailsView() {
    defaultView.style.display = 'none';
    detailsView.style.display = 'block';
}

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
    marketplaceLink.href = source.url;
    
    // Add origin country flag
    const flagImg = template.querySelector('.origin-flag');
    if (source.originCountry) {
        flagImg.src = source.country.flag;
        flagImg.alt = source.country.name;
    } else {
        flagImg.src = notFoundImg;
        flagImg.alt = "Country not found";
    }
    
    return template;
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showCountryDetails') {
        console.log("Showing country details:", request);
        const { sources } = request.countryInfo;
        
        showDetailsView();

        // Clear existing sources
        sourcesList.innerHTML = '';
        
        // Add source elements
        sources.forEach(source => {
            sourcesList.appendChild(createSourceElement(source));
        });        

    }
});
