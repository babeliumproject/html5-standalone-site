/**
 * Event prototype
 */
var BEvent = Class.extend(
{
	init: function(sender, name)
	{
		this._sender = sender;
		this._name = name;
		this._listeners = [];
	},
	attach : function (listener)
	{
		this._listeners.push(listener);
	},
	dispatch : function ()
	{
		for ( var i = 0; i < this._listeners.length; i++ )
			this._listeners[i](this);
	},
	run : function ()
	{
		alert("Trololo: " + this._listeners.length);
	}
});


/**
 * View Change Event
 */
var ViewChangeEvent = BEvent.extend(
{
	
	init: function(name)
	{
		this._super(null, name);
		this.attach("Trololo");
	}
});
ViewChangeEvent.VIEW_HOME_MODULE = "home";
ViewChangeEvent.VIEW_EVALUATION_MODULE = "eval";
