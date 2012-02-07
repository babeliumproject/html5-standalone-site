
		<section class="exerciseList VBox">
			<header>
				<h1>{i18n name="LATEST_BEST_RATED_VIDEOS"}</h1>
			</header>
			
			<div id="homeVideosContainer" class="exerciseContainer">
{foreach from=$exercises item=exercise name=videos}
			{assign var="iteration" value=$smarty.foreach.videos.iteration}
  			{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
			</div>
		</section>