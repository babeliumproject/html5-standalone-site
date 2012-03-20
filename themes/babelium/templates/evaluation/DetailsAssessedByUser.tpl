

		<section class="evaluationDetails" data-id="{$data->exerciseId}" data-name="{$data->exerciseName}" data-responseid="{$data->responseId}" data-responsename="{$data->responseFileIdentifier}" data-subtitleid="{$data->responseSubtitleId}" data-charname="{$data->responseCharacterName}">
			<header>
				<h1>{$data->exerciseTitle}</h1>
			</header>

{include file="util/VideoPlayerPreview.tpl"}

{include file="evaluation/EvaluationDetails.tpl"}

		</section>
	