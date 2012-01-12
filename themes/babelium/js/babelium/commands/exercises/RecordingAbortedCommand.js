
/**
 * RecordingAbortedCommand
 */
var RecordingAbortedCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( BP.EM.selectedExercise == null )
			return;

		BP.EM.recordingError();
		BP.EM.prepareExercise();
		BP.EM.resetCueManager();
		BP.EM.prepareCueManager();
	}
});