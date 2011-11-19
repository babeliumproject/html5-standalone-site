
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
		
		BP.selectedExercise = this.data.exercise;
		
		BP.CMS.prepareExerciseView("exercise: " + BP.selectedExercise.id, function ()
		{	
			BP.PracticeDelegate.viewExerciseById(_this, BP.selectedExercise.id);
		});
	},
	
	onResult : function ( response )
	{
		BP.pushState({module : "practice", action : "view", params : BP.selectedExercise.id},
				BP.selectedExercise.title + " - Practice - Babelium Project",
				"?module=practice&action=view&params="+ BP.selectedExercise.id);
		BP.CMS.innerExerciseView(response);
	},
	
	onFault : function ()
	{
		alert("Error loading exercise");
	}
});