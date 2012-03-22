
/* ============================================================
 * EVALUATION MODULE DELEGATE
 * ==========================================================*/

BP.EvaluationDelegate = (function ()
{
	var _serviceID = "evaluate";
	
	return {
		
		viewEvaluationModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		},
		
		viewPendingAssesments : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "pending"}, responder );
		},
		
		viewAssessedToUser : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "touser"}, responder );
		},
		
		viewAssessedByUser : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "byuser"}, responder );
		},
		
		viewAssessedAssesment : function ( responder, responseId )
		{
			if ( typeof responseId == "undefined" )
				return;
			
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "byuser", params : responseId, state : "min"}, responder );
		},
		
		viewRevisedAssesment : function ( responder, responseId )
		{
			if ( typeof responseId == "undefined" )
				return;
			
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "touser", params : responseId, state : "min"}, responder );
		},
		
		viewEvaluationAssesment : function ( responder, responseId )
		{
			if ( typeof responseId == "undefined" )
				return;
			
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "pending", params : responseId, state : "min"}, responder );
		}
	};

})();