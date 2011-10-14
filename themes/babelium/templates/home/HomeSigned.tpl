<!-- MOTD MESSAGES -->
		<aside id="motd">
			<ul id="motdmessages" class="HBox vcenter hcenter">
				<li class="HBox">
					<div class="VBox motdContent" style="margin-right: 15px;">
						<span class="title">{$title}</span>
						<p class="motdText">{$motd}</p>
					</div>
					<div class="VBox">
						<ul class="VBox features">
							<li class="HBox featureText">
								<span class="boxFlex3">Obtain credits</span>
								<span class="boxFlex">Use credits</span>
							</li>
							<li>
								<ul class="HBox featureButtons">
									<li class="VBox hcenter vcenter homeUploadButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_UPLOAD_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>Upload</span>
									</li>
								
									<li class="VBox hcenter vcenter homeSubtitleButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();">
										<img src="themes/babelium/images/subtitle_icon.png" width="62" height="63" alt="Upload">
										<span>Subtitle</span>
									</li>
									
									<li class="VBox hcenter vcenter homeEvaluateButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>Evaluate</span>
									</li>
									
									<li class="whitespace"></li>
									
									<li class="VBox hcenter vcenter homePracticeButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();">
										<img src="themes/babelium/images/practice_icon.png" width="62" height="63" alt="Upload">
										<span>Practice</span>
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
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS).dispatch();">Latest uploaded videos</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN).dispatch();">Best rated videos</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_ACTIVITY).dispatch();">My recent activity</a></li>
					</ul>
				</li>
			</ul>
			
			<div class="hhelper"></div>
		</aside>
<!-- END OF MOTD MESSAGES -->