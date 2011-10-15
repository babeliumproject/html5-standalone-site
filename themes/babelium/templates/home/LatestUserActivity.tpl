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
{foreach from=$received item=r}
					<tr class="gradeA">
						<td><img src="{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseThumbnailUri}" /></td>
						<td>{$r->responseUserName}</td>
						<td>{$r->addingDate}</td>
						<td>{$r->responseCharacterName}</td>
						<td>{$r->responseRatingAmount}</td>
						<td>{$r->intonationScore}</td>
						<td>{$r->fluencyScore}</td>
						<td>{$r->rhythmScore}</td>
						<td>{$r->spontainetyScore}</td>
						<td>{$r->overallScore}</td>
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
{foreach from=$received item=r}
					<tr class="gradeA">
						<td><img src="{$r->exerciseThumbnailUri}" width="96" height="72" border="0" alt="{$r->exerciseThumbnailUri}" /></td>
						<td>{$r->responseUserName}</td>
						<td>{$r->addingDate}</td>
						<td>{$r->responseCharacterName}</td>
						<td>{$r->intonationScore}</td>
						<td>{$r->fluencyScore}</td>
						<td>{$r->rhythmScore}</td>
						<td>{$r->spontainetyScore}</td>
					</tr>
{/foreach}
				</tbody>
			</table>
		</section>