var SERVER_URL = "http://localhost/html5/";
var GATEWAY = "api/rest.php";

$(document).ready(function()
{
	initLocalebox();
	initNavigationLinks();
	
	window.onpopstate = updateLocation;
});

			/*var query_string = SERVER_URL +"/"+ GATEWAY + "?class=Exercise&method=getExercises";
			
			$.getJSON(query_string, function(data)
			{
				var content = "<section style='width:100%; background-color: green;'>";
				content += "<h1>Exercise List</h1>";

				// parse json
				$.each(data.getExercises, function(i, item)
				{
					if ( item.id == undefined )
						return;
					
					content += "<article style='width:50%;height:100px;float:left;background-color:#CECECE;'>";
					content += "<h1 style='background-color:red;'>" + item.title + "</h1>";
					
					content += "</article>";
					
				});
				
				content += "</section>";
				$("#maincontent").html(content);
			});*/


function loadSection(data)
{
	alert(data.getExercises);
}

/**
 * Navigation Links
 */
function initNavigationLinks()
{
	$("nav#mainnav > ul > li > a").hover(function()
	{
		$(this).parent().css("background","url(themes/babelium/images/button_nav_highlight_"+$(this).attr('class')+".png) no-repeat 50% 58%");
	}, function()
	{
		$(this).parent().css("background","none");
	});
}

/**
 * Locale Box
 */
function initLocalebox()
{
	// The select element to be replaced:
	var select = $('select#localebox');

	var selectBoxContainer = $('<div>',
	{
		width			: select.outerWidth(),
		className	: 'localebox',
		html		: '<div class="selectBox"></div>'
	});
    
	var dropDown = $('<ul>',{className:'dropDown'});
	var selectBox = selectBoxContainer.find('.selectBox');

	// Looping though the options of the original select element
	select.find('option').each(function(i)
	{
		var option = $(this);

		if ( i == select.attr('selectedIndex') )
		{
			selectBox.html('<img src="'+option.data('icon')+'" alt="'+ option.text()+'" align="left"/><span style="padding-left:5px;">'+
									option.text()+'</span><img src="themes/babelium/images/arrow-down.png" alignt="left" style="float:right; margin-right: 3px;" />');
		}

		// As of jQuery 1.4.3 we can access HTML5
		// data attributes with the data() method.
		if( option.data('skip') )
		{
			return true;
		}

		// Creating a dropdown item according to the
		// data-icon attribute:
		var li = $('<li>',
		{
						html:   '<img src="'+option.data('icon')+'" alt="'+ option.text()+'" align="left"/><span style="padding-left:5px;">'+
										option.text()+'</span>'
		});

		li.click(function()
		{
			selectBox.html('<img src="'+option.data('icon')+'" alt="'+ option.text()+'" align="left"/><span style="padding-left:5px;">'+
									option.text()+'</span><img src="themes/babelium/images/arrow-down.png" alignt="left" style="float:right; margin-right: 3px;" />');
			dropDown.trigger('hide');

			// When a click occurs, we are also reflecting
			// the change on the original select element:
			select.val(option.val());

			return false;
		});
        
		dropDown.append(li);
	});
    
	selectBoxContainer.append(dropDown.hide());
    
	select.hide().after(selectBoxContainer);
    
	// Binding custom show and hide events on the dropDown:
	dropDown.bind('show',function()
	{
		if(dropDown.is(':animated'))
			return false;
		
		dropDown.slideDown();
		selectBox.addClass('expanded')
		
	});
	
	dropDown.bind('hide',function()
	{
		if(dropDown.is(':animated'))
			return false;
		
		dropDown.slideUp();
		selectBox.removeClass('expanded')

	});
	
	dropDown.bind('toggle',function()
	{
		if(selectBox.hasClass('expanded'))
			dropDown.trigger('hide');
		else
			dropDown.trigger('show');
	});

	selectBox.click(function()
	{
		dropDown.trigger('toggle');
		return false;
	});
    
	// If we click anywhere on the page, while the
	// dropdown is shown, it is going to be hidden: 
	$(document).click(function()
	{
		dropDown.trigger('hide');
	}); 
}
