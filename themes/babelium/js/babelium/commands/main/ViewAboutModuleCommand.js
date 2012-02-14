
/**
 * ViewAboutModuleCommand
 */
var ViewAboutModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_ABOUT_MODULE}}", function ()
		{
			BP.AboutDelegate.viewAboutModule(_this);
		});
	},
	
	onResult : function ( response )
	{

		BP.SM.pushState("{{$TITLE_ABOUT_MODULE}}", {module : "about"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_ABOUT_MODULE}}");
	}
});