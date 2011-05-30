$(document).ready(function()
{
	// Load navigation menu
	$.get("nav.html", function(data)
	{
		var acc = $("#accordion");
		h = acc.css("height");
		w = acc.css("width");
		acc.html(data);
		var accw = $("#accwidget");
		accw.css("max-height", h);
		accw.css("max-width", w);
		accw.accordion({fillSpace: true});
		var info = $("#info");
		h = info.css("height").replace("px","") - 20 + "px";
		var infodiv = $("#info > div");
		infodiv.css("height", h);
		infodiv.css("max-height", h);
	})

	// Init tabs	
	$( "#tabs" ).tabs();

	// Setup url change handler
	$(window).hashchange(function()
	{
		updateState(location.hash)
	});
	updateState(location.hash);

	
	SyntaxHighlighter.all();
});

// Resize accordion on window resize
$(window).resize(function()
{
	$("#accwidget").css("display", "none");
	h = $("#accordion").css("height");
	$("#accwidget").css("max-height", h);
	$("#accwidget").css("display", "block");
	$("#accwidget").accordion("resize");
});

// Update state
var lastState = -1;
var lastView = -1;
function updateState(h)
{
	h = h.substr(1, h.length);

	// Default page
	if ( (h == "" || h == "WellCome") && h != lastState )
	{
		$.get("doc/Wellcome.html", function(data)
		{
			displayContent(data);
		})

		return;
	}

	if ( h != lastState )
	{
		$.get("doc/"+h+".html", function(data)
		{
			displayContent(data);
			SyntaxHighlighter.all();
		}).error(function()
		{// Error function
			$("#info > div").text("Not available");
			$("#examples > header").html("<h1>Error</h1>Section not found");
		});

		lastState = h;
	}

}

function displayContent(data)
{
	$(data).each(function(index)
	{
		var txt = $(this).text();

		if ( index == 0 )
			$("#examples > header").html($(this).html());
		else if ( index == 2 )
			$("#info > div").html($(this).html());
		else if ( index == 4 )
			$("#tabs-1 > pre").text(txt.replace("/**","").replace("**/",""));
		else if ( index == 6 )
			$("#tabs-2 > pre").text(txt.replace("/**","").replace("**/",""));
		else if ( index == 8 )
			$("#tabs-3 > pre").text(txt.replace("/**","").replace("**/",""));
	});
}
