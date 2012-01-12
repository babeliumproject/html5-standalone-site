
/**
 * ReloadStateCommand
 * Especial command which loads the last viewed module
 */
var ReloadStateCommand = Cairngorm.Command.extend(
{
	execute : function ( )
	{
		var _this = this;
		var module = this.data.module;
		var action = (typeof this.data.action == 'undefined') ? "" : this.data.action;
		var params = (typeof this.data.params == 'undefined') ? "" : this.data.params;
		var state = (typeof this.data.state == 'undefined') ? "" : this.data.state;
		var src = "action=" + action + "&params=" + params + "&state=" + state;
		var httpService = new Cairngorm.HTTPService({target: "modules/bridge.php?module=", method: "get"}, module);
		
		BP.CMS.prepareMainContent(module, function ()
		{
			httpService.call(src, _this);
			BP.state = _this.data;
		}, module == "home");
	},
	
	onResult : function ( response )
	{
		if ( response == undefined || response.title == undefined || response.content == undefined )
			return;

		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading last module");
	}
});