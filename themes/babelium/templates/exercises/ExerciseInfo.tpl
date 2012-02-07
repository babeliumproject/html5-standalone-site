
		<section class="exerciseInfo" data-id="{$exercise->id}" data-name="{$exercise->name}">
		
			<header><h1>{$exercise->title}</h1></header>
		
{include file="util/VideoPlayerPreview.tpl"}
			
{if $loggedIn}
			<article class="recordingEndOptions">
				<label>Available actions:</label><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.SAVE_RESPONSE).dispatch();">
					<img src="themes/babelium/images/eo_save_response.png" width="48" height="48" />
					<span>{i18n name="BUTTON_SAVE_RESPONSE"}</span>
				</button><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.WATCH_RESPONSE).dispatch();">
					<img src="themes/babelium/images/eo_watch_sim.png" width="48" height="48" />
					<span>{i18n name="BUTTON_WATCH_RESPONSE"}</span>
				</button><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.RECORD_AGAIN).dispatch();">
					<img src="themes/babelium/images/button_rec.png" width="48" height="48" />
					<span>{i18n name="BUTTON_RECORD_AGAIN"}</span>
				</button><br/>
				<button onClick="new ExerciseEvent(ExerciseEvent.RECORDING_ABORTED).dispatch();">
					<img src="themes/babelium/images/button_abort.png" width="48" height="48" />
					<span>{i18n name="BUTTON_DISCARD_RESPONSE"}</span>
				</button>
			</article>
			
			<article class="exerciseInfo aligned">	
				<label>{i18n name="MESSAGE_CHOOSE_ROLE"}:</label>
				<select id="recRole">
	{foreach from=$roles item=role}
					<option value="{$role->characterName}">{$role->characterName}</option>
	{/foreach}
				</select>
				<label>{i18n name="MESSAGE_CHOOSE_LOCALE"}:</label>
				<select id="recLocale">
	{foreach from=$locales item=locale}
					<option value="{$locale->locale}">{$locale->locale}</option>
	{/foreach}
				</select>
				<label>{i18n name="MESSAGE_CHOOSE_REC_METHOD"}:</label>
				<div class="recordmethod">
					<input type="radio" name="recordingMethod" value="micOnly" checked>{i18n name="OPTION_MIC_ONLY"}</input><br/>
					<input type="radio" name="recordingMethod" value="micCam">{i18n name="OPTION_WEBCAM_AND_MIC"}</input>
				</div>
				<a href="javascript:new ExerciseEvent(ExerciseEvent.REC_START).dispatch();" alt="Record">
					<img src="themes/babelium/images/button_rec.png" class="recordButton" alt="Record!" border="0" width="49" height="49" align="right" />
				</a>
				
{else}
			<article class="exerciseInfo logout">
				<p>{i18n name="LABEL_GUEST_RECORD_WARNING"}</p>
{/if}
			</article>

			<article class="videoInfo">
			
				<div class="topbar HBox">
					<div class="ratyPreview" data-rating="{$exercise->avgRating}" data-readonly="true" id="raty-video-preview"></div>
					<div class="spacer"></div>
					<div style="margin-right: 3px"><img src="themes/babelium/images/shield_icon.png" width="20" height="21" alt="Report" align="left"/></div>
					<div><a href="javascript:void(0);" class="yellow">{i18n name="BUTTON_REPORT"}</a></div>
				</div>
				
{assign var=tags value=explode(',', $exercise->tags)}
{foreach from=$tags item=tag}
				<div class="tag"><p>{$tag}</p></div>
{/foreach}
			</article>

		</section>