
		<section class="exerciseInfo">
		
			<article class="babeliumPlayer">
				<h1>{$exercise->title}</h1>
			
				<div>
					<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
						id="babeliumPlayer" width="100%" height="100%"
						codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
						<param name="movie" value="util/player/babeliumPlayer.swf" />
						<param name="quality" value="high" />
						<param name="bgcolor" value="#ffffff" />
						<param name="flashVars" value="" />
						<param name="wmode" value="window" />
						<param name="allowScriptAccess" value="sameDomain" />
						<embed src="util/player/babeliumPlayer.swf" quality="high" bgcolor="#ffffff" flashVars=""
							width="100%" height="100%" name="babeliumPlayer" align="middle" wmode="window"
							play="true"
							loop="false"
							quality="high"
							allowScriptAccess="sameDomain"
							type="application/x-shockwave-flash"
							pluginspage="http://www.adobe.com/go/getflashplayer">
						</embed>
					</object>
				</div>
			</article>
			
			<article class="exerciseInfo VBox hcenter vcenter">
{if $loggedIn}
				
{else}
				You must be logged to record an exercise
{/if}
			</article>
			
		</section>