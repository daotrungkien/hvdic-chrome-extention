
function updatePopupMsgView() {
	var bkPage = chrome.extension.getBackgroundPage(),
		m = $('#message');
	if (bkPage.popupMsg == null) m.hide();
	else {
		m.html(bkPage.popupMsg);
		if (!m.is(':visible')) m.slideDown();
		bkPage.setBadgeText(null);
	}
}

function formLookup(lang) {
	var s = $('.lookup #text').val().trim();
	if (s == '') {
		chrome.extension.getBackgroundPage().setBadgeText('Hãy nhập từ cần tra trước');
		updatePopupMsgView();
	} else wordLookup(s, lang);
}

document.addEventListener('DOMContentLoaded', function () {
	updatePopupMsgView();
	
    $('.quick-links li').click(function(e) {
		var l = e.target.dataset.href;
		if (l != undefined) openHVDicUrl(l);
	});
	
	$('a[data-href]').click(function(e) {
		var l = e.target.dataset.href;
		if (l != undefined) openUrl(l);
	});
	
	$('.lookup button').click(function(e) {
		formLookup($(e.target).data('lang'));
	});
	
	$('.lookup').submit(function(e) {
		formLookup(1);
		e.preventDefault();
	});
	
	$('#show-help').click(function() {
		var e = $('.help-info');
		if (e.is(':visible')) e.slideUp();
		else e.slideDown();
	});
});

