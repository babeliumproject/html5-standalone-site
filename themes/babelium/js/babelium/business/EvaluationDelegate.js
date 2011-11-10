
/* ============================================================
 * EVALUATION MODULE DELEGATE
 * ==========================================================*/

BP.EvaluationDelegate = (function ()
{
	var _serviceID = "evalMOD";
	
	return {
		
		viewEvaluationModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();