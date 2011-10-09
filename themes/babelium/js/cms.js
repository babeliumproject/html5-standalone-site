
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
		// Hide select
		var select = $("select#localebox").css("display", "none");
		
		// Add a div in its place
		select.parent().append("<div class='localebox'></div>");
		var localeBox = $(".localebox");
		
		// Containing 2 divs
		localeBox.append("<div class='selectBox'></div>");
		localeBox.append("<ul class='dropDown'></ul>");
		
		var selectBox = $(".selectBox");
		var dropDown = $(".dropDown").hide();
		
		// Add options to localebox
		select.find("option").each(function (index)
		{
			var option = $(this);
			var text = $(this).text();
			var flag = $(this).data("icon");
			var content = "<img src='" + flag + "' width='16' height='16' align='left' hspace='3' vspace='3' "
							+ "alt='" + text + "' />" + text;
			var arrow = "<img src='themes/babelium/images/arrow-down.png'"
				+ "alignt='left' style='float:right; margin-right: 3px;' />";

			// Is is checked as default initialize localebox
			if ( $(this).is(":selected") )
				selectBox.html(content+arrow);
			
			// Add option
			var li = $('<li>',{html: content});
			dropDown.append(li);
			
			// Trigger action on click the option
			li.click(function()
			{
				selectBox.html($(this).html()+arrow);
				dropDown.slideUp();
				select.val(option.val());
			});
		});
		
		// Show/hide dropDown
		selectBox.click(function()
		{
			dropDown.slideToggle();
		});
	
		// Hide dropdown
		$(document).click(function()
		{
			if ( dropDown.is(':animated') )
				return false;
			
			dropDown.slideUp();
		});
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
			var loader = $("aside#loader");
			var pos = $("section#maincontent > header").offset();
			var h = $("section#maincontent > header").outerHeight(true);
			
			loader.css("top", pos.top + h);
			loader.find("div#loadcontext > span").html("Loading <strong>"+location+"</strong>");
			loader.slideDown(500);
			
			// Slide up current section and remove it on animation end
			if ( $("#maincontent > section").length > 0 )
			{
				$("#maincontent > section").fadeOut(500, function()
				{
					$("#maincontent > section").remove();
					
					// Call to callback funcion after animation finished
					callback();
				});
			}
			else
				callback();
				
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
		 */
		toggleLoginPopup : function ( )
		{
			var popup = $("aside#popup");
			
			if ( popup.is(":visible") )
			{
				this.hideLoginPopup();
			}
			else
			{
				this.showLoginPopup();
			}
		},
		
		/**
		 * Hides login popup
		 */
		hideLoginPopup : function ( )
		{
			if ( _loading || !_initiated )
				return;
			
			var popup = $("aside#popup");
			
			popup.slideUp(500, function(){document.getElementById("loginForm").reset();});
			$("div#logo").animate({top: '35px'}, 500);
		},
		
		/**
		 * Shows login popup
		 */
		showLoginPopup : function ()
		{
			if ( _loading || !_initiated )
				return;
			
			var popup = $("aside#popup");
			
			popup.slideDown(500);
			$("div#logo").animate({top: '65px'}, 500);
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