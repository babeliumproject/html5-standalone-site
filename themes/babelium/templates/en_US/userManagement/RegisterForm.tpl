<section> 
<header>
	<h1>Register</h1>
</header> 
{if $errors}
<div id="registerError">
	<strong>ERROR</strong>: {$errors}
</div>
{/if}
{if $success}
<div id="registerSuccess" class="sameMargin">
	<h2>Successfully registered. A confirmation email has been sent to the address you specified.</h2>
</div>
{else}
<div id="registerForm" class="sameMargin">
	<form onsubmit="new RegisterEvent(RegisterEvent.REGISTER_USER, new NewUserVO(this.username.value, Sha1.hash(this.password.value, true), this.realName.value, this.realSurname.value, this.email.value, '')).dispatch(); return false;">
		<fieldset>
			<legend>Account Data</legend>
			User name: <input type="text" name="username" required> <br>
			Email: <input type="email" name="email" required placeholder="Input a valid email address"> <br>
			Password: <input type="password" name="password" required> <br>
			Password confirmation: <input type="password" name="repassword" required> <br>
			Your name: <input type="text" name="realName"> <br>
			Your surname: <input type="text" name="realSurname">
		</fieldset>
		<fieldset>
			<legend>Language data</legend>
			Your knowledge level: 
			<select name name="knowledgeLevel">
				<option value="a1">A1 Beginner</option>
				<option value="a2">A2 Elementary</option>
				<option value="b1">B1 Pre-intermediate</option>
				<option value="b2">B2 Intermediate</option>
				<option value="c1">C1 Upper intermediate</option>
				<option value="mt">Mother tongue</option>
			</select>
		</fieldset>
		<br> 
		<input class="bigBlueButton" type="submit" value="Register">
		<input class="bigBlueButton" type="reset" value="Clear data">
	</form>
</div>
{/if}

</section>
