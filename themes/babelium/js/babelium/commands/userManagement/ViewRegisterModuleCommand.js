
/**
 * ViewRegisterModuleCommand
 */
var ViewRegisterModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_REGISTER_FORM}}", function ()
		{
			BP.RegisterDelegate.viewRegisterModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_REGISTER_FORM}}", {module : "register"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_REGISTER_FORM}}");
	}
});