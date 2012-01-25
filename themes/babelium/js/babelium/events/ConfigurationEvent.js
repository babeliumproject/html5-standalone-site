
/**
 * Config Event
 */

var ConfigurationEvent = Cairngorm.Event.extend(
{
	init : function ( type )
	{
		this._super(type);
	}
});

// Constants
ConfigurationEvent.VIEW_MIC_TESTER = "viewMicTester";
ConfigurationEvent.VIEW_WEBCAM_TESTER = "viewWebcamTester";