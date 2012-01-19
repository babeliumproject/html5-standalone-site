
/**
 * ViewConfigModuleCommand
 */
var ViewConfigModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("config module", function ()
		{
			BP.ConfigDelegate.viewConfigModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Configuration - Babelium Project", {module : "config" });
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading config module");
	}
});