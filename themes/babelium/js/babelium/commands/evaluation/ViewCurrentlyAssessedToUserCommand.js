
/**
 * ViewCurrentlyAssessedToUserCommand
 */
var ViewCurrentlyAssessedToUserCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_ASSESMENTS_TOUSER}}", function ()
		{
			BP.EvaluationDelegate.viewAssessedToUser(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_ASSESMENTS_TOUSER}}",
							{module : "evaluate", action : "touser"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ASSESMETS_TOUSER}}");
	}
});