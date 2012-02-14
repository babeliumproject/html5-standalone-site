var ActivateUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		if ( this.data == null )
			return;

		BP.RegisterDelegate.activateUser(this, this.data);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		
	
		new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE, true).dispatch();
	},
	
	onFault : function ()
	{
		alert("{{$ERROR_ACTIVATING_ACCOUNT}}");
	}
});