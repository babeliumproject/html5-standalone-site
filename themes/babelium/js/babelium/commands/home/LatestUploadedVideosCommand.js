
/**
 * LatestUploadedVideosCommand
 */
var LatestUploadedVideosCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("latest videos", function ()
		{
			BP.HomeDelegate.latestAvailableVideos(_this);
		}, true);
	},
		
	onResult : function ( response )
	{
		BP.pushState({module : "home", action : "uploaded"}, 
				"Home :: Latest uploaded videos - Babelium Project",
				"?module=home&action=uploaded");
		BP.CMS.innerMainContent(response);
	},
			
	onFault : function ()
	{
		alert("Error retrieving latest videos");
	}
});