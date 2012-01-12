
/**
 * ViewHomeModuleCommand
 */
var ViewHomeModuleCommand = Cairngorm.Command.extend(
{
	execute : function ( )
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("home", function ()
		{
			BP.HomeDelegate.viewHomeModule(_this, _this.data === true);
		}, true);
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Home - Babelium Project", {module : "home"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading home module");
	}
});