
/**
 * RecordAgainCommand
 */
var RecordAgainCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( BP.EM.selectedExercise == null )
			return;

		BP.EM.bpPlayer.videoSource(BP.EM.exerciseName);
		BP.EM.setupRecording();
	}
});