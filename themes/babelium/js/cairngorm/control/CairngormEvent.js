
/* ============================================================
 * control/CairngormEvent.as
 * ==========================================================*/

Cairngorm.Event = Class.extend(
{	
	/**
	 * Constructor
	 * @param type = String
	 */
	init : function ( type, data )
	{
		this.type = type;
		this.data = data != null ? data : {};
	},
	
	/**
	 * Dispatch Cairngorm Event 
	 */
	dispatch : function ()
	{
		return Cairngorm.EventDispatcher.dispatchEvent(this);
	}
});