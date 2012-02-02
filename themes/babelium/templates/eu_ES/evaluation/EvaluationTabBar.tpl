
		<aside id="tabBarContainer" class="HBox hend">
			<ul id="evaluationTabBar" class="HBox">
{if $isAdmin || !$restrictedEvaluation}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_PENDING_ASSESMENTS).dispatch();">Ebaluazio baten zain daudenak</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">Niri ebaluatutako erantzunak</a></li>
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_BY_USER).dispatch();">Nik ebaluatutako erantzunak</a></li>
{else}
				<li><a href="javascript:new EvaluationEvent(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER).dispatch();">Niri ebaluatutako erantzunak</a></li>
{/if}
			</ul>
		</aside>