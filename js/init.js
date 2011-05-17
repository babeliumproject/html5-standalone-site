var SERVER_URL = "http://localhost/main/";
var GATEWAY = "rest/rest.php";

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
		$("#motd").slideDown(500, function()
		{
			var query_string = SERVER_URL +"/"+ GATEWAY + "?class=Exercise&method=getExercises";
			
			$.getJSON(query_string, function(data)
			{
				var content = "<section style='width:100%; background-color: green;'>";
				content += "<h1>Exercise List</h1>";

				/* parse json */
				$.each(data.getExercises, function(i, item)
				{
					if ( item.id == undefined )
						return;
					
					content += "<article style='width:50%;height:100px;float:left;background-color:#CECECE;'>";
					content += "<h1 style='background-color:red;'>" + item.title + "</h1>";
					
					content += "</article>";
					
				});
				
				content += "</section>";
				$("#maincontent").html(content);
			});
		});
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


function loadSection(data)
{
	alert(data.getExercises);
}