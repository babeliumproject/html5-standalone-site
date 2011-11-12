
/* ============================================================
 * Exercise VO
 * ==========================================================*/

var ExerciseVO = Cairngorm.VO.extend(
{
	init : function ( id, name, title )
	{
		this.id = id;
		this.name = name;
		this.title = title;
	}
});