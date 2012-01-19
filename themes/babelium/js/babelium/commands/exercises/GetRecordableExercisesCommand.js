
/**
 * GetRecordableExercisesCommand
 */
var GetRecordableExercisesCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("practice module", function ()
		{
			BP.PracticeDelegate.getRecordableExercises(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.pushState("Practice - Babelium Project", "?module=practice", {module : "practice" });
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading practice module");
	}
});