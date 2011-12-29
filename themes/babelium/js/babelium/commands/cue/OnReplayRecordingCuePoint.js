function onReplayRecordingCuePoint(cue, subHolder)
{
	this.VP = subHolder;
	this.cue = cue;

	this.execute = function(){
		if(this.cue){
			this.VP.setSubtitle(this.cue.text, this.cue.textColor);
			var time = this.cue.endTime - this.cue.startTime;
			this.VP.startTalking(this.cue.role, time);
		} else
			this.VP.setSubtitle('',0x000000);
	};	
}
