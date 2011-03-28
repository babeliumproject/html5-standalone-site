$(document).ready(function()
{
	initNavigationLinks();
	initLocalebox();
});

$(function() {
	var availableTags = [
		"aa",
		"aaa",
		"bb",
		"bbb",
		"cc",
		"ccc",
		"dd",
		"ddd",
		"ee",
		"eee",
		"ff",
		"fff",
		"gg",
		"ggg",
		"hh",
		"hhh",
		"ii",
		"iii",
		"jj",
		"jjj",
		"kk",
		"kkk",
		"ll",
		"lll",
		"mm",
		"mmm",
		"nn",
		"nnn",
		"ññ",
		"ñññ",
		"oo",
		"ooo",
		"pp",
		"ppp",
		"qq",
		"qqq",
		"rr",
		"rrr",
		"ss",
		"sss",
		"tt",
		"ttt",
		"uu",
		"uuu",
		"vv",
		"vvv",
		"xx",
		"xxx",
		"yy",
		"yyy",
		"zz",
		"zzz"
	];

	$( "#txtSearch" ).autocomplete({
		source: availableTags
	});
});