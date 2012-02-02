				
				<article class="evaluationItem" data-responseId="{$evaluation->responseId}">
					<header>
						<h1 class="evaluationTitle HBox vcenter">
							<img src="{$locale->getFlagResource($evaluation->exerciseLanguage)}" width="16" height="16" alt="flag"/> 
							<p class="level">{$level->getLevelCorrespondence($evaluation->exerciseAvgDifficulty)}</p>
							<p>{$evaluation->exerciseTitle}</p>
						</h1>
					</header>
				
					<div class="evaluationItemInfo">
						<img src="{$cfg->imagePath}/{$evaluation->exerciseName}/default.jpg" alt="{$evaluation->exerciseTitle}" width="120" height="90" align="left" />
						<img src="{$cfg->imagePath}/{$evaluation->responseFileIdentifier}/default.jpg" alt="{$evaluation->exerciseTitle}" width="120" height="90" align="left" />
						
						<div>
							<p class="assesmentsDate">
								Azkeneko ebaluazioaren data: {$evaluation->addingDate}
							</p>
								
							<p>
								Ebaluazio kopurua: {$evaluation->responseRatingAmount}
							</p>
												
							<p class="recordDate">
								Grabaketa data:
							</p>
							
							<p style="text-align: right;">
								{$evaluation->responseAddingDate}
							</p>
							
							<p>
								Rola: {$evaluation->responseCharacterName}
							</p>
						</div>
					</div>
				</article>