var loading = false;

function updateLocation(event)
{
	//alert(event.state);
}


function go(location)
{
	window.history.pushState(null, "New location", "?module="+location);
}
