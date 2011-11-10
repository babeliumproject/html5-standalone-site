
/**
 * LoginEvent
 */

var LoginEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type, user )
	{
		this._super(type, user);
	}
});

// Constants
LoginEvent.PROCESS_LOGIN = "processLogin";
LoginEvent.SIGN_OUT = "signOut";