<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

class WHomeUnsigned implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$cfg->smarty->assign("title1", "Record a video exercise as many times as you want");
		$cfg->smarty->assign("motd1", "After recording a video-exercise you can watch or redo it again  before publishing it?
Just click the Watch Simultaneously or Watch Response button. Whenever you are confident
with your work,  click 'Save Response' Button in order to be evaluated.");
		$cfg->smarty->assign("image1", "");
		
		$cfg->smarty->assign("title2", "Did you know that you can dub your favourite actor?");
		$cfg->smarty->assign("motd2", "or actress? Do you feel lucky, punk?");
		$cfg->smarty->assign("image2", "");
		
		$cfg->smarty->assign("title3", "Did you know that you can report an innapropiate video?");
		$cfg->smarty->assign("motd3", "Users can report inappropiate videos, choosing the reason for banning among a frequently used reasons list.");
		$cfg->smarty->assign("image3", "");
		
		$cfg->smarty->assign("title4", "Did you know that you can follow us on Twitter?");
		$cfg->smarty->assign("motd4", "Just follow the @babelium user");
		$cfg->smarty->assign("image4", "");
		
		return $cfg->smarty->fetch("home/HomeUnsigned.tpl");
	}
}

?>