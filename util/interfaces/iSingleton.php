<?php


/**
 * Implements Singleton Pattern
 * ----------------------------
 * Reference:
 * http://www.cristalab.com/tutoriales/crear-e-implementar-el-patron-de-diseno-singleton-en-php-c256l/
 */
interface ISingleton
{
	// Returns unique instance of a class
	public static function getInstance();
}

?>
