<section>
<header>
	<h1>{i18n name="ACCOUNT_ACTIVATION"}</h1>
</header>
{if !$activationlanguage}
<div id="registerError">
	<strong>ERROR</strong>: {i18n name="ERROR_WHILE_ACTIVATING_ACCOUNT"}
</div>
{else}
<div class="sameMargin">
	<h2>Account successfully activated. Redirecting you to home...</h2>
</div>
{/if}

</section>