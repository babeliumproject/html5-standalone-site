
/**
 * ViewPopStateCommand
 * Especial event which loads the last viewed module
 */
var ViewPopStateCommand = Cairngorm.Command.extend(
{
	execute : function ( )
	{
		var _this = this;
		var module = this.data.module;
		var action = (typeof this.data.action == 'undefined') ? "" : this.data.action;
		var params = (typeof this.data.params == 'undefined') ? "" : this.data.params;
		var httpService = new Cairngorm.HTTPService({target: "modules/bridge.php?module=", method: "get"}, module);
		
		BP.CMS.prepareMainContent(module, function ()
		{
			httpService.call("action=" + action + "&params=" + params, _this);
			BP.state = _this.data;
		}, module == "home");
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading last module");
	}
});