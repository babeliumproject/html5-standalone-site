
<!-- Assesments received -->
		<section>
			<header>
				<h1>{i18n name="USER_LATEST_RECEIVED_ASSESSMENTS"}</h1>
			</header>
			
			<table width="100%" id="assesmentsReceived" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>{i18n name="JATORRIZKOA"}</th>
						<th>{i18n name="JUDGE"}</th>
						<th>{i18n name="DATE"}</th>
						<th>{i18n name="SELECTEDCHAR"}</th>
						<th>{i18n name="BALORAZIOKOP"}</th>
						<th>{i18n name="LABEL_INTONATION_SCORE"}</th>
						<th>{i18n name="LABEL_FLUENCY_SCORE"}</th>
						<th>{i18n name="LABEL_RHYTHM_SCORE"}</th>
						<th>{i18n name="LABEL_SPONTANEITY_SCORE"}</th>
						<th>{i18n name="LABEL_OVERALL_SCORE"}</th>
					</tr>
				</thead>
				<tbody>
{foreach from=$received item=r name=received}
					<tr class="gradeA">
						<td>
							<figure class="thumbnail">
								<figcaption>{$time->format($r->exerciseDuration)}</figcaption>
								<img src="{$cfg->thumbnail_url}/{$r->exerciseName}/{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseTitle}" />
							</figure>
						</td>
						<td style="vertical-align: middle !important;">{$r->responseUserName}</td>
						<td style="vertical-align: middle !important;">{$r->addingDate}</td>
						<td style="vertical-align: middle !important;">{$r->responseCharacterName}</td>
						<td style="vertical-align: middle !important;">{$r->responseRatingAmount}</td>
						<td style="vertical-align: middle !important;" id="raty-received-{$smarty.foreach.received.iteration}1" class="raty" data-readonly="true" data-rating="{$r->intonationScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-received-{$smarty.foreach.received.iteration}2" class="raty" data-readonly="true" data-rating="{$r->fluencyScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-received-{$smarty.foreach.received.iteration}3" class="raty" data-readonly="true" data-rating="{$r->rhythmScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-received-{$smarty.foreach.received.iteration}4" class="raty" data-readonly="true" data-rating="{$r->spontaneityScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-received-{$smarty.foreach.received.iteration}5" class="raty" data-readonly="true" data-rating="{$r->overallScore}"></td>
					</tr>
{/foreach}
				</tbody>
			</table>
			
		</section>
		
		
<!-- Assesments done -->
		<section>
			<header>
				<h1>{i18n name="USER_LATEST_DONE_ASSESSMENTS"}</h1>
			</header>
			
			<table width="100%" id="assesmentsGiven" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>{i18n name="JATORRIZKOA"}</th>
						<th>{i18n name="GRABADOR"}</th>
						<th>{i18n name="DATE"}</th>
						<th>{i18n name="SELECTEDCHAR"}</th>
						<th>{i18n name="LABEL_INTONATION_SCORE"}</th>
						<th>{i18n name="LABEL_FLUENCY_SCORE"}</th>
						<th>{i18n name="LABEL_RHYTHM_SCORE"}</th>
						<th>{i18n name="LABEL_SPONTANEITY_SCORE"}</th>
						<th>{i18n name="LABEL_OVERALL_SCORE"}</th>
					</tr>
				</thead>
				<tbody>
{foreach from=$given item=r name=given}
					<tr class="gradeA">
						<td>
							<figure class="thumbnail">
								<figcaption>{$time->format($r->exerciseDuration)}</figcaption>
								<img src="{$cfg->thumbnail_url}/{$r->exerciseName}/{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseTitle}" />
							</figure>
						</td>
						<td style="vertical-align: middle !important;">{$r->responseUserName}</td>
						<td style="vertical-align: middle !important;">{$r->addingDate}</td>
						<td style="vertical-align: middle !important;">{$r->responseCharacterName}</td>
						<td style="vertical-align: middle !important;" id="raty-given-{$smarty.foreach.given.iteration}1" class="raty" data-readonly="true" data-rating="{$r->intonationScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-given-{$smarty.foreach.given.iteration}2" class="raty" data-readonly="true" data-rating="{$r->fluencyScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-given-{$smarty.foreach.given.iteration}3" class="raty" data-readonly="true" data-rating="{$r->rhythmScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-given-{$smarty.foreach.given.iteration}4" class="raty" data-readonly="true" data-rating="{$r->spontaneityScore}"></td>
						<td style="vertical-align: middle !important;" id="raty-given-{$smarty.foreach.given.iteration}5" class="raty" data-readonly="true" data-rating="{$r->overallScore}"></td>
					</tr>
{/foreach}
				</tbody>
			</table>
		</section>
