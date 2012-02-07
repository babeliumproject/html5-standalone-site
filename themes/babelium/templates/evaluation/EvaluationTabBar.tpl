
		<aside id="tabBarContainer" class="HBox hend">
			<ul id="evaluationTabBar" class="HBox">
{if $isAdmin || !$restrictedEvaluation}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_PENDING_ASSESMENTS).dispatch();">
					{i18n name="EPAITUGABEDAUDENAK"}
				</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">
					{i18n name="NIRIPAITUTAKOAK"}
				</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_BY_USER).dispatch();">
					{i18n name="NIKEPAITUTAKOAK"}
				</a></li>
{else}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">
					{i18n name="NIRIPAITUTAKOAK"}
				</a></li>
{/if}
			</ul>
		</aside>