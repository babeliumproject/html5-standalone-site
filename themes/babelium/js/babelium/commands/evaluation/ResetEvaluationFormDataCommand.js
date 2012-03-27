
/**
 * ResetEvaluationFormDataCommand
 */
var ResetEvaluationFormDataCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		$(".ratyPreview").each(function()
		{
			$(this).raty("cancel");
		});
		
		$("#responseCommentEval").val("");
	}
});