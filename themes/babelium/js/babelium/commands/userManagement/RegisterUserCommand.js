
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
		
		BP.CMS.prepareMainContent("{{$LOADING_REGISTER_FORM}}", function ()
		{
			BP.RegisterDelegate.processRegister(_this, _this.data);
		});
		
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_REGISTER_FORM}}",  {module : "register"});
		BP.CMS.innerMainContent(response);
	
	},
	
	onFault : function ()
	{
		alert("{{$ERROR_REGISTERING_USER}}");
	}
});