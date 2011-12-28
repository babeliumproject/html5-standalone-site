
/**
 * ExerciseSelectedCommand
 */
var StartRecordingCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( BP.selectedExercise == null )
			return;

		// Retrieve selected role
		var selectedRole = $("select#recRole > option:selected").val();
		var selectedLocale = $("select#recLocale > option:selected").val();
		alert("recording: " + selectedRole + " :: " + selectedLocale);
		
		BP.EM.showArrows();
	},
	
	onResult : function ( response )
	{
		var id = BP.selectedExercise.name;
		BP.pushState({module : "practice", action : "rec", params : id},
				BP.selectedExercise.title + " - Practice - Babelium Project",
				"?module=practice&action=rec&params="+ id);
		BP.CMS.innerExerciseView(response);
	},
	
	onFault : function ()
	{
		alert("Error loading exercise");
	}
});