
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
		var id = BP.EM.selectedExercise.name;
		BP.pushState({module : "practice", action : "view", params : id},
				BP.EM.selectedExercise.title + " - Practice - Babelium Project",
				"?module=practice&action=view&params=" + id);
		BP.CMS.innerExerciseView(response);
	},
	
	onFault : function ()
	{
		alert("Error loading exercise");
	}
});