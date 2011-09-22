		<aside id="popup">
			<div class="HBox">
				<div class="spacer"></div>
				<ul class="HBox vcenter">
					<li><input form="loginForm" type="text" name="loginuser" placeholder="Enter username" required autofocus /></li>
					<li><input form="loginForm" type="password" name="loginmail" placeholder="Enter password" required /></li>
					<li><input form="loginForm" type="checkbox" name="loginremember" checked>Remember me!</input></li>
					<li><button form="loginForm" onclick="new LoginEvent(LoginEvent.PROCESS_LOGIN).dispatch()">Login!</button>
				</ul>
			</div>
			<form id="loginForm"></form>
		</aside>