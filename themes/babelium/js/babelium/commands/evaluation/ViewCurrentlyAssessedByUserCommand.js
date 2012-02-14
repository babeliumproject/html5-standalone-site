
/**
 * ViewCurrentlyAssessedByUserCommand
 */
var ViewCurrentlyAssessedByUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_ASSESMENTS_BYUSER}}", function ()
		{
			BP.EvaluationDelegate.viewAssessedByUser(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_ASSESMENTS_BYUSER}}",
							{module : "evaluate", action : "byuser"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ASSESMETS_BYUSER}}");
	}
});