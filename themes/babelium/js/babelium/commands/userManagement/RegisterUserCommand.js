var RegisterUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		if ( this.data == null )
			return;

		BP.RegisterDelegate.processRegister(this, this.data);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		console.log(response);
	
		//new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE, true).dispatch();
	},
	
	onFault : function ()
	{
		alert("Error while trying to register the user");
	}
});