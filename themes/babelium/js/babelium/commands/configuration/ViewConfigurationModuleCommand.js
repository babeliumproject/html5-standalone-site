
/**
 * ViewConfigModuleCommand
 */
var ViewConfigModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_CONFIG_MODULE}}", function ()
		{
			BP.ConfigurationDelegate.viewConfigModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_CONFIG_MODULE}}", {module : "config" });
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_CONFIG_MODULE}}");
	}
});