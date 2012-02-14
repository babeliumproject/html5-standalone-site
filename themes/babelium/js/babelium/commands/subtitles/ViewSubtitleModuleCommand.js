
/**
 * ViewSubtitleModuleCommand
 */
var ViewSubtitleModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.CMS.prepareMainContent("{{$LOADING_SUBTITLE_MODULE}}", function ()
		{
			BP.SubtitleDelegate.viewSubtitleModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("{{$TITLE_SUBTITLE_MODULE}}", {module : "subtitle"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		BP.CMS.abortLoading();
		alert("{{$ERROR_LOADING_SUBTITLE_MODULE}}");
	}
});