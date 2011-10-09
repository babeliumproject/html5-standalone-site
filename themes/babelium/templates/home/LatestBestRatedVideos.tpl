
		<section class="exerciseList">
			<header>
				<h1>Best rated videos</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
		</section>