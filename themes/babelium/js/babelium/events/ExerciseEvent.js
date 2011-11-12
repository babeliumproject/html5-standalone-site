
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