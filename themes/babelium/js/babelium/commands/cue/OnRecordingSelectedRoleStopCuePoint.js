function onRecordingSelectedRoleStopCuePoint(VP){
	this.VP=VP;

	this.execute = function(){
		this.VP.muteRecording(true);
		this.VP.muteVideo(false);
		this.VP.setSubtitle('',0x000000);
		this.VP.highlight(false);
		//console.log("Stop Recording your role");
	};
}