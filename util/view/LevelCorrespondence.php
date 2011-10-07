<?php

class LevelCorrespondence
{
	/**
	 * Level Correspondence
	 */
	public function getLevelCorrespondence($lvl)
	{
		switch((int)$lvl)
		{
			case 1:
				return 'A1';
				break;
			case 2:
				return 'A2';
				break;
			case 3:
				return 'B1';
				break;
			case 4:
				return 'B2';
				break;
			case 5:
				return 'C1';
				break;
			default:
				return "";
				break;
		}
	}
}

?>