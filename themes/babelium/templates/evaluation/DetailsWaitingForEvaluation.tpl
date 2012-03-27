

		<section class="evaluationDetails" data-id="{$data->exerciseId}" data-name="{$data->exerciseName}" data-responseid="{$data->responseId}" data-responsename="{$data->responseFileIdentifier}" data-subtitleid="{$data->responseSubtitleId}" data-charname="{$data->responseCharacterName}">
			<header>
				<h1>{$data->exerciseTitle}</h1>
			</header>

{include file="util/VideoPlayerPreview.tpl"}

			<div class="evaluationContainer">
				<article class="evaluationRating">
					<h3>{i18n name="MESSAGE_RATE_THE_USERS_RESPONSE" param0=$data->responseUserName}</h3>
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
						<p id="intonationEval" class="ratyPreview"></p>
						<p id="fluencyEval" class="ratyPreview"></p>
						<p id="rhythmEval" class="ratyPreview"></p>
						<p id="spontaneityEval" class="ratyPreview"></p>
						<p id="overallEval" class="ratyPreview"></p>
					</div>
				</article>
				<article class="evaluationComments">
					{i18n name="MESSAGE_OPTIONAL_EVALUATION_DATA"}
					<textarea id="responseCommentEval"></textarea>
				</article>
				<article class="evaluationSubmit">
					<button class="bigBlueButton" onClick="new EvaluationEvent(EvaluationEvent.SEND_EVALUATION_FORM_DATA).dispatch();">{i18n name="LABEL_SEND_EVALUATION"}</button>
					<button class="cancel" onClick="new EvaluationEvent(EvaluationEvent.RESET_EVALUATION_FORM_DATA).dispatch();">{i18n name="LABEL_RESET_EVALUATION"}</button>
				</article>
			</div>

		</section>
	