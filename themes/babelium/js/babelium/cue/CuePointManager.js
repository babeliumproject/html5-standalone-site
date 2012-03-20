
function cuePointManager() {
	
	this.cpm_cuelist=[];//new ArrayCollection();
	this.cpm_exerciseId=-1;
	this.cpm_subtitleId=-1;
	
	this.roleColors = [0xffffff, 0xfffd22, 0x69fc00, 0xfd7200, 0x056cf9, 0xff0f0b, 0xc314c9, 0xff6be5];
	this.colorDictionary = [];

	// http://stackoverflow.com/questions/4818615/using-getjson-with-callback-within-a-javascript-object
	var instance = this;
	
	this.reset = function(){
		cpm_exerciseId=-1;
		cpm_subtitleId=-1;
		cpm_cuelist = [];
	};
	

	this.setVideo = function (videoId) {
		this.cpm_exerciseId = videoId;
	};
	

	this.currentSubtitle = function(){
		return this.cpm_subtitleId;
	};
	
	this.addCue = function(cueobj){
		this.cpm_cuelist.push(cueobj);
		this.cpm_cuelist.sort(this.sortByStartTime);
	};

	this.setCueAt = function(cueobj, pos){
		this.cpm_cuelist.setItemAt(cueobj, pos);
	};

	this.getCueAt = function(pos){
		return this.cpm_cuelist[pos];
	};

	this.removeCueAt = function(pos){
		return this.cpm_cuelist.removeItemAt(pos);
	};

	this.getCueIndex = function(cueobj){
		return this.cpm_cuelist.getItemIndex(cueobj);
	};

	this.removeAllCue = function(){
		this.cpm_cuelist = [];
	};

	this.setCueList = function (cuelist){
		this.cpm_cuelist=cuelist;
	};
	
	this.getCuelist = function(){
		return this.cpm_cuelist;
	};
	
	this.sortByStartTime = function(a,b){
		if (a.startTime > b.startTime) return 1;
		if (a.startTime < b.startTime) return -1;
		return 0;
	};
	
	this.sortByEndTime = function(a,b){
		if (a.endTime > b.endTime) return 1;
		if (a.endTime < b.endTime) return -1;
		return 0;
	};

	this.setCueListStartCommand = function(command){
		for (var i in this.cpm_cuelist){
			this.cpm_cuelist[i].setStartCommand(command);
		}
	};

	this.setCueListEndCommand = function(command){	
		for (var i in this.cpm_cuelist){
			this.cpm_cuelist[i].setEndCommand(command);
		}
	};

	/**
	 * Callback function - OnEnterFrame
	 *
	 **/
	//streamevent
	this.monitorCuePoints = function(time){
		var curTime=time;
		for (var i in this.cpm_cuelist){
			if (((curTime - 0.08) < this.cpm_cuelist[i].startTime && this.cpm_cuelist[i].startTime < (curTime + 0.08))){
				this.cpm_cuelist[i].executeStartCommand();
				break;
			}
			if (((curTime - 0.08) < this.cpm_cuelist[i].endTime && this.cpm_cuelist[i].endTime < (curTime + 0.08))){
				this.cpm_cuelist[i].executeEndCommand();
				break;
			}
		}
	};


	/**
	 * Get cuepoints from subtitle
	 **/
	this.setCuesFromSubtitleUsingLocale = function (language) {
		var parameters = {"id": 0, "exerciseId" : this.cpm_exerciseId, "language": language};
		BP.Services.send(false, "getSubtitleLines", parameters, instance.subtitlesRetrievedCallback);
	};

	this.setCuesFromSubtitleUsingId = function (subtitleId) {
		var parameters = {"subtitleId": subtitleId};
		BP.Services.send(false, 'getSubtitleLinesUsingId', parameters, instance.subtitlesRetrievedCallback);	
	};
	
	this.subtitlesRetrievedCallback = function (data) {
		var result=data.response;
		
		instance.colorDictionary = [];
		for (var key in result){
			if(typeof result[key] == 'object'){
			    instance.addCueFromSubtitleLine(result[key]);
			}
		}
		for (var key in result){
			instance.cpm_subtitleId=result[key].subtitleId;
			break;
		}
		instance.subtitlesRetrievedListener();
	};

	this.addCueFromSubtitleLine = function (subline) {
		var found = false;
		var color = this.roleColors[0];
		for(var i=0; i < this.colorDictionary.length; i++){
			if(this.colorDictionary[i] == subline.exerciseRoleId){
				found = true;
				color = this.roleColors[i];
				break;
			}
		}
		if(!found){
			this.colorDictionary.push(subline.exerciseRoleId);
			color = this.roleColors[this.colorDictionary.length-1];
		}
		
		var cueObj=new cueObject(subline.subtitleId, subline.showTime, subline.hideTime, subline.text, subline.exerciseRoleId, subline.exerciseRoleName,null,null,color);
		this.addCue(cueObj);
	};

	/**
	 * Return cuepoint list in array mode with startTime and role
	 **/
	this.cues2rolearray = function(){
		var arrows = [];
		var cuelist = this.getCuelist();
		for (var i in cuelist)
			arrows.push({'startTime': cuelist[i].startTime, 'endTime': cuelist[i].endTime, 'role': cuelist[i].role});

		return arrows;
	};

	this.addEventListener = function(event,listener){
		switch(event){
			case 'onSubtitlesRetrieved':
				if(typeof listener == "function"){
					this.subtitlesRetrievedListener = listener;
				}	
				break;
			default:
				break;
		}
	};
}
