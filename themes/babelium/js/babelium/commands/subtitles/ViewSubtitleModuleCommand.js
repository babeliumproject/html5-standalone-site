
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
		BP.pushState({module : "subtitles" }, "Subtitles - Babelium Project", "?module=subtitles");
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading subtitle module");
	}
});