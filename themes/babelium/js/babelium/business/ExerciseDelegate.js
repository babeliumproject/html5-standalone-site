
/* ============================================================
 * PRACTICE MODULE DELEGATE
 * ==========================================================*/

BP.PracticeDelegate = (function ()
{
	var _serviceID = "pracMOD";
	
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
		
		viewExerciseById : function ( responder, exerciseId )
		{
			if ( !exerciseId )
				return;

			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = "action=view&state=min&params="+exerciseId;
			_service.call( params, responder );
		}
	};

})();