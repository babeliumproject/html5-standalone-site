
<!-- Assesments received -->
		<section class="exerciseList">
			<header>
				<h1>Azken aldian jasotako ebaluazioak</h1>
			</header>
			
			<table width="100%" id="assesmentsReceived" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>Jatorrizko bideoa</th>
						<th>Ebaluatzailea</th>
						<th>Data</th>
						<th>Aukeratutako rola</th>
						<th>Ebaluazio kopurua</th>
						<th>Intonazioa</th>
						<th>Hitz-jarioa</th>
						<th>Erritmoa</th>
						<th>Berezkotasuna</th>
						<th>Orokorra</th>
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
				<h1>Azken aldian egindako ebaluazioak</h1>
			</header>
			
			<table width="100%" id="assesmentsGiven" cellpadding="0" cellspacing="0" border="0" class="display">
				<thead>
					<tr>
						<th>Jatorrizko bideoa</th>
						<th>Grabatzailea</th>
						<th>Data</th>
						<th>Aukeratutako pertsonaia</th>
						<th>Intonazioa</th>
						<th>Hitz-jarioa</th>
						<th>Erritmoa</th>
						<th>Berezkotasuna</th>
						<th>Orokorra</th>
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
