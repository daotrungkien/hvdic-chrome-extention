
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.msg == "get-selection") {
		sendResponse({text: window.getSelection().toString().trim() });
	}
});
