
		<section class="exerciseList">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			<article>
  				<aside>
					<div><span>{$exercise->duration}</span></div>
				</aside>
				
				<div>
					<h1>
						{$exercise->title}
					</h1>
					
					<div class="HBox dtop">
						<div>
							<img src="{$locale->getFlagResource($exercise->language)}" width="16" height="16" alt="flag"/>
						</div>
						
						<div>
							{$level->getLevelCorrespondence($exercise->avgDifficulty)}
						</div>
						
						<div class="boxFlex"></div>
						
						<div>
							<img src="themes/babelium/images/rating.png" width="84" height="16" alt="rating" />
						</div>
						
						<div class="boxFlex"></div>
							
						<div>
							{$exercise->addingDate}
						</div>
					</div>
					
					<p>
						{$exercise->description}
					</p>
					
					<p class="username">
						usuario: <font color="#666">{$exercise->userName}</font>
					</p>
					
					<p>
						etiquetas: {foreach from=$exercises->tag item=tag} {$tag} {/foreach}
					</p>
					
					<p>
					{if $exercise->license eq "cc-by-nc-nd"}
						<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
						Non-Commercial No Derivatives
					{elseif $exercise->license eq "cc-by-nc-sa"}
						<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
						Non-Commercial Share Alike
					{elseif $exercise->license eq "cc-by-nc"}
						<a href="http://creativecommons.org/licenses/by-nc/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
						Non-Commercial
					{elseif $exercise->license eq "cc-by-nd"}
						<a href="http://creativecommons.org/licenses/by-nd/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
						No Derivatives
					{elseif $exercise->license eq "cc-by-sa"}
						<a href="http://creativecommons.org/licenses/by-sa/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
						Share Alike
					{elseif $exercise->license eq "cc-by"}
						<a href="http://creativecommons.org/licenses/by/3.0/">
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
						</a>
					{elseif $exercise->license eq "copyrighted"}
							<img src="themes/babelium/images/licenses/{$exercise->license}.png" 
										width="80" height="15" alt="{$exercise->license}" border="0">
					{/if}
					</p>
				</div>
			</article>
{/foreach}
		</section>