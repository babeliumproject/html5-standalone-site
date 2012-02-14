
/**
 * ViewMicTesterCommand
 */
var ViewMicTesterCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_MIC_TEST}}", function ()
		{
			BP.ConfigurationDelegate.viewMicTester(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_MIC_TEST}}",
							{module : "config", action : "mic"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_MIC_TEST}}");
	}
});