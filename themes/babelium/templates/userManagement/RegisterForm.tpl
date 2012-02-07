<section> 
<header>
	<h1>{i18n name="LABEL_SIGN_UP"}</h1>
</header> 
{if $errors}
<div id="registerError">
	<strong>ERROR</strong>: {$errors}
</div>
{/if}
{if $success}
<div id="registerSuccess" class="sameMargin">
	<h2>{i18n name="ACTIVATION_EMAIL_SENT"}</h2>
</div>
{else}
<div id="registerForm" class="sameMargin">
	<form onsubmit="new RegisterEvent(RegisterEvent.REGISTER_USER, new NewUserVO(this.username.value, Sha1.hash(this.password.value, true), this.realName.value, this.realSurname.value, this.email.value, '')).dispatch(); return false;">
		<fieldset>
			<legend>Account Data</legend>
			{i18n name="LABEL_USER_NAME"}<input type="text" name="username" required> <br>
			{i18n name="LABEL_EMAIL"}<input type="email" name="email" required placeholder="Input a valid email address"> <br>
			{i18n name="LABEL_PASSWORD"}<input type="password" name="password" required> <br>
			{i18n name="LABEL_REPASSWORD"}<input type="password" name="repassword" required> <br>
			{i18n name="LABEL_REAL_NAME"}<input type="text" name="realName"> <br>
			{i18n name="LABEL_REAL_SURNAME"}<input type="text" name="realSurname">
		</fieldset>
		<fieldset>
			<legend>Language data</legend>
			{i18n name="LABEL_LANGUAGE_KNOWLEDGE"}
			<select name name="knowledgeLevel">
				<option value="a1">{i18n name="LEVEL_A1"}</option>
				<option value="a2">{i18n name="LEVEL_A2"}</option>
				<option value="b1">{i18n name="LEVEL_B11"}</option>
				<option value="b2">{i18n name="LEVEL_B12"}</option>
				<option value="c1">{i18n name="LEVEL_C1"}</option>
				<option value="mt">{i18n name="LABEL_FIRST_LANGUAGE"}</option>
			</select>
		</fieldset>
		<br> 
		<input class="bigBlueButton" type="submit" value="{i18n name="LABEL_SIGN_UP"}">
		<input class="bigBlueButton" type="reset" value="Clear data">
	</form>
</div>
{/if}

</section>
