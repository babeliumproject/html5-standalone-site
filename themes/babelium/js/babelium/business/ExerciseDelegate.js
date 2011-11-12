
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
		}
	};

})();