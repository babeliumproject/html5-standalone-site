
/**
 * Register Event
 */ 

var RegisterEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type, user )
	{
		this._super(type, user);
	}
});

// Constants
RegisterEvent.REGISTER_USER = "registerUser";
RegisterEvent.ACTIVATE_USER = "activateUser";