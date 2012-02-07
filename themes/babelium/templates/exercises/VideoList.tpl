
		<section class="exerciseList VBox">
			<header>
				<h1>{i18n name="EXERCISE_LIST"}</h1>
			</header>
			
{include file="util/Pagination.tpl"}
			
			<div id="exerciseVideoContainer" class="exerciseContainer">
{foreach from=$exercises item=exercise name=videos}
	{assign var="iteration" value=$smarty.foreach.videos.iteration}
	{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
			</div>
			
{include file="util/Pagination.tpl"}

		</section>