
/**
 * ExerciseSelectedCommand
 */
var ExerciseSelectedCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
		
		if ( this.data == null )
			return;
		
		// TODO exercise selected successfully at this.data.exercise (example id: 201)
		
		/*BP.CMS.prepareMainContent("practice module", function ()
		{
			BP.PracticeDelegate.viewPracticeModule(_this);
		});*/
	},
	
	onResult : function ( response )
	{
		BP.pushState({module : "practice" }, "Practice - Babelium Project", "?module=practice&action=view&id=" + this.data.id);
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading practice module");
	}
});