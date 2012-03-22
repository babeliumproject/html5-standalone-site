

		<section class="evaluationDetails" data-id="{$response->exerciseId}" data-name="{$response->exerciseName}" data-responseid="{$response->responseId}" data-responsename="{$response->responseFileIdentifier}" data-subtitleid="{$response->responseSubtitleId}" data-charname="{$response->responseCharacterName}">
			<header>
				<h1>{$response->exerciseTitle}</h1>
			</header>

{include file="util/VideoPlayerPreview.tpl"}

			<article class="evaluationUsers">
				<ul class="HBox" id="evaluationUserNames">
{foreach from=$userNames item=userName name=evaluationUserNames}
					<li><a href="javascript:void(0);">{$userName}</a></li>
{/foreach}
				</ul>
			</article>

			<div id="userEvaluationsContainer">
{foreach from=$evaluations item=data name=evaluationData}
	{if $smarty.foreach.evaluationData.iteration eq 1}
				<div class="evaluationContainer">
	{else}
				<div class="evaluationContainer" style="display:none;">
	{/if}
					<article class="evaluationUser">
						<h3>{i18n name="TITLE_USER_EVALUATION" param0=$data->userName}</h3>
						<span class="yellow">{$data->addingDate}</span>
					</article>
					<article class="evaluationRating">
						<div class="evaluationRatingLabels">
							<p>{i18n name="LABEL_INTONATION_SCORE"}</p>
							<p>{i18n name="LABEL_FLUENCY_SCORE"}</p>
							<p>{i18n name="LABEL_RHYTHM_SCORE"}</p>
							<p>{i18n name="LABEL_SPONTANEITY_SCORE"}</p>
							<p>{i18n name="LABEL_OVERALL_SCORE"}</p>
						</div>
						<div>
							<p id="intonation{$smarty.foreach.evaluationData.iteration}" class="ratyPreview" data-rating="{$data->intonationScore}" data-readonly="true"></p>
							<p id="fluency{$smarty.foreach.evaluationData.iteration}" class="ratyPreview" data-rating="{$data->fluencyScore}" data-readonly="true"></p>
							<p id="rhythm{$smarty.foreach.evaluationData.iteration}" class="ratyPreview" data-rating="{$data->rhythmScore}" data-readonly="true"></p>
							<p id="spontaneity{$smarty.foreach.evaluationData.iteration}" class="ratyPreview" data-rating="{$data->spontaneityScore}" data-readonly="true"></p>
							<p id="overall{$smarty.foreach.evaluationData.iteration}" class="ratyPreview" data-rating="{$data->overallScore}" data-readonly="true"></p>
						</div>
					</article>
					<article class="evaluationComments">
						<p>
							<strong>{i18n name="COMMENTS"}</strong><br/>
							<q>
	{if isset($data->comment) && !empty($data->comment)}
								{$data->comment}
	{else}
								{i18n name="NO_COMMENT_AVAILABLE"}
	{/if}
							</q>
						</p>
						<p>
							<strong>{i18n name="VIDEOCOMMENT"}</strong><br/>
							<q>
	{if isset($data->evaluationVideoFileIdentifier) && !empty($data->evaluationVideoFileIdentifier) }
								TODO: show evaluation video
	{else}
								{i18n name="NO_COMMENT_AVAILABLE"}
	{/if}
							</q>
						</p>
					</article>
				</div>
{/foreach}
			</div>

		</section>
	