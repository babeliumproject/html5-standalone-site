
/* ============================================================
 * control/CairngormEventDispatcher.as
 * ==========================================================*/

Cairngorm.EventDispatcher = (function()
{
	// Private interface
	var _listeners = {};
	
	// Public interface
	return {
		
		/**
		 * Add Event Listener
		 * @param type = Event Type (String)
		 * @param listener = function
		 */
		addEventListener : function ( type, listener )
		{
			if ( type != null && typeof listener.executeCommand == 'function' )
				_listeners[type] = listener;
		},
		
		/**
		 * Dispatch event
		 * @param ev = Cairngorm Event
		 */
		dispatchEvent : function ( ev )
		{	
			if ( _listeners[ev.type] != null )
				_listeners[ev.type].executeCommand(ev);
		}
	};
})();