function initNavigationLinks()
{
	/* ALL EXCEPT LAST CHILD */
	$("nav#mainnav > ul > li > a").not("nav#mainnav > ul > li:last-child > a").hover(function()
	{
		$(this).parent().css("background","url(themes/babelium/images/button_nav_highlight_"+$(this).attr('class')+".png) no-repeat 50% 58%,"+
										"url(themes/babelium/images/separator.png) no-repeat center right");
	}, function()
	{
		$(this).parent().css("background","url(themes/babelium/images/separator.png) no-repeat center right");
	});
	
	/* LAST CHILD */
	$("nav#mainnav > ul > li:last-child > a").hover(function()
	{
		$(this).parent().css("background","url(themes/babelium/images/button_nav_highlight_about.png) no-repeat 50% 58%");
	}, function()
	{
		$(this).parent().css("background-image","none");
	});
}