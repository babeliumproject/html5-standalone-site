
/**
 * ViewEvaluationModuleCommand
 */
var ViewEvaluationModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("evaluation module", function ()
		{
			BP.EvaluationDelegate.viewEvaluationModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Evaluation - Babelium Project", {module : "evaluation"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading evaluation module");
	}
});