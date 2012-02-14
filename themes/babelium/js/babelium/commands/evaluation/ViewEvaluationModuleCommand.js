
/**
 * ViewEvaluationModuleCommand
 */
var ViewEvaluationModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_EVALUATION_MODULE}}", function ()
		{
			BP.EvaluationDelegate.viewEvaluationModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_EVALUATION_MODULE}}", {module : "evaluate"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_EVALUATION_MODULE}}");
	}
});