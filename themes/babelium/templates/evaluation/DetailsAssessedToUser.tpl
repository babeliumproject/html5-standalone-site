

		<section class="evaluationDetails" data-id="{$evaluation->exerciseId}" data-name="{$evaluation->exerciseName}" data-responseid="{$evaluation->responseId}" data-responsename="{$evaluation->responseFileIdentifier}" data-subtitleid="{$evaluation->responseSubtitleId}" data-charname="{$evaluation->responseCharacterName}">
			<header>
				<h1>{$evaluation->exerciseTitle}</h1>
			</header>

{include file="util/VideoPlayerPreview.tpl"}

			<div class="evaluationContainer">
				<article class="evaluationUsers">
					<ul class="HBox">
{foreach from=$userNames item=userName name=evaluationUserNames}
	{if $userName eq $data->userName}
						<li><strong>{$userName}</strong></li>
	{else}
						<li><a href="{$smarty.foreach.evaluationUserNames.iteration - 1}">{$userName}</a></li>
	{/if}
{/foreach}
					</ul>
				</article>
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
						<p class="ratyPreview" data-rating="{$data->intonationScore}" data-readonly="true"></p>
						<p class="ratyPreview" data-rating="{$data->fluencyScore}" data-readonly="true"></p>
						<p class="ratyPreview" data-rating="{$data->rhythmScore}" data-readonly="true"></p>
						<p class="ratyPreview" data-rating="{$data->spontaneityScore}" data-readonly="true"></p>
						<p class="ratyPreview" data-rating="{$data->overallScore}" data-readonly="true"></p>
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

		</section>
	