
/* ============================================================
 * BABELIUM's STATE MANAGER
 * ==========================================================*/

BP.SM = (function()
{
	// Private interface
	var _state = {};
	var _historySupport = true;
	
	// Public interface
	return {
		
		// Init
		init : function ()
		{
			if ( typeof window.history == 'undefined' || typeof window.history.pushState != 'function' )
			{
				console.warn("Disabling state handle");
				_historySupport = false;
			}
		
			// Retrieve first state from url location
			var m = (RegExp("module=(.+?)(&|$)").exec(location.search) || [,"home"])[1];
			var a = (RegExp("action=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
			var p = (RegExp("params=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
			this.pushState(null, {module: m, action: a, params: p});	
		},
		
		// Push new state
		pushState : function ( title, data )
		{
			var href = "?";
			for ( var i in data )
			{
				if ( data[i] != undefined )
				{
					if ( href.length == 1 )
						href += (i + "=" + data[i]);
					else
						href += ("&" + i + "=" + data[i]);
				}
			}
			
			if ( _historySupport )
				window.history.pushState(data, title, href);

			_state = data;
		},
		
		// Retrieve current state
		currentState : function()
		{
			return _state;
		},
		
		// OnPopState callback
		onPopState : function ( event )
		{
			if ( typeof event.state == "undefined" || event.state == null )
				return;
			else
			{
				var state = event.state;
				
				// If old module == new module, don't reload the whole module
				if ( state.module == "home" )
					state.state = "min";
					
				new ViewChangeEvent(ViewChangeEvent.RELOAD_STATE, state).dispatch();
			}
		},
		
		/** USEFUL STATE FUNCTIONS **/
		
		/*
		 * Last requested module
		 * if moduleName is empty, returns last requested module,
		 * otherwise returns comparation between moduleName and last
		 * requested module
		 */
		at : function ( moduleName )
		{
			if ( typeof moduleName == 'undefined' )
				return (typeof _state.module == 'undefined') ? null : _state.module;
			else 
				return (typeof _state.module == 'undefined') ? false : _state.module == moduleName;
		},
		
		/*
		 * if actionName is empty, returns last requested action,
		 * otherwise returns comparation between actionName and last
		 * requested action
		 */
		action : function ( actionName )
		{	
			if ( typeof actionName == 'undefined' )
				return (typeof _state.action == 'undefined') ? null : _state.action;
			else 
				return (typeof _state.action == 'undefined') ? false : _state.action == actionName;
		},
		
		/*
		 * if params is empty, returns last requested params,
		 * otherwise returns comparation between params and last
		 * requested params
		 */
		params : function( params )
		{
			if ( typeof actionName == 'undefined' )
				return (typeof _state.params == 'undefined') ? null : _state.params;
			else 
				return (typeof _state.params == 'undefined') ? false : _state.params == params;
		}
	};

})();