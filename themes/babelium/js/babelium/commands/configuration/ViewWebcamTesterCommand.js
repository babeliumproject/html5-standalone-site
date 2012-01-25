
/**
 * ViewWebcamTesterCommand
 */
var ViewWebcamTesterCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("webcam tester", function ()
		{
			BP.ConfigurationDelegate.viewWebcamTester(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Configure :: Webcam Tester - Babelium Project",
							{module : "config", action : "webcam"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading pending assesments");
	}
});