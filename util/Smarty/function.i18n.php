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
		
	$ret = "Undefined";
		
	// Parse file
	foreach ( $localeFile as $line )
	{
		list($name, $value) = explode("=", $line, 2);
		if ( $name == $params["name"] )
		{
			$ret = $value;
			break;
		}
	}
		
	return $ret;
}

?>