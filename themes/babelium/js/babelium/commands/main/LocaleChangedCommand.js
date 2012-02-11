
/**
 * LocaleChangedCommand
 */
var LocaleChangedCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var locale = this.data;
		
		if ( locale == null )
			return;
		
		if ( window.location.href.indexOf("?") != -1 )
			window.location.href += "&locale=" + locale;
		else
			window.location.href += "?locale=" + locale;
	}
});