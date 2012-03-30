				
				<article class="exercise" onClick='new ExerciseEvent(ExerciseEvent.EXERCISE_SELECTED, new ExerciseVO({$exercise->id}, "{$exercise->name}", "{$exercise->title}")).dispatch();' data-id="{$exercise->id}" data-title="{$exercise->title}" data-name="{$exercise->name}">
	  				<figure class="thumbnail">
						<img src="{$cfg->thumbnail_url}/{$exercise->name}/default.jpg" alt="{$exercise->title}" width="120" height="90" align="left" />
						<figcaption>{$time->format($exercise->duration)}</figcaption>
					</figure>
					
					<div>
						<h1 class="exerciseTitle">
							{$exercise->title}
						</h1>
						
						<div class="HBox dtop">
							<div>
								<img src="{$locale->getFlagResource($exercise->language)}" width="16" height="16" alt="flag"/>
							</div>
							
							<div>
								{$level->getLevelCorrespondence($exercise->avgDifficulty)}
							</div>
							
							<div class="spacer"></div>
							
							<div class="raty" data-rating="{$exercise->avgRating}" data-readonly="true" id="raty-videos-{$iteration}">
							</div>
							
							<div class="spacer"></div>
								
							<div>
								{$exercise->addingDate|date_format:"%d/%m/%Y"}
							</div>
						</div>
						
						<p class="exerciseDescription">
							{$exercise->description|truncate:140:" [..]"}
						</p>
						
						<p class="username">
							usuario: <font color="#666">{$exercise->userName}</font>
						</p>
						
						<p>
							etiquetas: {foreach from=$exercise->tags item=tag} {$tag} {/foreach}
						</p>
						
						<p>
							<a href="http://creativecommons.org/licenses/{$exercise->license|replace:'cc-':''}/3.0/">
								<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
											width="80" height="15" alt="{$exercise->license}" border="0">
							</a>
							{$license->getTooltip($exercise->license)}
						</p>
					</div>
				</article>
