
/**
 * ToggleLoginPopupCommand
 */
var ToggleLoginPopupCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		BP.CMS.toggleLoginPopup();
	}
});