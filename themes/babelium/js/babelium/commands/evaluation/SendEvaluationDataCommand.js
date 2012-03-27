
/**
 * SendEvaluationDataCommand
 */
var SendEvaluationDataCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var intonation = $("#intonationEval").raty("score");
		var fluency = $("#fluencyEval").raty("score");
		var rhythm = $("#rhythmEval").raty("score");
		var spontaneity = $("#spontaneityEval").raty("score");
		var overall = $("#overallEval").raty("score");
		var comment = $("#responseCommentEval").val();
		
		if ( intonation == null ) intonation = 0;
		if ( fluency == null ) fluency = 0;
		if ( rhythm == null ) rhythm = 0;
		if ( spontaneity == null ) spontaneity = 0;
		if ( overall == null ) overall = 0;
		
		var params = {"overallScore": overall * 2,
						"intonationScore" : intonation * 2,
						"fluencyScore" : fluency * 2,
						"rhythmScore" : rhythm * 2,
						"spontaneityScore" : spontaneity * 2,
						"comment" : comment};
		
		BP.EM.saveEvaluation(params, this.onSuccess);
	},
	
	onSuccess : function (data)
	{
		if ( data == undefined || data["response"] == undefined )
		{
			alert("Error while saving the assesment. Please try again later");
			return;
		}
		
		var result = data["response"];
		$("span#creditCount").text(result.creditCount);
		alert("Your assesment has been published. Thanks for your collaboration.");
		new EvaluationEvent(EvaluationEvent.VIEW_PENDING_ASSESMENTS).dispatch();
	}
});