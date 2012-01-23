
		<aside id="tabBarContainer" class="HBox hend">
			<ul id="evaluationTabBar" class="HBox">
{if $isAdmin || !$restrictedEvaluation}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_PENDING_ASSESMENTS).dispatch();">Waiting for evaluation</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">Currently assessed to user</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_BY_USER).dispatch();">Currently assessed by user</a></li>
{else}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">Currently assessed to user</a></li>
{/if}
			</ul>
		</aside>