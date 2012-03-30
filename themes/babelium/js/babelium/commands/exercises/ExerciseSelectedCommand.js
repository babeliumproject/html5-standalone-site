
/**
 * ExerciseSelectedCommand
 */
var ExerciseSelectedCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( this.data == null )
			return;
		
		BP.EM.selectedExercise = this.data.exercise;
		
		if ( BP.SM.at("home") )
		{
			BP.CMS.prepareMainContent("{{$LOADING_EXERCISE_MODULE}}", function ()
			{
				BP.PracticeDelegate.viewExerciseByName(_this, BP.EM.selectedExercise.name, false);
			});
		}
		else
		{
			BP.CMS.prepareExerciseView(function ()
			{	
				BP.PracticeDelegate.viewExerciseByName(_this, BP.EM.selectedExercise.name, true);
			});
		}
	},
	
	onResult : function ( response )
	{
		if ( BP.SM.at("home") )
			BP.CMS.innerMainContent(response);
		else
			BP.CMS.innerExerciseView(response);
		
		BP.SM.pushState(BP.EM.selectedExercise.title + "{{$TITLE_SELECTED_EXERCISE}}",
				{module : "practice", action : "view", params : BP.EM.selectedExercise.name});
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_SELECTED_EXERCISE}}");
	}
});