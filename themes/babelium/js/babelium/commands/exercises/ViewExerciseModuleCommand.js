
/**
 * ViewExerciseModuleCommand
 */
var ViewExerciseModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		BP.EM.selectedExercise = null;

		BP.CMS.prepareMainContent("practice module", function ()
		{
			BP.PracticeDelegate.viewPracticeModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.SM.pushState("Practice - Babelium Project", "?module=practice", {module : "practice"});
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading practice module");
	}
});