
/**
 * ViewAboutModuleCommand
 */
var ViewAboutModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("about", function ()
		{
			BP.AboutDelegate.viewAboutModule(_this);
		});
	},
	
	onResult : function ( response )
	{

		BP.SM.pushState("About - Babelium Project", {module : "about"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading about module");
	}
});