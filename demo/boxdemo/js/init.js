var lastState = -1;
var transition = false;

$(document).ready(function()
{
	// Enable syntax highlight
	SyntaxHighlighter.all();

	// Hide layers
	$("body > section").hide();

	// Setup url change handler
	$(window).hashchange(function()
	{
		updateState(location.hash)
	});
	updateState(location.hash);

	// Key Bindings
	$(document).keydown(function(e)
	{
		if (e.keyCode == 37) 
		{ // Left
			if ( transition )
				return;

			var h = window.location.hash;
			h = h.substr(8,h.lenght);
			h = parseInt(h) -1;
			
			if ( h > 0 )
				window.location.hash = "#example"+h;
			else
				window.location.hash = "#example11";
		}
		else if (e.keyCode == 39) 
		{ // Right 
			if ( transition )
				return;

			var h = window.location.hash;
			h = h.substr(8,h.lenght);
			h = parseInt(h) + 1;			

			if ( h <= 11 )
				window.location.hash = "#example"+h;
			else
				window.location.hash = "#example1";
		}
	});
});

// Update state
function updateState(h)
{
	transition = true;

	if ( lastState != -1 )
		$(lastState).hide(1000);

	// Default page
	if ( $(h).length == 0 )
	{
		transition = false;
		window.location.href = "#example1";
		return;
	}

	if ( h != lastState )
	{
		$(h).show(1500, function(){
			transition = false;
		});
		lastState = h;
	}
}
