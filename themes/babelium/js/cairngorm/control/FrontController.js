
/* ============================================================
 * control/FrontController.as
 * ==========================================================*/

Cairngorm.FrontController = Class.extend(
{
	/**
	 * Constructor
	 */
	init : function ()
	{
		this.commands = {};
	},
	
	/**
	 * Add command
	 * @param evType = Event Type (String)
	 * @param commandRef = Class
	 */
	addCommand : function (evType, commandRef)
	{	
		if ( evType == null )
			return;
		
		this.commands[evType] = commandRef;
		Cairngorm.EventDispatcher.addEventListener(evType, this);
	},
	
	/**
	 * Remove Command
	 * @param commandName = String
	 */
	removeCommand : function ( commandName )
	{
		if ( commandName == null )
			return;
		
		this.commands[commandName] = null;
		delete this.commands[commandName];
	},
	
	/**
	 * Execute Command
	 * @param ev = CairngormEvent
	 */
	executeCommand : function ( ev )
	{
		new this.commands[ev.type](ev.data).execute();
	}
});