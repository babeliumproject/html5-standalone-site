<?php

class License
{
	
	public function getTooltip($license)
	{
		switch ($license)
		{
			case 'cc-by-nc-nd':
				return ' Non-Commercial No Derivatives';
				break;
			case 'cc-by-nc-sa':
				return ' Non-Commercial Share Alike';
				break;
			case 'cc-by-nc':
				return ' Non-Commercial';
				break;
			case 'cc-by-nd':
				return ' No Derivatives';
				break;
			case 'cc-by-sa':
				return ' Share Alike';
				break;
			case 'cc-by':

			case 'copyrighted':
				
			default:
				return "";
				break;
		}
	}

}

?>