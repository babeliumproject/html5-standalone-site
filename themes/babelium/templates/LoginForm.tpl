		<aside id="popup">
			<div class="HBox">
				<div class="spacer"></div>
				<ul class="HBox vcenter">
					<li><input form="loginForm" type="text" name="loginuser" placeholder="Enter username" required autofocus /></li>
					<li><input form="loginForm" type="password" name="loginpass" placeholder="Enter password" required /></li>
					<li><input form="loginForm" type="checkbox" name="loginremember" checked>Remember me!</input></li>
					<li><button form="loginForm">Login!</button>
				</ul>
			</div>
			<form id="loginForm" onsubmit="new LoginEvent(LoginEvent.PROCESS_LOGIN, new LoginVO(this.loginuser.value, Sha1.hash(this.loginpass.value, true), this.loginremember.checked)).dispatch(); return false;"></form>
		</aside>