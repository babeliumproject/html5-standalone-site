<?php

$localeFile;
$locale = SessionManager::getInstance()->getWebLanguage();

/*
 * Smarty plugin
 * -------------------------------------------------------------
 * File:     Smarty.i18n.php
 * Type:     function
 * Name:     i18n
 * Purpose:  outputs a random magic answer
 * -------------------------------------------------------------
 */
function smarty_function_i18n($params, &$smarty)
{
	global $localeFile, $locale;
	
    if ( !isset($localeFile) || empty($localeFile) )
		$localeFile = file(dirname(__FILE__) . "/../../locale/$locale.i18n");
		
	$ret = "Nothing";
		
	// Parse file
	foreach ( $localeFile as $line )
	{
		$tmp = explode("=", $line, 2);
		if ( count($tmp) == 2 && $tmp[0] == $params["name"] )
		{
			$ret = $tmp[1];
			break;
		}
	}
		
	return $ret;
}

?>