chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var blockList = [];
		chrome.storage.sync.get('blocked_sites', function(item) {
			if(item.blocked_sites !== undefined)
				blockList = item.blocked_sites;

		
			for(i in blockList) {
				if((blockList[i] != "") && (details.url.indexOf(blockList[i]) != -1) && (details.url.indexOf("chrome-extension://") == -1)) {
					chrome.tabs.update(details.tabId, {url:"./html/forbidden.html"});
					return {cancel: true};
				}
			}
		});
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

chrome.browserAction.onClicked.addListener(function(tab) {
	addBlock(tab.url, tab.id);
});

function addBlock(url, tabId) {
	if(url.indexOf("chrome-extension://") != -1)
		return false;

	var blockList = [];
	chrome.storage.sync.get('blocked_sites', function(item) {
		if(item.blocked_sites !== undefined)
			blockList = item.blocked_sites;

		blockList.push(url.split('/')[2]);

		chrome.storage.sync.set({'blocked_sites': blockList}, function() {
			chrome.tabs.update(tabId, {url:"./html/forbidden.html"});
		});
	});
}