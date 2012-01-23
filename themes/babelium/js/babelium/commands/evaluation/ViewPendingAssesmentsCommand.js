
/**
 * ViewPendingAssesmentsCommand
 */
var ViewPendingAssesmentsCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("pending assesments", function ()
		{
			BP.EvaluationDelegate.viewPendingAssesments(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Evaluate :: Pending Assesments - Babelium Project",
							{module : "evaluate", action : "pending"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading pending assesments");
	}
});