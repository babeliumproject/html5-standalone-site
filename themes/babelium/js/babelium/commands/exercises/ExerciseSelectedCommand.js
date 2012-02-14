
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
		
		BP.CMS.prepareExerciseView(function ()
		{	
			BP.PracticeDelegate.viewExerciseByName(_this, BP.EM.selectedExercise.name);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState(BP.EM.selectedExercise.title + "{{$TITLE_SELECTED_EXERCISE}}",
				{module : "practice", action : "view", params : BP.EM.selectedExercise.name});
		BP.CMS.innerExerciseView(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_SELECTED_EXERCISE}}");
	}
});