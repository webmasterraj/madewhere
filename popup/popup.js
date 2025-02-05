EnabledCheck.addEventListener("change", function(e)
{
    chrome.runtime.sendMessage({action:"toggle", enabled:this.checked});
});

chrome.storage.sync.get("enabled", function (data)
{
    EnabledCheck.checked = data.enabled;
});
