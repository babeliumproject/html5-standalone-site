
		<section class="exerciseInfo">
		
{include file="util/VideoPlayerPreview.tpl"}
			
{if $loggedIn}
			<article class="exerciseInfo VBox">	
{else}
			<article class="exerciseInfo VBox hcenter vcenter">
				You must be logged to record an exercise
{/if}
			</article>

			<article class="videoInfo">
			
				<div class="topbar HBox">
					<div class="ratyPreview" data-rating="{$exercise->avgRating}" data-readonly="true" id="raty-video-preview"></div>
					<div class="spacer"></div>
					<div style="margin-right: 3px"><img src="themes/babelium/images/shield_icon.png" width="20" height="21" alt="Report" align="left"/></div>
					<div><a href="javascript:void(0);" class="yellow">Report</a></div>
				</div>
				
{assign var=tags value=explode(',', $exercise->tags)}
{foreach from=$tags item=tag}
				<div class="tag"><p>{$tag}</p></div>
{/foreach}
			</article>

		</section>