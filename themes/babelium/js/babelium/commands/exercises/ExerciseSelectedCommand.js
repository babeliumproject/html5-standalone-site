
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
	
		var id = BP.selectedExercise.id + ";" + BP.selectedExercise.name;
		
		BP.CMS.prepareExerciseView(function ()
		{	
			BP.PracticeDelegate.viewExerciseByName(_this, id);
		});
	},
	
	onResult : function ( response )
	{
		var id = BP.selectedExercise.id + ";" + BP.selectedExercise.name;
		BP.pushState({module : "practice", action : "view", params : id},
				BP.selectedExercise.title + " - Practice - Babelium Project",
				"?module=practice&action=view&params=" + id);
		BP.CMS.innerExerciseView(response);
	},
	
	onFault : function ()
	{
		alert("Error loading exercise");
	}
});