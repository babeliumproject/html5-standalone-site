<section>
<header>
	<h1>Register</h1>
</header>
{if $errors}
<div class="registerError">
	<strong>ERROR</strong>:{$errors}
</div>
{/if}
<div class="registerForm">
<form onsubmit="new RegisterEvent(RegisterEvent.REGISTER_USER, new NewUserVO(this.username.value, Sha1.hash(this.password.value, true), this.realName.value, this.realSurname.value, this.email.value, '')).dispatch(); return false;">
		<fieldset>
		<legend>Kontuaren datuak</legend>
		Erabiltzaile izena: <input type="text" name="username" required>
		<br>Posta elektronikoa: <input type="email" name="email" required placeholder="Balizko posta helbide elektroniko bat sartu">
		<br>Pasahitza: <input type="password" name="password" required>
		<br>Pasahitza berriz sartu: <input type="password" name="repassword" required>
		<br>Zure Izena: <input type="text" name="realName">
		<br>Zure Abizena: <input type="text" name="realSurname">
		</fieldset>
		<fieldset>
		<legend>Hizkuntzei buruzko datuak</legend>
		Zure euskara ezagutza maila: 
		<select name name="knowledgeLevel">
			<option value="a1">A1 Hasiberria</option>
			<option value="a2">A2 Oinarrizkoa</option>
			<option value="b1">B1 Behe erdi-mailakoa</option>
			<option value="b2">B2 Erdi-mailakoa</option>
			<option value="c1">C1 Goi erdi-mailakoa</option>
			<option value="mt">Ama hizkuntza</option>
		</select>
		</fieldset>
		<br>
		<input class="bigBlueButton" type="submit" value="Erregistratu">
		<input class="bigBlueButton" type="reset" value="Datuak ezabatu">
</form>
</div>

</section>