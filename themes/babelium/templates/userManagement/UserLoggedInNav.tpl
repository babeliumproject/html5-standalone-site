
				<li><a href="#" class="img"><img src="themes/babelium/images/help_icon.png" alt="Help" width="19" height="19" /></a></li>
				<li><a href="#" class="blue">{i18n name="LABEL_HELP"}</a></li>
				<li>{i18n name="TEXT_CREDIT_COUNT"} <span class="yellow" id="creditCount">{$user->creditCount}</span></li>
				<li><img src="themes/babelium/images/coins_icon.png" alt="Help" width="19" height="19" /></li>
				<li>{i18n name="LABEL_WELCOME"} ( <a href="#" class="orange">{$user->name}</a> )</li>
				<li><a href="javascript:new LoginEvent(LoginEvent.SIGN_OUT).dispatch();" class="img"><img src="themes/babelium/images/close_icon.png" alt="Help" width="19" height="19" /></a></li>