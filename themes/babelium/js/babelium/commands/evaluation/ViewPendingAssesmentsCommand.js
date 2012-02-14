
/**
 * ViewPendingAssesmentsCommand
 */
var ViewPendingAssesmentsCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_ASSESMENTS_PENDING}}", function ()
		{
			BP.EvaluationDelegate.viewPendingAssesments(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_ASSESMENTS_PENDING}}",
							{module : "evaluate", action : "pending"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_EVALUATION}}");
	}
});