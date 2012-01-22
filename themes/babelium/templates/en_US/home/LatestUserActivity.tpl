
<!-- Assesments received -->
		<section class="exerciseList">
			<header>
				<h1>Assesments I recently received</h1>
			</header>
			
			<table width="100%" id="assesmentsReceived" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>Original Video</th>
						<th>Assessor</th>
						<th>Date</th>
						<th>Selected role</th>
						<th>Assesment count</th>
						<th>Intonation</th>
						<th>Fluency</th>
						<th>Rhythm</th>
						<th>Spontaneity</th>
						<th>Overall</th>
					</tr>
				</thead>
				<tbody>
{foreach from=$received item=r name=received}
					<tr class="gradeA">
						<td>
							<figure class="thumbnail">
								<figcaption>{$time->format($r->exerciseDuration)}</figcaption>
								<img src="{$cfg->imagePath}/{$r->exerciseName}/{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseTitle}" />
							<figure>
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
		<section class="exerciseList">
			<header>
				<h1>Assesments I recently done</h1>
			</header>
			
			<table width="100%" id="assesmentsGiven" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>Original Video</th>
						<th>Recorder</th>
						<th>Date</th>
						<th>Selected role</th>
						<th>Intonation</th>
						<th>Fluency</th>
						<th>Rhythm</th>
						<th>Spontaneity</th>
						<th>Overall</th>
					</tr>
				</thead>
				<tbody>
{foreach from=$given item=r name=given}
					<tr class="gradeA">
						<td>
							<figure class="thumbnail">
								<figcaption>{$time->format($r->exerciseDuration)}</figcaption>
								<img src="{$cfg->imagePath}/{$r->exerciseName}/{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseTitle}" />
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