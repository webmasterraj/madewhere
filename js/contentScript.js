console.log("Made in Where Injected.");

const notFoundImg = chrome.runtime.getURL("assets/notfound.png");
const loadingImg = chrome.runtime.getURL("assets/spinner.gif");

$(async () => 
{
    if (window.location.href.includes("/dp/")) // Product Page
    {
        const productAsin = window.location.href.match(/(?<=\/dp\/)[\w\d]+/g)?.at(0);

        console.log("Product Page", productAsin);

        if (productAsin) 
        {
            $("#productTitle").prepend(`
                <div class="azflag">
                    <span class="azTooltip">Country of origin: Searching</span>
                    <img class="azflag" src="${loadingImg}" />
                    <span class="azWarning" style="display: none;">⚠️</span>
                </div>
            `);

            let countryInfo = (await chrome.runtime.sendMessage({ action: "getCountryInfos", asins: [productAsin], host:window.location.host }))?.at(0);

            // Set flag
            $(`.azflag`).attr("src", countryInfo?.country?.flag || notFoundImg);
            
            // Set tooltip text
            let tooltipText = `Country of origin: ${countryInfo?.country?.name || "Not found"}`;
            if (countryInfo?.hasConflict) {
                tooltipText += '\n⚠️ Sources disagree';
                $('.azWarning').show();
            } else {
                $('.azWarning').hide();
            }
            tooltipText += '\nClick for details';
            $(`.azTooltip`).text(tooltipText);
        }
    }
    else // Listing Page
    {
        // Overriding some CSS to make sure the flag is visible
        $("body").append(`
            <style>
                [data-asin][data-uuid] .sg-row, [data-asin][data-uuid] .s-card-container, [data-asin][data-uuid] .s-overflow-hidden {
                    overflow: visible !important;
                }
              
            </style>
        `);

        // Cotinuously checking for new products and adding flags to them
        setInterval(async () => 
        {
            
            let ProductElements = document.querySelectorAll('[data-component-type="s-search-results"] [data-uuid][data-component-type][data-asin]:not(.flagged), [data-component-type="s-searchgrid-carousel"] .a-carousel-card[role="listitem"] [data-uuid]:not(.flagged), li.a-carousel-card[role="listitem"]>div:not(.flagged), ._octopus-search-result-card_style_apbSearchResultItem__2-mx4:not(.flagged)');

            if(!ProductElements.length) return; // No new products

            // Adding Flags to all products
            for (let i = 0; i < ProductElements.length; i++) 
            {
                const ProductElem = $(ProductElements[i]);
               
                try
                {
                    if(ProductElem.find(".azflag").length)
                    {
                        ProductElem.addClass("flagged");
                        continue; // flag already added
                    }
    
                    if(!ProductElem.attr("data-asin")) // For prodcuts that sometimes do not have asin in the attrs but have it in the product link
                    {
                        let prodHref =  ProductElem.find("h2>a").attr("href") || ProductElem.find(".a-link-normal").attr("href");
                        const asinGuess = decodeURIComponent(prodHref)?.match(/(?<=\/dp\/)[\w\d]+/g)?.at(0);
    
                        if(asinGuess) ProductElem.attr("data-asin", asinGuess);
                        else 
                        {
                            ProductElem.addClass("flagged");
                            continue;
                        }
                    }
    
                    if(ProductElem.find(".a-section>.s-product-image-container").length) // grid
                    {
                        ProductElem.find(`.s-product-image-container`).after(`
                            <div class="azflag" style="display: block;" data-asin="${ProductElem.attr("data-asin")}">
                                <span class="azTooltip">Country of origin: Searching</span>
                                <img src="${loadingImg}" />
                                <span class="azWarning" style="display: none;">⚠️</span>
                            </div>
                        `);
    
                        ProductElem.find("h2").attr("style","overflow:hidden !important");
                    }
                    else if (ProductElem.find(`.sg-col-inner h2>a`).length)  // List view
                    {
                        ProductElem.find(`.sg-col-inner h2>a`).before(`
                            <div class="azflag"  style="margin-right: 2px; margin-top: -5px;" data-asin="${ProductElem.attr("data-asin")}">
                                <span class="azTooltip">Country of origin: Searching</span>
                                <img src="${loadingImg}" />
                                <span class="azWarning" style="display: none;">⚠️</span>
                            </div>
                        `);
                    }
                    else if(ProductElem.find(".acs-product-block__product-image").length) // category grid view
                    {
                        ProductElem.find(`.acs-product-block__product-image`).after(`
                            <div class="azflag" style="display: block;" data-asin="${ProductElem.attr("data-asin")}">
                                <span class="azTooltip">Country of origin: Searching</span>
                                <img src="${loadingImg}" />
                                <span class="azWarning" style="display: none;">⚠️</span>
                            </div>
                        `);
    
                        ProductElem.find("h2").attr("style","overflow:hidden !important");
                    }
                    else
                    {
                        ProductElem.find(`a.a-link-normal:first`).after(`
                            <div class="azflag" style="display: block;" data-asin="${ProductElem.attr("data-asin")}">
                                <span class="azTooltip">Country of origin: Searching</span>
                                <img src="${loadingImg}" />
                                <span class="azWarning" style="display: none;">⚠️</span>
                            </div>
                        `);
                    }
                }
                catch (error)
                {
                    console.log("There was an adding flag...", error, ProductElem);
                }

                ProductElem.addClass("flagged");
            }

            let asins = [...document.querySelectorAll('.azflag[data-asin]:not(.azLoaded)')].map(e=>$(e).attr("data-asin"));
            asins = asins.filter(asin=>asin); // removing empty strings

            while(asins.length)
            {
                try
                {
                    let countryInfos = await chrome.runtime.sendMessage({ action: "getCountryInfos", asins:asins.splice(0,4), host:window.location.host });

                    for (const countryInfo of countryInfos) 
                    {
                        $(`.azflag[data-asin="${countryInfo.asin}"] img`).attr("src", countryInfo?.country?.flag || notFoundImg);
                        $(`.azflag[data-asin="${countryInfo.asin}"] .azTooltip`).text(`Country of origin: ${countryInfo?.country?.name || "Not found"}`);
                        if (countryInfo?.hasConflict) {
                            $(`.azflag[data-asin="${countryInfo.asin}"] .azWarning`).show();
                        } else {
                            $(`.azflag[data-asin="${countryInfo.asin}"] .azWarning`).hide();
                        }
                        $(`.azflag[data-asin="${countryInfo.asin}"]`).addClass("azLoaded");
                    }
                }
                catch (error)
                {
                    console.log("There was an error...", error, asins);
                }
            }

        }, 2 * 1000);

    }
});
