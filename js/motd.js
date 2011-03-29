var motdIndex = 1;
var motdVisible = true;

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
		case 37:
			updateMotd(-1);
			break;
		case 39:
			updateMotd(1);
			break;
		case 38:
			if ( $("#motd").is(":visible") && motdVisible)
			{
				motdVisible = false;
				$("#motd").hide( "blind", {}, 500);
			}
			break;
		case 40:
			if ( !$("#motd").is(":visible") && !motdVisible)
			{
				motdVisible = true;
				$("#motd").show( "blind", {}, 500);
			}
			break;
		default:
		}
	});

	/** Load first motd **/
	$("section#motdmessages > article:nth-child("+motdIndex+")").css("display","inline-block");
	$("section#motdmessages > article:nth-child("+motdIndex+")").animate({'opacity' : 1});
}

/** Update motd **/
function updateMotd(num)
{
	var lastMotdIndex = motdIndex;
	motdIndex = motdIndex+num;
	if ( motdIndex > 4 ) motdIndex = 1;
	else if ( motdIndex < 1 ) motdIndex = 4;
	$("section#motdmessages > article:nth-child("+lastMotdIndex+")").animate({'opacity' : 0}, function()
	{
		$(this).css("display","none");
		$("section#motdmessages > article:nth-child("+motdIndex+")").css("display","inline-block");
		$("section#motdmessages > article:nth-child("+motdIndex+")").animate({'opacity' : 1});
	});
}
