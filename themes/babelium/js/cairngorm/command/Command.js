
/* ============================================================
 * command/Command.as
 * ==========================================================*/

Cairngorm.Command = Class.extend(
{	
	/**
	 * Constructor
	 */
	init : function ( data )
	{
		this.data = data;
	},
	
	/**
	 * Execute an action
	 */
	execute : function () {}
});