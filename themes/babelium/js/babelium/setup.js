
// Babelium Project
var BP = {};

// Push state
BP.pushState = function ( data, title, href )
{
	window.history.pushState(data, title, href);
	BP.state = data;
};

// Application state
BP.state = {};

// Last visited module
BP.at = function ( moduleName )
{
	if ( typeof moduleName == 'undefined' )
		return (typeof BP.state.module == 'undefined') ? null : BP.state.module;
	else 
		return (typeof BP.state.module == 'undefined') ? false : BP.state.module == moduleName;
};

// Last requested action
BP.action = function ( actionName )
{	
	if ( typeof actionName == 'undefined' )
		return (typeof BP.state.action == 'undefined') ? null : BP.state.action;
	else 
		return (typeof BP.state.action == 'undefined') ? false : BP.state.action == actionName;
}
