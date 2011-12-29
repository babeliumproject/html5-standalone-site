function onRecordingOtherRoleCuePoint(cue, VP)
{
	//Retrieve the videoPlayer object using DOM
	this.VP = VP;
	this.cue = cue;

	this.execute = function()
	{
		var time = this.cue.endTime - this.cue.startTime;
		this.VP.setSubtitle(this.cue.text, this.cue.textColor);
		this.VP.startTalking(this.cue.role, time);
		this.VP.highlight(false);
		//console.log("Start Other Role");
	};
}