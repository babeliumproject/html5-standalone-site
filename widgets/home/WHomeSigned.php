<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WHomeSigned implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		/**$home = new Home();
		$response = $home->signedMessagesOfTheDay("en");**/
		
		$title = "Welcome to Babelium";
		$motd = "Babelium it's community of people who likes to learn and teach languages.
Babelium is a collaborative language practising environment. Here you'll be able to improve your speaking skills with the help of other users, which are native or fluent in the language you're practicing, whilst you help other users providing knowledge and assessment around your own mother language.<br/>
Just record or grab a video that you think could be interesting to practice a language and upload it so that other users can practice with it. You can also dub the exercises that other users uploaded. On top of this you can also assess the work of other people and be assessed.";
		
		$cfg->smarty->assign("title", $title);
		$cfg->smarty->assign("motd", $motd);
		return $cfg->smarty->fetch("home/HomeSigned.tpl");
	}
}

?>