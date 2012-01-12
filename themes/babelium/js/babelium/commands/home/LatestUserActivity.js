
/**
 * LatestUserActivityCommand
 */
var LatestUserActivityCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("latest activity", function ()
		{
			BP.HomeDelegate.latestUserActivity(_this);
		}, true);
	},
			
	onResult : function ( response )
	{
		BP.SM.pushState("Home :: Best rated videos - Babelium Project", 
				{module : "home", action : "activity"});
		BP.CMS.innerMainContent(response);
	},
					
	onFault : function ()
	{
		alert("Error retrieving latest user activity");
	}
});
