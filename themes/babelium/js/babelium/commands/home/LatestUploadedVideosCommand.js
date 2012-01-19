
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
		BP.SM.pushState("Home :: Latest uploaded videos - Babelium Project",
				{module : "home", action : "uploaded"});
		BP.CMS.innerMainContent(response);
	},
			
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error retrieving latest videos");
	}
});