
/**
 * ViewWebcamTesterCommand
 */
var ViewWebcamTesterCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_WEBCAM_TEST}}", function ()
		{
			BP.ConfigurationDelegate.viewWebcamTester(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_WEBCAM_TEST}}",
							{module : "config", action : "webcam"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_WEBCAM_TEST}}");
	}
});