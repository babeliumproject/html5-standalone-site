
/* ============================================================
 * NewUser VO
 * ==========================================================*/

var NewUserVO = Cairngorm.VO.extend(
{	
	init : function ( name, pass, realName, realSurname, email, activationHash, languages )
	{
		this.name = name;
		this.pass = pass;
		this.realName = realName;
		this.realSurname = realSurname;
		this.email = email;
		this.activationHash = activationHash;
		this.languages = languages;
	}
});