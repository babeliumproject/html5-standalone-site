
/**
 * ProcessLoginCommand
 */
var ProcessLoginCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		if ( this.data == null )
			return;

		$("li#loginhelper").html("<img src='themes/babelium/images/loading.gif' alt='Loading..' width='16' height='16' />");
		BP.AuthDelegate.processLogin(this, this.data);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		
		if ( response.content.indexOf("<li>") != -1 )
		{
			// Logged in
			$("li#loginhelper").html("");
			$("ul#usernav").html(response.content);
			BP.CMS.hideLoginPopup();
			
			if ( BP.at("home") )
			{
				$("aside#motd").fadeOut(500, function(){$(this).remove();});
				// set true as data will reload motd
				new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE, true).dispatch();
			}
		}
		else
			$("li#loginhelper").html(response.content);
	},
	
	onFault : function ()
	{
		alert("Error trying to connect to the login server");
	}
});