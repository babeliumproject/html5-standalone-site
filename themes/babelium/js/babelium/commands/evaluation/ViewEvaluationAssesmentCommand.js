
/**
 * ViewEvaluationAssesmentCommand
 */
var ViewEvaluationAssesmentCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;

		BP.EM.selectedExercise = this.data.evaluation;
		BP.EM.selectedResponse = this.data.responseId;
		
		BP.SM.pushState("{{$TITLE_ASSESMENTS_PENDING}}",
				{module : "evaluate", action : "pending", params : this.data.responseId});
		
		BP.CMS.prepareExerciseView(function ()
		{
			BP.EvaluationDelegate.viewEvaluationAssesment(_this, _this.data.responseId);
		}, "evaluation");
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerExerciseView(response, true); // true = evaluation module
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ASSESMETS_PENDING}}");
	}
});