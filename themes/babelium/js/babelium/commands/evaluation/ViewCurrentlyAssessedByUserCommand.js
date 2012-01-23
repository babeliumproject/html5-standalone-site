
/**
 * ViewCurrentlyAssessedByUserCommand
 */
var ViewCurrentlyAssessedByUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("assessed by user", function ()
		{
			BP.EvaluationDelegate.viewAssessedByUser(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Evaluate :: Assessed by user - Babelium Project",
							{module : "evaluate", action : "byuser"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading assessed by user");
	}
});