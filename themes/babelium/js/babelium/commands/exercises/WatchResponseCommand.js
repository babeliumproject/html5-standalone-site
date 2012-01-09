
/**
 * ExerciseSelectedCommand
 */
var WatchResponseCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( BP.selectedExercise == null )
			return;

		BP.EM.watchResponse();
	}
});