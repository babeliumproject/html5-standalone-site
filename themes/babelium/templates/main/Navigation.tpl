
<!-- HEADER -->
	<header id="tophead">

		<!-- top naviation -->
		<nav id="topnav" class="HBox">
			<!-- left aligned box -->
			<ul id="localenav" class="HBox vcenter">
				<li>{i18n name="MESSAGE_CHOOSE_LOCALE"}:</li>
				<li>
					<select id="localebox" name="localebox" onChange="new LocaleEvent(LocaleEvent.CHANGE, this.value).dispatch();">
						<option value="eu_ES" data-icon="themes/babelium/images/flags/flag_basque_country.png" {if SessionManager::getInstance()->getWebLanguage() == "eu_ES"}selected{/if}>
							{i18n name="LOCALE_EU_ES"}
						</option>
						<option value="en_US" data-icon="themes/babelium/images/flags/flag_united_states.png" {if SessionManager::getInstance()->getWebLanguage() == "en_US"}selected{/if}>
							{i18n name="LOCALE_EN_US"}
						</option>
						<option value="es_ES" data-icon="themes/babelium/images/flags/flag_spain.png" {if SessionManager::getInstance()->getWebLanguage() == "es_ES"}selected{/if}>
							{i18n name="LOCALE_ES_ES"}
						</option>
					</select>
				</li>
			</ul>
			<!-- spacer just to fill space between boxes -->
			<div class="spacer"></div>
			<!-- right aligned box -->
			<ul id="usernav" class="HBox vcenter">
{if $isLoggedIn and isset($user) }
	{include file="userManagement/UserLoggedInNav.tpl"}
{else}
	{include file="userManagement/UserLoggedOutNav.tpl"}
{/if}
			</ul>
		</nav>
		
{include file="userManagement/LoginForm.tpl"}
		
		<!-- logo -->
		<div id="logo"><img src="themes/babelium/images/flan_dullv2.png" alt="Bablium Project" width="174" height="156" /></div>
		
		<!-- main navigation -->
		<nav id="mainnav" class="HBox vcenter">
			<!-- x2 left space width a min-width to avoid logo -->
			<div class="spacer" style="min-width: 174px;"></div>
			<!-- nav links -->
			<ul class="HBox">
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE).dispatch();" class="home">
					{i18n name="LABEL_HOME"}
				</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();" class="pract">
					{i18n name="LABEL_EXERCISES"}
				</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();" class="eval">
					{i18n name="LABEL_EVALUATIONS"}
				</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();" class="subt">
					{i18n name="LABEL_SUBTITLE"}
				</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_CONFIG_MODULE).dispatch();" class="config">
					{i18n name="LABEL_CONFIGURATION"}
				</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_ABOUT_MODULE).dispatch();" class="about">
					{i18n name="LABEL_ABOUT"}
				</a></li>
			</ul>
			<!-- right space -->
			<div class="spacer"></div>
		</nav>		
		
		<!-- search bar -->
		<div id="searchnav" class="HBox vcenter">
				<button id="btnUpload" class="upload">
					{i18n name="LABEL_UPLOAD"}
				</button>
				<input id="txtSearch" type="text" placeholder="Enter your search terms..." class="search boxFlex" />
				<button id="btnSearch">
					{i18n name="LABEL_SEARCH"}
				</button>
		</div>
	</header>
<!--  END OF HEADER -->
<!-- MAIN CONTENT -->
	<section id="maincontent">
{if $hideHeader}
		<header style="display: none;">
{else}
		<header>
{/if}
			<h1>{$moduleTitle}</h1>
			<div class="hhelper"></div>
		</header>
		
		<aside id="loader">
			<div class="VBox vcenter loadcontext">
				<p></p>
			</div>
		</aside>