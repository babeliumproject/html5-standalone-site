				
				<article class="exercise">
	  				<aside>
						<div><span>{$time->format($exercise->duration)}</span></div>
					</aside>
					
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
							
							<div>
								<img src="themes/babelium/images/rating.png" width="84" height="16" alt="rating" />
							</div>
							
							<div class="spacer"></div>
								
							<div>
								{$exercise->addingDate|date_format:"%d/%m/%Y"}
							</div>
						</div>
						
						<p class="exerciseDescription">
							{$exercise->description|truncate:160:" [..]"}
						</p>
						
						<p class="username">
							usuario: <font color="#666">{$exercise->userName}</font>
						</p>
						
						<p>
							etiquetas: {foreach from=$exercises->tag item=tag} {$tag} {/foreach}
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
