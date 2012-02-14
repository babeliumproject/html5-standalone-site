
/**
 * SignedBestVideosCommand
 */
var SignedBestVideosCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_BEST_VIDEOS}}", function ()
		{
			BP.HomeDelegate.topScoreMostViewedVideos(_this);
		}, true);
	},
			
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_BEST_VIDEOS}}", 
				{module : "home", action : "rated"});
		BP.CMS.innerMainContent(response);
	},
					
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_BEST_VIDEOS}}");
	}
});