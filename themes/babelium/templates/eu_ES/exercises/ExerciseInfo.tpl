
		<section class="exerciseInfo" data-id="{$exercise->id}" data-name="{$exercise->name}">
		
			<header><h1>{$exercise->title}</h1></header>
		
{include file="$webLocale/util/VideoPlayerPreview.tpl"}
			
{if $loggedIn}
			<article class="recordingEndOptions">
				<label>Aukera eskuragarriak:</label><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.SAVE_RESPONSE).dispatch();">
					<img src="themes/babelium/images/eo_save_response.png" width="48" height="48" />
					<span>Erantzuna Argitaratu</span>
				</button><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.WATCH_RESPONSE).dispatch();">
					<img src="themes/babelium/images/eo_watch_sim.png" width="48" height="48" />
					<span>Erantzuna ikusi</span>
				</button><br/>
				<button disabled="disabled" onClick="new ExerciseEvent(ExerciseEvent.RECORD_AGAIN).dispatch();">
					<img src="themes/babelium/images/button_rec.png" width="48" height="48" />
					<span>Berriz grabatu</span>
				</button><br/>
				<button onClick="new ExerciseEvent(ExerciseEvent.RECORDING_ABORTED).dispatch();">
					<img src="themes/babelium/images/button_abort.png" width="48" height="48" />
					<span>Erantzuna baztertu</span>
				</button>
			</article>
			
			<article class="exerciseInfo aligned">	
				<label>Rol bat aukeratu:</label>
				<select id="recRole">
	{foreach from=$roles item=role}
					<option value="{$role->characterName}">{$role->characterName}</option>
	{/foreach}
				</select>
				<label>Hizkuntza bat aukeratu:</label>
				<select id="recLocale">
	{foreach from=$locales item=locale}
					<option value="{$locale->locale}">{$locale->locale}</option>
	{/foreach}
				</select>
				<label>Grabaketa metodoa aukeratu:</label>
				<div class="recordmethod">
					<input type="radio" name="recordingMethod" value="micOnly" checked>Mikrofonoa bakarrik</input><br/>
					<input type="radio" name="recordingMethod" value="micCam">Web-kamera eta mikrofonoa</input>
				</div>
				<a href="javascript:new ExerciseEvent(ExerciseEvent.REC_START).dispatch();" alt="Record">
					<img src="themes/babelium/images/button_rec.png" class="recordButton" alt="Record!" border="0" width="49" height="49" align="right" />
				</a>
				
{else}
			<article class="exerciseInfo logout">
				<p>Kautotuta egon behar zara ariketa bat grabatzeko</p>
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