var loading = false;
var SERVER_URL = "http://localhost/";
var GATEWAY = "modules/bridge.php";

/*
 * Parses location when catched navigation
 * back/foward events and loads the appropiate module
 */
function updateLocation(event)
{
	load(event.state.module);
}

/*
 * Module change function
 * <a> links should use this function
 */
function go(location)
{
	load(location);
	window.history.pushState({module : location }, location, "?module="+location);
}

/*
 * Loads selected module and state
 */
function load(location)
{
	var query_string = SERVER_URL +"/"+ GATEWAY + "?module=" + location;
	
	$("#maincontent > aside#loader > div#loadcontext > span").html("Loading <strong>"+location+"</strong>");
	$("#maincontent > aside#loader").slideDown(500);

	$("#maincontent > section").slideUp(500, function()
	{
		$("#maincontent > section").remove();
		
		$.getJSON(query_string, function(data)
		{
			$("#maincontent > header > h1").text(data.title);
			var content = $(data.content).hide();
			content.appendTo("#maincontent").slideDown(500);
			$("#maincontent > aside#loader").slideUp(500);
		});
	});
}
