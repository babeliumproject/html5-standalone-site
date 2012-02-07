
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
								<span class="boxFlex3">{i18n name="OBTAIN_CREDITS"}</span>
								<span class="boxFlex">{i18n name="SPEND_CREDITS"}</span>
							</li>
							<li>
								<ul class="HBox featureButtons">
									<li class="VBox hcenter vcenter homeUploadButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_UPLOAD_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>{i18n name="LABEL_UPLOAD"}</span>
									</li>
								
									<li class="VBox hcenter vcenter homeSubtitleButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_SUBTITLE_MODULE).dispatch();">
										<img src="themes/babelium/images/subtitle_icon.png" width="62" height="63" alt="Upload">
										<span>{i18n name="LABEL_SUBTITLE"}</span>
									</li>
									
									<li class="VBox hcenter vcenter homeEvaluateButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EVALUATION_MODULE).dispatch();">
										<img src="themes/babelium/images/upload_icon.png" width="62" height="63" alt="Upload">
										<span>{i18n name="LABEL_EVALUATIONS"}</span>
									</li>
									
									<li class="whitespace"></li>
									
									<li class="VBox hcenter vcenter homePracticeButton" onClick="new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE).dispatch();">
										<img src="themes/babelium/images/practice_icon.png" width="62" height="63" alt="Upload">
										<span>{i18n name="LABEL_EXERCISES"}</span>
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
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS).dispatch();">
							{i18n name="LATEST_UPLOADED_VIDEOS"}
						</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN).dispatch();">
							{i18n name="LATEST_BEST_RATED_VIDEOS"}
						</a></li>
						<li><a href="javascript:new HomepageEvent(HomepageEvent.LATEST_USER_ACTIVITY).dispatch();">
							{i18n name="MY_ACTIVITY"}
						</a></li>
					</ul>
				</li>
			</ul>
			
			<div class="hhelper"></div>
		</aside>
<!-- END OF MOTD MESSAGES -->