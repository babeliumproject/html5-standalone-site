function onPlaybackCuePoint(cue, videoPlayer, dg)
{
	//Retrieve the videoPlayer object using DOM
	this.VP=videoPlayer;
	//This object should reflect a DataGrid of ActionScript or an HTML table
	//this.dg=dg;
	this.cue=cue;

	this.execute = function(){
		if (this.cue){
			this.VP.setSubtitle(this.cue.text,this.cue.textColor);
			//console.log("Show subtitle");
			//var index:int = CuePointManager.getInstance().getCueIndex(cue);
			//if(dg != null && dg.rowCount > index)
			//	dg.selectedIndex = index;
		} else {
			this.VP.setSubtitle('',0x000000);
			//console.log("Stop Other Role/Hide subtitle");
		}
	};
}