<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" /> 
	<title>Babelium Project</title>

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" media="screen" href="themes/babelium/main.css" />
	
	<!-- JQuery -->
	<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.js"></script>-->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>

	<!-- Init -->
	<script type="text/javascript" src="themes/babelium/js/init.js"></script>
	
	<!-- Loader -->
	<script type="text/javascript" src="themes/babelium/js/loader.js"></script>
</head>
<body class="VBox">
<!-- HEADER -->
	<header id="tophead" class="VBox">

		<!-- top naviation -->
		<nav id="topnav" class="HBox">
			<!-- left aligned box -->
			<ul class="HBox vcenter">
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
			<ul class="HBox vcenter">
				<li><a href="#" class="img"><img src="themes/babelium/images/help_icon.png" alt="Help" width="17" height="17" /></a></li>
				<li><a href="#" class="blue">Help</a></li>
				<li><a href="#" class="blue">Blog</a></li>
				<li><a href="#" class="yellow">Login</a></li>
				<li><a href="#" class="yellow">Register</a></li>
			</ul>
		</nav>
		
		<!-- logo -->
		<div id="logo"><img src="themes/babelium/images/flan_dullv2.png" alt="Bablium Project" width="174" height="156" /></div>
		
		<!-- main navigation -->
		<nav id="mainnav" class="HBox vcenter">
			<!-- x2 left space width a min-width to avoid logo -->
			<div class="spacer" style="min-width: 174px;"></div>
			<!-- nav links -->
			<ul class="HBox">
				<li><a href="javascript:go('home');" class="home">Home</a></li>
				<li><a href="javascript:go('practice');" class="pract">Practice</a></li>
				<li><a href="javascript:go('evaluation');" class="eval">Evaluate</a></li>
				<li><a href="javascript:go('subtitle');" class="subt">Subtitle</a></li>
				<li><a href="javascript:go('config');" class="config">Configure</a></li>
				<li><a href="javascript:go('about');" class="about">About Babelium</a></li>
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
			<h1></h1>
			<div id="hhelper"></div>
		</header>
		<aside id="loader">
			<div id="loadcontext" class="HBox vcenter hcenter">
				<span></span>
				<div class="spacer"></div>
				<progress style="width: 20px; height: 10px;"></progress>
			</div>
		</aside>
		<section>
		</section>
	</section>
<!-- END OF MAIN CONTENT -->
<!-- FOOTER -->
<div class="boxFlex"></div>
<footer>
Footer
</footer>
<!-- END OF FOOTER -->
</body>
</html>
