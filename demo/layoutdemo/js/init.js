$(document).ready(function()
{
	initLocalebox();
	initNavigationLinks();

	// Setup url change handler
	$(window).hashchange(function()
	{
		updateState(location.hash)
	});
	updateState(location.hash);
});

/**
 * URL CHANGE HANDLER
 */
function updateState(h)
{
	/**
	 * LOAD INITIAL SECTION
	 */
	hash = h.split("/");
	var location = hash[1];

	$("#motd").slideUp(500);
	$("section#maincontent > header").slideUp(500, function()
	{
		$("section#maincontent > header > h1").text("");
	});

	if ( location == null || location == "home" )
	{
		$("#motd").slideDown(500);
		// TODO: Load main section
	}
	else
	{
		$("section#maincontent > header").slideDown(500, function()
		{
			$("section#maincontent > header > h1").text(location);
		});
		// TODO: Load section
	}
}
