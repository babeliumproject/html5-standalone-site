
/**
 * SignOutCommand
 */
var SignOutCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		BP.AuthDelegate.signOut(this);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		
		if ( response.content.indexOf("<li>") != -1 )
		{
			$("li#loginhelper").html("");
			$("ul#usernav").html(response.content);
			
			if ( BP.SM.at("home") )
			{
				$("aside#motd").fadeOut(500, function(){$(this).remove();});
				// set true as data will reload motd
				new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE, true).dispatch();
			}
			else 
				new ViewChangeEvent(ViewChangeEvent.RELOAD_STATE, BP.SM.currentState()).dispatch();
		}
	},
	
	onFault : function ()
	{
		alert("Error trying to connect to the login server");
	}
});