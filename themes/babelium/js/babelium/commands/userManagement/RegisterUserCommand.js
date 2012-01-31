
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
		
		var _this = this;
		
		BP.CMS.prepareMainContent("register", function ()
		{
			BP.RegisterDelegate.processRegister(_this, _this.data);
		});
		
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Register - Babelium Project",  {module : "register"});
		BP.CMS.innerMainContent(response);
	
	},
	
	onFault : function ()
	{
		alert("Error while trying to register the user");
	}
});