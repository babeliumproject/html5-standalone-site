var motdIndex = 1;
var motdVisible = true;
var animatingMotd = false;

function initMotd()
{
	var motdhelper = $("#motdhelper");
	
	motdhelper.css("top",$("#motdborder").css("top"));
	
	/** On click toggle visibility **/
	/*motdhelper.click(function()
	{
		$( "#motd" ).toggle( "blind", {}, 500);
		motdVisible = !motdVisible;
	});*/
	
	$("#motdmessages").resizable(
	{
		maxHeight: 150,
		minHeight: 50,
		handles: 's,n'
	});

	/** Key bindings for motd slides **/
	$(document).keydown(function (ev)
	{
		switch(ev.keyCode)
		{
		case 37: // Left Arrow
			updateMotd(-1);
			break;
		case 39: // Right Arrow
			updateMotd(1);
			break;
		case 38: // Up Arrow
			if ( jQuery.url.fragment(0) == null || jQuery.url.fragment(0) == "home" )
				$("#motd, #motd > div").slideUp(500);
			break;
		case 40: // Down Arrow
			if ( jQuery.url.fragment(0) == null || jQuery.url.fragment(0) == "home" )
				$("#motd, #motd > div").slideDown(500);
			break;
		default:
		}
	});

	/** Load first motd **/
	$("ul#motdmessages > li:nth-child("+motdIndex+")").css("display","inline-block");
	$("ul#motdmessages > li:nth-child("+motdIndex+")").animate({'opacity' : 1});
}

/** Update motd **/
function updateMotd(num)
{
	if ( animatingMotd ) return;
	//if ( $("#motd").css("display") == "none" ) return;
	animatingMotd = true;
	var lastMotdIndex = motdIndex;
	motdIndex = motdIndex+num;
	if ( motdIndex > 4 ) motdIndex = 1;
	else if ( motdIndex < 1 ) motdIndex = 4;
	$("ul#motdmessages > li:nth-child("+lastMotdIndex+")").animate({'opacity' : 0}, function()
	{
		$(this).css("display","none");
		$("ul#motdmessages > li:nth-child("+motdIndex+")").css("display","inline-block");
		$("ul#motdmessages > li:nth-child("+motdIndex+")").animate({'opacity' : 1});
		animatingMotd = false;
	});
}
