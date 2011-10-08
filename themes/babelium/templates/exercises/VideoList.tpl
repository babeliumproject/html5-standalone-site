
		<section class="exerciseList">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
		</section>