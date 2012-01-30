
/**
 * RegisterUserCommand 
 */
var RegisterUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		if ( this.data == null ){
			return;
		}
		
		//TODO
		//If I use this, the parameters of the form get lost because we remove the form from the DOM
		BP.CMS.prepareMainContent("register", function ()
		{
			BP.RegisterDelegate.processRegister(this, this.data);
		});
		
	},
	
	onResult : function ( response )
	{
		//TODO
		//If there are errors in the register it should display a <div> with those errors and the register form
		//If the register was successful it should display a page stating that an activation email has been sent to your email and after a delayed timer do ViewChangeEvent.HOME
		
		
		//If I don't use prepareMainContent in the previous step I can't push the state and I can't use innerMainContent() because _loading=false
		BP.pushState("Register - Babelium Project",  {module : "register"});
		BP.CMS.innerMainContent(response);
	
	},
	
	onFault : function ()
	{
		alert("Error while trying to register the user");
	}
});