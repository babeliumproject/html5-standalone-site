
<!-- HEADER -->
	<header id="tophead">

		<!-- top naviation -->
		<nav id="topnav" class="HBox">
			<!-- left aligned box -->
			<ul id="localenav" class="HBox vcenter">
				<li>Hizkuntza:</li>
				<li>
					<select id="localebox">
						<option value="EU" data-icon="themes/babelium/images/flags/flag_basque_country.png">Euskara</option>
						<option value="US" data-icon="themes/babelium/images/flags/flag_united_states.png" selected="true">Ingelesa (Estatu Batuak)</option>
						<option value="ES" data-icon="themes/babelium/images/flags/flag_spain.png">Espainiera (Espainia)</option>
					</select>
				</li>
			</ul>
			<!-- spacer just to fill space between boxes -->
			<div class="spacer"></div>
			<!-- right aligned box -->
			<ul id="usernav" class="HBox vcenter">
{if $isLoggedIn and isset($user) }
	{include file="$webLocale/userManagement/UserLoggedInNav.tpl"}
{else}
	{include file="$webLocale/userManagement/UserLoggedOutNav.tpl"}
{/if}
			</ul>
		</nav>
		
{include file="$webLocale/userManagement/LoginForm.tpl"}
		
		<!-- logo -->
		<div id="logo"><img src="themes/babelium/images/flan_dullv2.png" alt="Bablium Project" width="174" height="156" /></div>
		
		<!-- main navigation -->
		<nav id="mainnav" class="HBox vcenter">
			<!-- x2 left space width a min-width to avoid logo -->
			<div class="spacer" style="min-width: 174px;"></div>
			<!-- nav links -->
			<ul class="HBox">
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE).dispatch();" class="home">Hasiera</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();" class="pract">Praktikatu</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();" class="eval">Ebaluatu</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();" class="subt">Azpititulatu</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_CONFIG_MODULE).dispatch();" class="config">Konfiguratu</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_ABOUT_MODULE).dispatch();" class="about">Mintzabeli buruz</a></li>
			</ul>
			<!-- right space -->
			<div class="spacer"></div>
		</nav>		
		
		<!-- search bar -->
		<div id="searchnav" class="HBox vcenter">
				<button id="btnUpload" class="upload">Bidali</button>
				<input id="txtSearch" type="text" placeholder="Sartu zure bilaketa terminoak..." class="search boxFlex" />
				<button id="btnSearch">Bilatu</button>
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