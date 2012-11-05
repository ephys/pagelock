var blockList = [];
chrome.storage.sync.get('blocked_sites', function(item) {
	if(item.blocked_sites !== undefined)
		blockList = item.blocked_sites;

	console.log(item);
	$("#blocked_pages").val(blockList.join("\n"));
});

$("#btn_save").click(function() {
	chrome.storage.sync.set({'blocked_sites': $("#blocked_pages").val().split("\n")});
})