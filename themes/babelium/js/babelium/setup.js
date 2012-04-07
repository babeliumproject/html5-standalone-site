
// Babelium Project Namespace
var BP = {};

if ( typeof console == "undefined" )
	console = {
		log : function(message)
		{
			//alert(message);
		},
		
		warn : function(message)
		{
			this.log(message);
		}
	};