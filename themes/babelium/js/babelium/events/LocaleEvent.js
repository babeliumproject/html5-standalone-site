
/**
 * LocaleEvent
 */

var LocaleEvent = Cairngorm.Event.extend(
{
	init : function ( type, locale )
	{
		this._super(type, locale);
	}
});

// Constants
LocaleEvent.CHANGE = "localeChanged";