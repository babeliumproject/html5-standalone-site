
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
		BP.pushState({module : "home", action : "rated"}, 
				"Home :: Best rated videos - Babelium Project", 
				"?module=home&action=rated");
		BP.CMS.innerMainContent(response);
	},
					
	onFault : function ()
	{
		alert("Error retrieving best rated videos");
	}
});