
		<aside id="popup">
			<div class="HBox">
				<div class="spacer"></div>
				<form id="loginForm" onsubmit="new LoginEvent(LoginEvent.PROCESS_LOGIN, new LoginVO(this.loginuser.value, Sha1.hash(this.loginpass.value, true), this.loginremember.checked)).dispatch(); return false;">
					<ul class="HBox vcenter">
						<li id="loginhelper"></li>
						<li><input form="loginForm" type="text" name="loginuser" placeholder="{i18n name="LABEL_USER_NAME"}" required autofocus /></li>
						<li><input form="loginForm" type="password" name="loginpass" placeholder="{i18n name="LABEL_PASSWORD"}" required /></li>
						<li><input form="loginForm" type="checkbox" name="loginremember" checked>
							{i18n name="LABEL_REMEMBER_ME"}
						</input></li>
						<li><button form="loginForm">Login!</button>
					</ul>
				</form>
			</div>
		</aside>