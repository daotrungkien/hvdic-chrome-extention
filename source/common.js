
var _UrlBase = 'https://hvdic.thivien.net/';

function openUrl(url) {
	chrome.tabs.create({active: true, url: url});
}

function openHVDicUrl(url) {
	openUrl(_UrlBase + url);
}

function CJKRegexClass() {
	// tool: https://mothereff.in/regexpu
	
	return '[\u2e80-\u2ef3]'		// 2E80 .. 2EF3 - CJK Radicals Supplement
		+ '|[\u2f00-\u2fd5]'		// 2F00 .. 2FD5	- Kangxi Radicals
		+ '|[\u4e00-\u9fff]'		// 4E00 .. 9FFF	- CJK Unified Ideographs
		+ '|[\u3400-\u4dbf]'		// 3400 .. 4DBF	- CJK Unified Ideographs Extension A
		+ '|[\uf900-\ufaff]'		// F900 .. FAFF	- CJK Compatibility Ideographs
		+ '|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\udedf]'						// 20000 .. 2A6DF	- CJK Unified Ideographs Extension B
		+ '|[\ud86a-\ud86c][\udc00-\udfff]|\ud869[\udf00-\udfff]|\ud86d[\udc00-\udf3f]'	// 2A700 .. 2B73F	- CJK Unified Ideographs Extension C
		+ '|\ud86d[\udf40-\udfff]|\ud86e[\udc00-\udc1f]'								// 2B740 .. 2B81F	- CJK Unified Ideographs Extension D
		+ '|[\ud86f-\ud872][\udc00-\udfff]|\ud86e[\udc20-\udfff]|\ud873[\udc00-\udeaf]'	// 2B820 .. 2CEAF	- CJK Unified Ideographs Extension E
		+ '|\ud873[\udeb0-\udfff]|[\ud874-\ud879][\udc00-\udfff]|\ud87a[\udc00-\udfef]'	// 2CEB0 .. 2EBEF	- CJK Unified Ideographs Extension E
		+ '|\ud87e[\udc00-\ude1d]';														// 2F800 .. 2FA1D	- CJK Compatibility Ideographs Supplement
}

function wordLookup(s, lang) {
	if (lang == 1) lstr = 'hv';
	else if (lang == 2) lstr = 'py';
	else if (lang == 3) lstr = 'nom';

	if ((new RegExp('^' + CJKRegexClass())).test(s) || /[0-9a-f]{4,5}/i.test(s))
		openHVDicUrl('w' + lstr + '/' + s);
	else openHVDicUrl(lstr + '/' + s);
}
