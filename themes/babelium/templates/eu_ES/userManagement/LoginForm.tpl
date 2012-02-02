
		<aside id="popup">
			<div class="HBox">
				<div class="spacer"></div>
				<ul class="HBox vcenter">
					<li id="loginhelper"></li>
					<li><input form="loginForm" type="text" name="loginuser" placeholder="Erabiltzaile izena sartu" required autofocus /></li>
					<li><input form="loginForm" type="password" name="loginpass" placeholder="Pasahitza sartu" required /></li>
					<li><input form="loginForm" type="checkbox" name="loginremember" checked>Gogora nazazu!</input></li>
					<li><button form="loginForm">Kautotu!</button>
				</ul>
			</div>
			<form id="loginForm" onsubmit="new LoginEvent(LoginEvent.PROCESS_LOGIN, new LoginVO(this.loginuser.value, Sha1.hash(this.loginpass.value, true), this.loginremember.checked)).dispatch(); return false;"></form>
		</aside>
