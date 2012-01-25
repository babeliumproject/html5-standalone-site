function ConfigurationManager() {

	this.bpMicTester = null;
	this.bpWebcamTester = null;
	
	this.setupComponent = function(compRef, device){
		if(device=='mic' && compRef != null)
			this.bpMicTester = compRef;
		if(device=='webcam' && compRef != null)
			this.bpWebcamTester = compRef;
		this.addEventListeners();
	};

	this.addEventListeners = function() {
		if (this.bpWebcamTester) {
			this.bpWebcamTester.addEventListener('onWebcamTestResult',
					'BP.CM.webcamTestResultListener');
			this.bpWebcamTester.addEventListener('onDevicesNotAllowed',
					'BP.CM.devicesNotAllowedListener')
			this.bpWebcamTester.addEventListener('onFileNotFound',
					'BP.CM.fileNotFoundListener');
		}
		if (this.bpMicTester) {
			this.bpMicTester.addEventListener('onMicrophoneTestResult',
					'BP.CM.microphoneTestResultListener');
			this.bpMicTester.addEventListener('onDevicesNotAllowed',
					'BP.CM.devicesNotAllowedListener');
			this.bpMicTester.addEventListener('onFileNotFound',
					'BP.CM.fileNotFoundListener');
		}
	};

	this.webcamTestResultListener = function(success) {
		if (success)
			alert("Webcam test passed");
		else
			alert("Webcam test failed");
	};

	this.microphoneTestResultListener = function(success) {
		if (success)
			alert("Microphone test passed");
		else
			alert("Microphone test failed");
	};

	this.devicesNotAllowedListener = function() {
		alert('You must give permission to access your devices in order to pass this test');
	};

	this.fileNotFoundListener = function() {
		alert("Can't find the test file you've just recorded");
	};
}