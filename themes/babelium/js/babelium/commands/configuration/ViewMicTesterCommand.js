
/**
 * ViewMicTesterCommand
 */
var ViewMicTesterCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("mic tester", function ()
		{
			BP.ConfigurationDelegate.viewMicTester(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Configure :: Mic Tester - Babelium Project",
							{module : "config", action : "mic"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("Error loading pending assesments");
	}
});