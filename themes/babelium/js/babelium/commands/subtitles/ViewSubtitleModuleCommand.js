
/**
 * ViewSubtitleModuleCommand
 */
var ViewSubtitleModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("subtitle module", function ()
		{
			BP.SubtitleDelegate.viewSubtitleModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Subtitles - Babelium Project", {module : "subtitle"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading subtitle module");
	}
});