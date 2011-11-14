
		<section class="exerciseInfo HBox hcenter">
		
			<article class="babeliumPlayer">
				<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
					id="babeliumPlayer" width="500" height="400"
					codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
					<param name="movie" value="util/player/babeliumPlayer.swf" />
					<param name="quality" value="high" />
					<param name="bgcolor" value="#ffffff" />
					<param name="flashVars" value="videoId={$exercise->name}" />
					<param name="videoId" value="{$exercise->name}" />
					<param name="allowScriptAccess" value="sameDomain" />
					<embed src="util/player/babeliumPlayer.swf" quality="high" bgcolor="#ffffff" flashVars=""
						width="500" height="400" name="babeliumPlayer" align="middle"
						play="true"
						loop="false"
						quality="high"
						allowScriptAccess="sameDomain"
						type="application/x-shockwave-flash"
						flashVars="videoId={$exercise->name}"
						videoId="{$exercise->name}"
						pluginspage="http://www.adobe.com/go/getflashplayer">
					</embed>
				</object>
			</article>
			
			<article class="exerciseInfo VBox hcenter vcenter">
{if $loggedIn}
				
{else}
				You must be logged to record an exercise
{/if}
			</article>
			
		</section>