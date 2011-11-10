
/**
 * HomepageEvent
 */

var HomepageEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type )
	{
		this._super(type);
	}
});

// Constants
HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN = "bestRatedVideosSignedIn";
HomepageEvent.LATEST_USER_UPLOADED_VIDEOS = "latestUserUploadedVideos";
HomepageEvent.LATEST_USER_ACTIVITY = "latestUserActivity";