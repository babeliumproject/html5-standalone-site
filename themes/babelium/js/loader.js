var loading = false;
var SERVER_URL = "http://localhost";
//var GATEWAY = "modules/loader.php";
var GATEWAY = "api/rest.php";

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
	var query_string = SERVER_URL +"/"+ GATEWAY + "?class=Exercise&method=getExercises";
	
	$("#maincontent > aside#loader > div#loadcontext > span").html("Loading <strong>"+location+"</strong>");
	$("#maincontent > aside#loader").slideDown(500);

	$("#maincontent > section").slideUp(500, function()
	{
		$("#maincontent > section").remove();
		
		$.getJSON(query_string, function(data)
		{
			var content = "<section style='width:100%; background-color: green;'>";
			content += "<h1>Exercise List</h1>";
					
			// parse json
			$.each(data.Exercise.getExercises, function(i, item)
			{
				if ( item.id == undefined )
					return;
							
				content += "<article style='width:50%;height:100px;float:left;background-color:#CECECE;'>";
				content += "<h1 style='background-color:red;'>" + item.title + "</h1>";
				content += "</article>";
		
			});
						
			content += "</section>";
			content = $(content).hide();
			content.appendTo("#maincontent").slideDown(500);
			$("#maincontent > aside#loader").slideUp(500);
		});
	});
}
