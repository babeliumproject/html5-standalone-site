
		<section class="exerciseList">
			<header>
				<h1>Latest uploaded videos</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
		</section>