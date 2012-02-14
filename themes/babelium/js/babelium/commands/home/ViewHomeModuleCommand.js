
/**
 * ViewHomeModuleCommand
 */
var ViewHomeModuleCommand = Cairngorm.Command.extend(
{
	execute : function ( )
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_HOME_MODULE}}", function ()
		{
			BP.HomeDelegate.viewHomeModule(_this, _this.data === true);
		}, true);
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_HOME_MODULE}}", {module : "home"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_HOME_MODULE}}");
	}
});