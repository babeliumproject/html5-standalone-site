
		<section class="exerciseList">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			<article>
				<h1>
					{$exercise->title}
				</h1>
				
				<aside>
					<div style="width:150px; height:80px; background-color: black"></div>
				</aside>
			</article>
{/foreach}
		</section>