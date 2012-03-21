
/**
 * ViewAssessedAssesmentCommand
 */
var ViewAssessedAssesmentCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.EM.selectedExercise = this.data.evaluation;
		BP.EM.selectedResponse = this.data.responseId;

		BP.SM.pushState("{{$TITLE_ASSESMENTS_BYUSER}}",
							{module : "evaluate", action : "byuser", params : this.data.responseId});
		
		BP.CMS.prepareExerciseView(function ()
		{
			BP.EvaluationDelegate.viewAssessedAssesment(_this, _this.data.responseId);
		}, "evaluation");
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerExerciseView(response, true); // true = evaluation module
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ASSESMETS_BYUSER}}");
	}
});