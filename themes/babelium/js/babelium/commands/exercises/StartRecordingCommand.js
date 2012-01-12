
/**
 * StartRecordingCommand
 */
var StartRecordingCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( BP.EM.selectedExercise == null )
			return;

		// Setup recording
		BP.EM.setupRecording();
	}
});