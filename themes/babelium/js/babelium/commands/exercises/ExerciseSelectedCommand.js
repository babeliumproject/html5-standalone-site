
/**
 * ExerciseSelectedCommand
 */
var ExerciseSelectedCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		alert("something selectad");
		/*BP.CMS.prepareMainContent("practice module", function ()
		{
			BP.PracticeDelegate.viewPracticeModule(_this);
		});*/
	},
	
	onResult : function ( response )
	{
		BP.pushState({module : "practice" }, "Practice - Babelium Project", "?module=practice&action=view&id=");
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading practice module");
	}
});