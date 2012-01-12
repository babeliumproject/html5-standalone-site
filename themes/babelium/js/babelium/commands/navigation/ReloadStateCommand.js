
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
		
		if ( module == null || module == undefined )
			return;
		
		var action = (typeof this.data.action == 'undefined') ? "" : this.data.action;
		var params = (typeof this.data.params == 'undefined') ? "" : this.data.params;
		var state = (typeof this.data.state == 'undefined') ? "" : this.data.state;
		var src = "action=" + action + "&params=" + params + "&state=" + state;
		
		// Find service
		var httpService = Cairngorm.ServiceLocator.getHttpService(module);
		
		BP.CMS.prepareMainContent(module, function ()
		{
			httpService.call(src, _this);
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