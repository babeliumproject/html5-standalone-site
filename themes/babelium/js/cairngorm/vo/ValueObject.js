
/* ============================================================
 * vo/ValueObject.as
 * ==========================================================*/

Cairngorm.VO = Class.extend(
{
	init : function (){},
	
	/**
	 * Convert this object's properties
	 * to json object
	 */
	toJSON : function ()
	{
		var jsonObj = {};
		
		for ( var i in this )
			if ( typeof this[i] != "function" )
				jsonObj[i] = this[i];
		
		return jsonObj;
	},
	
	/**
	 * Convert this object's properties
	 * to json string
	 */
	toJSONStr : function ()
	{
		var jsonStr = "{";
		
		for ( var i in this.toJSON() )
		{
			if ( jsonStr.length != 1 )
				jsonStr += ",";

			jsonStr += '"' + i + '": "' + this[i] + '"';
		}
		
		jsonStr += "}";
		
		return jsonStr;
	},
	
	/**
	 * Convert this to base64
	 */
	toBase64 : function ()
	{
		return Base64.encode(this.toJSONStr());
	}
	
});