
<!-- MOTD MESSAGES -->
		<aside id="motd">
			<ul id="motdsignedmessage">
				<li>
					<div class="VBox motdContent" style="margin-right: 15px;">
						<span class="title">{$title}</span>
						<p class="motdText">{$motd}</p>
					</div>
				</li>
				<li>
					<div class="VBox">
						<ul class="VBox features">
							<li class="HBox featureText">
								<span class="boxFlex3">Kredituak lortu</span>
								<span class="boxFlex">Kredituak erabili</span>
							</li>
							<li>
								<ul class="HBox featureButtons">
									<li class="VBox hcenter vcenter homeUploadButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_UPLOAD_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>Bidali</span>
									</li>
								
									<li class="VBox hcenter vcenter homeSubtitleButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();">
										<img src="themes/babelium/images/subtitle_icon.png" width="62" height="63" alt="Upload">
										<span>Azpititulatu</span>
									</li>
									
									<li class="VBox hcenter vcenter homeEvaluateButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>Ebaluatu</span>
									</li>
									
									<li class="whitespace"></li>
									
									<li class="VBox hcenter vcenter homePracticeButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();">
										<img src="themes/babelium/images/practice_icon.png" width="62" height="63" alt="Upload">
										<span>Praktikatu</span>
									</li>
								</ul>
							</li>
						</ul>
						<div class="spacer"></div>
					</div>
				</li>
			</ul>
			
			<ul class="HBox motdLinksHelper">
				<li class="spacer"></li>
				<li>
					<ul id="motdLinks" class="HBox">
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS).dispatch();">Igotako azkeneko bideoak</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN).dispatch();">Balorazio hobereneko bideoak</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_ACTIVITY).dispatch();">Nire azkeneko aktibitatea</a></li>
					</ul>
				</li>
			</ul>
			
			<div class="hhelper"></div>
		</aside>
<!-- END OF MOTD MESSAGES -->
