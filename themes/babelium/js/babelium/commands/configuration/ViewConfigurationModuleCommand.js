
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
		BP.pushState({module : "config" }, "Configuration - Babelium Project", "?module=config");
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading config module");
	}
});