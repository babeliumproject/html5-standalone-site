
/**
 * ViewRegisterModuleCommand
 */
var ViewRegisterModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("register", function ()
		{
			BP.RegisterDelegate.viewRegisterModule(_this);
		});
	},
	
	onResult : function ( response )
	{

		BP.SM.pushState("Register - Babelium Project", {module : "register"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading register module");
	}
});