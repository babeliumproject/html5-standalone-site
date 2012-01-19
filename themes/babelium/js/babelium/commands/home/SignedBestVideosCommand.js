
/**
 * SignedBestVideosCommand
 */
var SignedBestVideosCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("best videos", function ()
		{
			BP.HomeDelegate.topScoreMostViewedVideos(_this);
		}, true);
	},
			
	onResult : function ( response )
	{
		BP.SM.pushState("Home :: Best rated videos - Babelium Project", 
				{module : "home", action : "rated"});
		BP.CMS.innerMainContent(response);
	},
					
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error retrieving best rated videos");
	}
});