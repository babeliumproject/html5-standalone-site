
<!-- HEADER -->
	<header id="tophead" class="VBox">

		<!-- top naviation -->
		<nav id="topnav" class="HBox">
			<!-- left aligned box -->
			<ul id="localenav" class="HBox vcenter">
				<li>Language:</li>
				<li>
					<select id="localebox">
						<option value="EU" data-icon="themes/babelium/images/flags/flag_basque_country.png">Basque</option>
						<option value="US" data-icon="themes/babelium/images/flags/flag_united_states.png" selected="true">English (United States)</option>
						<option value="ES" data-icon="themes/babelium/images/flags/flag_spain.png">Spanish (Spain)</option>
					</select>
				</li>
			</ul>
			<!-- spacer just to fill space between boxes -->
			<div class="spacer"></div>
			<!-- right aligned box -->
			<ul id="usernav" class="HBox vcenter">
{include file="userManagement/UserNav.tpl"}
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
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE).dispatch();" class="home">Home</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();" class="pract">Practice</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();" class="eval">Evaluate</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();" class="subt">Subtitle</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_CONFIG_MODULE).dispatch();" class="config">Configure</a></li>
				<li><a href="javascript:new ViewChangeEvent(ViewChangeEvent.VIEW_ABOUT_MODULE).dispatch();" class="about">About Babelium</a></li>
			</ul>
			<!-- right space -->
			<div class="spacer"></div>
		</nav>		
		
		<!-- search bar -->
		<div id="searchnav" class="HBox vcenter">
				<button id="btnUpload" class="upload">Upload</button>
				<input id="txtSearch" type="text" placeholder="Enter your search terms..." class="search boxFlex" />
				<button id="btnSearch">Search</button>
		</div>
	</header>
<!--  END OF HEADER -->
<!-- MOTD -->
	<aside id="motd" class="unsignedMotdBox">
		<ul id="motdmessages" class="HBox hcenter">
		</ul>
		<div id="motdhelper"></div>
	</aside>
<!-- END OF MOTD -->
<!-- MAIN CONTENT -->
	<section id="maincontent" class="VBox">
		<header>
			<h1>{$moduleTitle}</h1>
			{$sectionTitle}
			<div id="hhelper"></div>
		</header>
		<aside id="loader">
			<div id="loadcontext" class="HBox vcenter hcenter">
				<span></span>
				<div class="spacer"></div>
				<progress style="width: 20px; height: 10px;"></progress>
			</div>
		</aside>