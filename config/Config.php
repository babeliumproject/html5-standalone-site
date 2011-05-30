<?php

include_once(__DIR__."/../util/interfaces/iSingleton.php");
include_once("Zend/Log.php");
include_once("Zend/Log/Writer/Stream.php");
include_once("Zend/Log/Formatter/Simple.php");
include_once("Smarty/Smarty.class.php");


/**
 * Setup babelium's configuration
 */
class Config implements ISingleton
{
	/* Unique instance */
	private static $_instance;

	/* Initial variable */
	const CONFIG_FILE = "config/config.xml";

	/*
	 * Configuration
	 */
	// Module definition file
	public $moduleDescFile;			// XML config file
	// Widget definition file
	public $widgetDescFile;			// XML config file
	// Theme
	public $theme;
	// Logger
	public $logger;						// Logger
	// Template engine
	public $smarty;
	
	/*
	 * CONSTS
	 */
	const DEFAULT_LOG_FILE 			= "php://output";
	const DEFAULT_LOG_FORMAT 		= "[%priorityName% : %timestamp%]: %message%";
	
	/* ==== @Zend/Log.php ===
	 * EMERG   = 0;  // Emergency: system is unusable
     * ALERT   = 1;  // Alert: action must be taken immediately
     * CRIT    = 2;  // Critical: critical conditions
     * ERR     = 3;  // Error: error conditions
     * WARN    = 4;  // Warning: warning conditions
     * NOTICE  = 5;  // Notice: normal but significant condition
     * INFO    = 6;  // Informational: informational messages
     * DEBUG   = 7;  // Debug: debug messages
     */
	const DEFAULT_LOG_LEVEL			= 2;
	
	const DEFAULT_MODULE_DESC_FILE 	= "modules/modules.xml";
	const DEFAULT_WIDGET_DESC_FILE 	= "widgets/widgets.xml";
	const DEFAULT_THEME				= "babelium";

	/* Constructor */
	private function __construct()
	{
		$this->parseConfigFile();
	}

	/* Returns an unique instance */
	public static function getInstance()
	{
		if ( !(self::$_instance instanceof self) )
			self::$_instance = new self;

		return self::$_instance;
	}

	/* Parses configuration xml file */
	public function parseConfigFile()
	{
		/*
		 * Load config file
		 */
		try{
			$cfg = simplexml_load_file(self::CONFIG_FILE);
		} catch (Exception $e){
			die("Critical error: unable to load config file.");
		}
		
		if ( !isset($cfg) )
			die("Critical error: invalid config file.");
		
		/*
		 * Logger setup
		 */
		$this->logger = new Zend_Log();

		if ( isset($cfg->logformat) )
			$format = strval($cfg->logformat). PHP_EOL;
		else
			$format = self::DEFAULT_LOG_FORMAT . PHP_EOL;

		$formatter = new Zend_Log_Formatter_Simple($format);
		
		if ( isset($cfg->logfile) )
			$writer = new Zend_Log_Writer_Stream($cfg->logfile);
		else // Default
			$writer = new Zend_Log_Writer_Stream(self::DEFAULT_LOG_FILE);
		
		$writer->setFormatter($formatter);
		$this->logger->addWriter($writer);
		
		if ( isset($cfg->loglevel) )
			$writer->addFilter(intval($cfg->loglevel));
		else
			$writer->addFilter(self::DEFAULT_LOG_LEVEL);
			
		/*
		 * Desc variables
		 */
		if ( isset($cfg->widgetDescFile) )
			$this->widgetDescFile = $cfg->widgetDescFile;
		else
			$this->widgetDescFile = self::DEFAULT_WIDGET_DESC_FILE;
			
		if ( isset($cfg->moduleDescFile) )
			$this->moduleDescFile = $cfg->moduleDescFile;
		else
			$this->moduleDescFile = self::DEFAULT_MODULE_DESC_FILE;
			
		if ( isset($cfg->defaultTheme) )
			$this->theme = $cfg->defaultTheme;
		else
			$this->theme = self::DEFAULT_THEME;


		/*
		 * Template engine
		 */
		$this->smarty = new Smarty();

		$this->smarty->setTemplateDir("themes/".$this->theme."/templates");
		$this->smarty->setCompileDir("themes/".$this->theme."/templates_c");
		$this->smarty->setCacheDir("themes/".$this->theme."/cache");
		$this->smarty->setConfigDir("themes/".$this->theme."/configs");
	}
}
