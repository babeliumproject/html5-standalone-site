
/**
 * GetRecordableExercisesCommand
 */
var GetRecordableExercisesCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_EXERCISE_MODULE}}", function ()
		{
			BP.PracticeDelegate.getRecordableExercises(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.pushState("{{$TITLE_EXERCISE_MODULE}}", "?module=practice", {module : "practice" });
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_EXERCISE_MODULE}}");
	}
});