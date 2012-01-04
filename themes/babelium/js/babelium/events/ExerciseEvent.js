
/**
 * Exercise Event
 */

var ExerciseEvent = Cairngorm.Event.extend(
{
	init : function ( type, exercise, report, score )
	{
		this._super(type, {"exercise" : exercise, "report" : report, "score" : score});
	}
});

// Constants
ExerciseEvent.EXERCISE_SELECTED = "exerciseSelected";
ExerciseEvent.GET_RECORDABLE_EXERCISES = "getRecordableExercises";
ExerciseEvent.REC_START = "exerciseRecStart";
ExerciseEvent.RECORDING_ABORTED = "exerciseRecAborted";
ExerciseEvent.SAVE_RESPONSE = "exerciseSaveResponse";
ExerciseEvent.WATCH_RESPONSE = "exerciseWatchResponse";
ExerciseEvent.RECORD_AGAIN = "exerciseRecordAgain";