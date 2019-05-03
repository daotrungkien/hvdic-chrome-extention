
var popupMsg = null;

function setBadgeText(txt) {
	chrome.browserAction.setBadgeText({text: (txt == null ? '' : '#')});
	popupMsg = txt;
}

chrome.runtime.onInstalled.addListener(function(i) {
	chrome.browserAction.setBadgeBackgroundColor({color: [255,255,0,127]});
	
	var m = 'Chú ý: ';
	if (i.reason == 'install')
		m += 'App vừa được cài đặt, ';
	else if (i.reason == 'update')
		m += 'App vừa được cập nhật mới, ';
	else return;

	m += 'hãy refresh những tab đã mở từ trước nếu bạn muốn tra từ trong đó';
	
	setBadgeText(m);
});


document.addEventListener('DOMContentLoaded', function () {
	chrome.contextMenus.create({
		'title': 'Tra từ Hán Việt: %s',
		'contexts': ['selection'],
		'onclick': function(info, tab) {
			wordLookup(info.selectionText.trim(), 1);
		}
	});

	chrome.commands.onCommand.addListener(function(c) {
		if (c == 'lookup-han' || c == 'lookup-pinyin') {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {msg: "get-selection"}, function(rep) {
					if (rep.text == '') alert('Hãy đánh dấu từ cần tra trước');
					else wordLookup(rep.text, c == 'lookup-pinyin' ? 2 : 1);
				});
			});
		}
	});
});

