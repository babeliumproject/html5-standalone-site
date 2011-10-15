
/* ============================================================
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM
 * ==========================================================*/

$(document).ready(function()
{
	BP.state.module = (RegExp("module=(.+?)(&|$)").exec(location.search) || [,"home"])[1];
	BP.state.action = (RegExp("action=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
	
	// Init content management system
	BP.CMS.init();
	
	/**
	 * On popstate
	 */
	window.onpopstate = function(event)
	{
	};
});