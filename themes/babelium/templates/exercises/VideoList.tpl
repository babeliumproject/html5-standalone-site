
		<section class="exerciseList VBox">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
			<aside class="paginationPanel HBox vcenter">
				<div class="paginationFilter HBox vcenter">
					<strong>Filter by title:</strong>
					<input class="title" type="text" value="" style="margin: 0px 20px 0px 20px;"/>
					<strong>Filter by description:</strong>
					<input class="description" type="text" value="" style="margin: 0px 20px 0px 20px;"/>
				</div>

				<div class="spacer"></div>

				<div class="paginationPaging HBox vcenter">
					<div class="text"><b>Paging:</b> </div>
					<div class="paginationButtons HBox vcenter"></div>
					<div class="paginationInfo"></div>
				</div>
			</aside>
			
			<div class="exerciseContainer">
{foreach from=$exercises item=exercise name=videos}
				{assign var="iteration" value=$smarty.foreach.videos.iteration}
  				{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
			</div>
			
			<aside class="paginationPanel HBox vcenter">
				<div class="paginationFilter HBox vcenter">
					<strong>Filter by title:</strong>
					<input class="title" type="text" value="" style="margin: 0px 20px 0px 20px;"/>
					<strong>Filter by description:</strong>
					<input class="description" type="text" value="" style="margin: 0px 20px 0px 20px;"/>
				</div>

				<div class="spacer"></div>

				<div class="paginationPaging HBox vcenter">
					<div class="text"><b>Paging:</b> </div>
					<div class="paginationButtons HBox vcenter"></div>
					<div class="paginationInfo"></div>
				</div>
			</aside>
		</section>