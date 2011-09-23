{if $isLoggedIn and isset($user) }
	{include file="userManagement/UserLoggedInNav.tpl"}
{else}
	{include file="userManagement/UserLoggedOutNav.tpl"}
{/if}