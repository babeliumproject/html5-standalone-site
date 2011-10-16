
/* ============================================================
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM
 * ==========================================================*/

$(document).ready(function()
{
	var m = (RegExp("module=(.+?)(&|$)").exec(location.search) || [,"home"])[1];
	var a = (RegExp("action=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
	BP.pushState({module: m, action: a}, null, null);	
	
	// Init content management system
	BP.CMS.init();
	
	$("section.exerciseList").jplist(
	{
		filter: {title: ".exerciseTitle", description: "p.exerciseDescription"},
		filter_path: ".paginationFilter",
		
		pagingbox: ".paginationButtons",
		pageinfo: ".paginationInfo",
		paging_dd_path: ".paginationPage-by",
		
		items_box: ".exerciseContainer",
		item_path: ".exercise",
		items_on_page: 10
	});
	
	/**
	 * On popstate
	 */
	window.onpopstate = function(event)
	{
		if ( typeof event.state == 'undefined' || event.state == null )
			return;
		else
		{
			var state = event.state;
			
			if ( state.module == "home" && BP.at("home") )
				state.params = "min";
			
			new ViewChangeEvent(ViewChangeEvent.VIEW_POPSTATE, state).dispatch();
		}
	};
});