
		<section class="exerciseList">
			<header>
				<h1>Best rated videos</h1>
			</header>
			
{foreach from=$exercises item=exercise name=videos}
			{assign var="iteration" value=$smarty.foreach.videos.iteration}
  			{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
		</section>