				
				<article class="evaluationItem" onClick="new EvaluationEvent(EvaluationEvent.VIEW_REVISION_ASSESMENT, null, {$evaluation->responseId}).dispatch();">
					<header>
						<h1 class="evaluationTitle HBox vcenter">
							<img src="{$locale->getFlagResource($evaluation->exerciseLanguage)}" width="16" height="16" alt="flag"/> 
							<p class="level">{$level->getLevelCorrespondence($evaluation->exerciseAvgDifficulty)}</p>
							<p>{$evaluation->exerciseTitle}</p>
						</h1>
					</header>
				
					<div class="evaluationItemInfo">
						<img src="{$cfg->thumbnail_url}/{$evaluation->exerciseName}/default.jpg" alt="{$evaluation->exerciseTitle}" width="120" height="90" align="left" />
						<img src="{$cfg->thumbnail_url}/{$evaluation->responseFileIdentifier}/default.jpg" alt="{$evaluation->exerciseTitle}" width="120" height="90" align="left" />
						
						<div>
							<p class="assesmentsDate">
								Last assesments date:
							</p>
							
							<p style="text-align: right;">
								{$evaluation->addingDate}
							</p>
								
							<p>
								Assesments count: {$evaluation->responseRatingAmount}
							</p>
												
							<p class="recordDate">
								Record date:
							</p>
							
							<p style="text-align: right;">
								{$evaluation->responseAddingDate}
							</p>
							
							<p>
								Role: {$evaluation->responseCharacterName}
							</p>
						</div>
					</div>
				</article>