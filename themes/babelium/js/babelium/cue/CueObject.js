function cueObject(subtitleId, startTime, endTime, text, roleId, role, startCommand, endCommand, textColor)
{
	this.defaultParamValues = [0,-1,-1,null,0,null,null,null,0xffffff];
	
	this.subtitleId=subtitleId;
	this.startTime=startTime;
	this.endTime=endTime;
	this.text=text;
	this.roleId=roleId;
	this.role=role;
	this.startCommand=startCommand;
	this.endCommand=endCommand;
	if(textColor == null)
		this.textColor=defaultParamValues[9];
	else
		this.textColor=textColor;
		
	this.executeStartCommand = function(){
		this.startCommand.execute();
	};
		
	this.executeEndCommand = function(){
		this.endCommand.execute();
	};
		
	this.setStartCommand = function(command){
		this.startCommand = command;
	};
		
	this.setEndCommand = function(command){
		this.endCommand = command;
	};

}