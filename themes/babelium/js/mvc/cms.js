
/* ============================================================
 * BABELIUM's CONTENT MANAGEMENT SYSTEM
 * ==========================================================*/

BP.CMS = (function()
{
	// Private interface
	var _usernav = "#usernav";
	var _mainnav = "#mainnav";
	var _searchnav = "#searchnav";
	var _motd = "#motd";
	var _maincontent = "#maincontent";
	var _initiated = false;
	var _loading = false;
	
	/**
	 * Setup Babelium's CMS
	 */
	function _setup()
	{
		if ( _initiated )
			return;
		
		_initNavigationLinks();
		_initLocalebox();
		
		_initiated = true;
	}
	
	/**
	 * Init hover action in navitation links
	 */
	function _initNavigationLinks()
	{
		$(_mainnav + " > ul > li > a").not(":last").hover(function()
		{
			$(this).parent().css("background", "url(themes/babelium/images/separator.png) no-repeat center right," +
					" url(themes/babelium/images/button_nav_highlight_" +
					$(this).attr('class') + ".png) no-repeat 50% 58%");
		}, function()
		{
			$(this).parent().css("background","url(themes/babelium/images/separator.png) no-repeat center right");
		});
		
		$(_mainnav + " > ul > li > a:last").hover(function()
		{
			$(this).parent().css("background", " url(themes/babelium/images/button_nav_highlight_" +
					$(this).attr('class') + ".png) no-repeat 50% 58%");
		}, function()
		{
			$(this).parent().css("background","none");
		});
	}
	
	/**
	 * Locale Box
	 */
	function _initLocalebox()
	{
		// TODO
	}
	
	
	// Public interface
	return {
		
		/**
		 * Inits Babelium's CMS
		 */
		init : function()
		{
			_setup();
		},
		
		/**
		 * Preparas main content for a new content insertion
		 * @param location : target module name, just for a loading message
		 * @param callback : callback function
		 */
		prepareMainContent : function ( location, callback )
		{
			if ( _loading || !_initiated )
				return;
			
			_loading = true;
			
			// Display loading message
			$("#maincontent > aside#loader > div#loadcontext > span").html("Loading <strong>"+location+"</strong>");
			$("#maincontent > aside#loader").slideDown(500);

			// Slide up current section and remove it on animation end
			$("#maincontent > section").slideUp(500, function()
			{
				$("#maincontent > section").remove();
				
				// Call to callback funcion after animation finished
				callback();
			});
		},

		/**
		 * Inner and display new content in main section
		 * @param data : JSON object with {title, content}
		 */
		innerMainContent : function ( data )
		{
			data = $.parseJSON(data);
			$("#maincontent > header > h1").text(data.title);
			var content = $(data.content).hide();
			content.appendTo("#maincontent").slideDown(500);
			$("#maincontent > aside#loader").slideUp(500);
			
			_loading = false;
		},
		
		/**
		 * Shows or hides login popup
		 * @param title : popup title
		 * @param content : popup content
		 */
		toggleLoginPopup : function ( title, content )
		{
			if ( _loading || !_initiated )
				return;
			
			var popup = $("aside#popup");
			
			if ( popup.is(":visible") )
			{
				popup.slideUp(500);
				$("div#logo").animate({top: '35px'}, 500);
			}
			else
			{
				popup.slideDown(500);
				$("div#logo").animate({top: '65px'}, 500);
			}
		}
		
	};

})();

/* ============================================================
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM
 * ==========================================================*/

$(document).ready(function()
{
	BP.CMS.init();
	
	/**
	 * On popstate
	 */
	window.onpopstate = function(event)
	{
	};
});