
function services()
{
	this.protocol = "http://";
	this.host = "babelium/html5/api/";
	this.endpoint = "rest.php";
	this.lastRandomizer = "";
	this.statToken = "myMusicFightsAgainstTheSystemThatTeachesToLiveAndDie"; //Bob Marley's Quote
	this.commToken = "";
	this.authToken = "";
	this.token = "";

	//This variable will be accesible in the callback and points to the right scope
	var instance = this;
	
	/**
	 * The way callback should be passed is uncertain maybe we should pass it as a String and then use eval() to fetch the actual function. Also since this function
	 * is to be nested inside a class we must prepend the class instance name, in this case should be something like "services.theFunction"
	 */
	this.send = function(secured, method, parameters, callback)
	{
		var protocol = (secured) ? "https://" : "http://";
		var qs = protocol + this.host + this.endpoint + "?" + method;
		var data = {};
		var cb = callback;
		data.method = method;
		if ( parameters != null )
			data.parameters = parameters;
		if ( cb == null )
			cb = instance.onServiceSuccess;

		this.token = this.generateToken(method);

		data.header = {"token": this.token, "session": BP.getSessionID, "uuid": BP.getUUID};

		// Fix for Internet Explorer 'No Transport' error. This error is apparently caused by an cross-domain request attempt.
		// With the following statetement we force jQuery to support cross-origin resource sharing by default. Solution found at:
		// http://blueonionsoftware.com/blog.aspx?p=03aff202-4198-4606-b9d6-686fd13697ee
		$.support.cors = true;

		$.ajax({
			type: "POST",
			url: qs,
			data: data,
			success: cb,
			//error: function(error){
			//	instance.onServiceError(error);
			//},
			error: function (xhr, status, errorThrown){
				instance.onServiceError(xhr,status,errorThrown);
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true
			
			});

	};

	this.getCommunicationToken = function() {
		var method = "getCommunicationToken";
		var qs = this.protocol + this.host + this.endpoint + "?" + method;
		
		var data = {};
		data.method = method;
		data.parameters = {"secretKey": MD5(BP.getSessionID)};
		data.header = {"session": BP.getSessionID, "uuid": BP.getUUID};
		
	    $.post(qs, data, BP.Services.onCommunicationTokenSuccess, "json").error(function(error){
	    	instance.onServiceError(error);
        });
	};
	
	this.onCommunicationTokenSuccess = function(data){
		//The request to the server was successful, now we should check if the response is right or not
		//Retrieve the communicationToken and store it for future use
		instance.commToken = data.response;
		BP.onCommunicationReady();
	};
	
	this.onServiceSuccess = function(success){
		//Do sth with this data;
	};

	this.onServiceError = function(xhr, status, errorThrown){
		//Display an error message noticing the user that the request to the server was not successful.
		var errorObj = jQuery.parseJSON(xhr.responseText);
		console.log("Request error: ".errorObj.response.message);
	};
	
	this.createRandomSalt = function(){
		var randomizer = '';
		var charsGenerated = 0;
		while (charsGenerated < 6){
			randomizer = randomizer + (Math.floor(Math.random() * 16)).toString(16);
			charsGenerated++;
		}
		return randomizer !== this.lastRandomizer ? (randomizer) : (createRandomSalt());
	};

	this.generateToken = function (method) {
		var salt = this.createRandomSalt();
		var t = Sha1.hash(method + ":" + this.commToken + ":" + this.statToken + ":" + salt);
		var s = salt + t;

		return s;
	};
}
