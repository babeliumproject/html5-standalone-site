
/* ============================================================
 * Login VO
 * ==========================================================*/

var LoginVO = Cairngorm.VO.extend(
{
	init : function ( name, pass, remember )
	{
		this.name = name;
		this.pass = pass;
		this.remember = (remember)? 1 : 0;
	}
});