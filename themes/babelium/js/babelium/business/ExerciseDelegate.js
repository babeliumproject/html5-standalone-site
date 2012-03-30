
/* ============================================================
 * PRACTICE MODULE DELEGATE
 * ==========================================================*/

BP.PracticeDelegate = (function ()
{
	var _serviceID = "practice";
	
	return {
		
		viewPracticeModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		},
	
		getRecordableExercises : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		},
		
		viewExerciseByName : function ( responder, exerciseName, exerciseModule )
		{
			if ( !exerciseName )
				return;

			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = {action : "view", params : exerciseName};
			
			if ( exerciseModule )
				params.state = "min";
			
			_service.call( params, responder );
		}
	};

})();