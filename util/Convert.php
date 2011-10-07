<?php
	/**
	 * Conversion array <-> stdClass
	 * @source: http://www.php.net/manual/es/language.types.object.php
	 */

    # A static class of mine, has more conversions in it, yet these two are the relevent ones.
    final class Convert {
        # Convert a stdClass to an Array.
        static public function object_to_array(stdClass $Class){
            # Typecast to (array) automatically converts stdClass -> array.
            $Class = (array)$Class;
            
            # Iterate through the former properties looking for any stdClass properties.
            # Recursively apply (array).
            foreach($Class as $key => $value){
                if(is_object($value)&&get_class($value)==='stdClass'){
                    $Class[$key] = self::object_to_array($value);
                }
            }
            return $Class;
        }
        
        # Convert an Array to stdClass.
        static public function array_to_object(array $array){
            # Iterate through our array looking for array values.
            # If found recurvisely call itself.
            foreach($array as $key => $value){
                if(is_array($value)){
                    $array[$key] = self::array_to_object($value);
                }
            }
            
            # Typecast to (object) will automatically convert array -> stdClass
            return (object)$array;
        }
    }
?>