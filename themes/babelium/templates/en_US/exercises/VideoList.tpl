
		<section class="exerciseList VBox">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
{include file="$webLocale/util/Pagination.tpl"}
			
			<div id="exerciseVideoContainer" class="exerciseContainer">
{foreach from=$exercises item=exercise name=videos}
	{assign var="iteration" value=$smarty.foreach.videos.iteration}
	{include file="$webLocale/exercises/ExerciseItemRender.tpl"}
{/foreach}
			</div>
			
{include file="$webLocale/util/Pagination.tpl"}

		</section>