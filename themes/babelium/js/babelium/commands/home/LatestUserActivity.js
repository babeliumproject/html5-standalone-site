
/**
 * LatestUserActivityCommand
 */
var LatestUserActivityCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_USER_ACTIVITY}}", function ()
		{
			BP.HomeDelegate.latestUserActivity(_this);
		}, true);
	},
			
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_USER_ACTIVITY}}", 
				{module : "home", action : "activity"});
		BP.CMS.innerMainContent(response);
	},
					
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_USER_ACTIVITY}}");
	}
});
