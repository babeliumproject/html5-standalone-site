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
			/**
			 * Parse value
			 * change {0} by smarty variable param0
			 */
			$endpos = 0;
			
			$pos = strrpos($value, "{");
			
			while ( $pos !== false )
			{
				$endpos = strrpos($value, "}", $pos);

				if ( $endpos !== false )
				{
					$num = intval(substr($value, $pos+1, $endpos - $pos -1));
					$value = substr($value, 0, $pos) . $params["param".$num] . substr($value, $endpos + 1, strlen($value) - $endpos - 1);
				}

				$pos = strrpos($value, "{", $pos+1);
			}
			
			$ret = $value;
			
			break;
		}
	}
		
	return $ret;
}

?>