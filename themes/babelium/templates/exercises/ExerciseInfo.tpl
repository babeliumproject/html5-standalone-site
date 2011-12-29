
		<section class="exerciseInfo">
		
			<header><h1>{$exercise->title}</h1></header>
		
{include file="util/VideoPlayerPreview.tpl"}
			
{if $loggedIn}
			<article class="exerciseInfo aligned">	
				<label>Choose a role:</label>
				<select id="recRole">
	{foreach from=$roles item=role}
					<option value="{$role->characterName}">{$role->characterName}</option>
	{/foreach}
				</select>
				<label>Choose a language:</label>
				<select id="recLocale">
	{foreach from=$locales item=locale}
					<option value="{$locale->locale}">{$locale->locale}</option>
	{/foreach}
				</select>
				<label>Choose recording method:</label>
				<div class="recordmethod">
					<input type="radio" name="recordingMethod" value="micOnly" checked>Microphone only</input><br/>
					<input type="radio" name="recordingMethod" value="micCam">Webcam and microphone</input>
				</div>
				<a href="javascript:new ExerciseEvent(ExerciseEvent.REC_START).dispatch();" alt="Record">
					<img src="themes/babelium/images/button_rec.png" class="recordButton" alt="Record!" border="0" width="49" height="49" align="right" />
				</a>
				
{else}
			<article class="exerciseInfo centered">
				<p>You must be logged to record an exercise</p>
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