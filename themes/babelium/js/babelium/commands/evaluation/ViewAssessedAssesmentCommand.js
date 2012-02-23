
/**
 * ViewAssessedAssesmentCommand
 */
var ViewAssessedAssesmentCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareExerciseView(function ()
		{
			BP.EvaluationDelegate.viewAssessedAssesment(_this, _this.data.responseId);
		}, "evaluation");
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_ASSESMENTS_BYUSER}}",
							{module : "evaluate", action : "byuser"});
		BP.CMS.innerExerciseView(response, true); // true = evaluation module
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ASSESMETS_BYUSER}}");
	}
});