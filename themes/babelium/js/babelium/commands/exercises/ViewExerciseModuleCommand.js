
/**
 * ViewExerciseModuleCommand
 */
var ViewExerciseModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.EM.selectedExercise = null;

		BP.CMS.prepareMainContent("{{$LOADING_EXERCISE_MODULE}}", function ()
		{
			BP.PracticeDelegate.viewPracticeModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_EXERCISE_MODULE}}", {module : "practice"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_EXERCISE_MODULE}}");
	}
});