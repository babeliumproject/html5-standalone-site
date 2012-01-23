
/**
 * ViewCurrentlyAssessedToUserCommand
 */
var ViewCurrentlyAssessedToUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("assessed to user", function ()
		{
			BP.EvaluationDelegate.viewAssessedToUser(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Evaluate :: Assessed to user - Babelium Project",
							{module : "evaluate", action : "touser"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading assessed to user");
	}
});