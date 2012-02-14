
/**
 * LatestUploadedVideosCommand
 */
var LatestUploadedVideosCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_LATEST_UPLOADED_VIDEOS}}", function ()
		{
			BP.HomeDelegate.latestAvailableVideos(_this);
		}, true);
	},
		
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_LATEST_UPLOADED_VIDEOS}}",
				{module : "home", action : "uploaded"});
		BP.CMS.innerMainContent(response);
	},
			
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_LATEST_UPLOADED_VIDEOS}}");
	}
});