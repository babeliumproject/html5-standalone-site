<?php

class TimeFormatter
{
	private $_milliseconds = FALSE;
	
	function TimeFormatter($millis = FALSE)
	{
		$this->_milliseconds = $millis;
	}
	
	public function enabledMilliseconds()
	{
		return $this->_milliseconds;
	}
	
	public function enableMilliseconds($millis)
	{
		$this->_milliseconds = $millis;
	}
	
	public function format($input)
	{
		$value = (int)$input;
		$value = $value * 1000;
		$result = "";

		if ( $value < 3600000 )
		{
			$minutes = (int)($value / 60000);
			$seconds = (int)(($value % 60000) / 1000);
			$milliseconds = ($value % 60000) % 1000;

			if ( $minutes < 10 )
				$result = "0" . $minutes;
			else if ( $minutes >= 10 && $minutes < 60 )
				$result = "$minutes";

			if ( $seconds < 10 )
				$result = $result . ":0" . $seconds;
			else if ( $seconds >= 10 && $minutes < 60 )
				$result = $result . ":" . $seconds;

			if ( $this->_milliseconds )
			{
				if ( $milliseconds < 10 )
					$result = $result . ".00" . $milliseconds;
				else if ( $milliseconds >= 10 && $milliseconds < 100 )
					$result = $result . ".0" . $milliseconds;
				else if ( $milliseconds >= 100 && $milliseconds < 1000 )
					$result = $result . "." . $milliseconds;
			}
		}
		else
		{
			$result = "limit_exceeded";
		}

		return $result;
	}

}

?>