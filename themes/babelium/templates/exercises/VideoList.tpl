
		<section class="exerciseList">
			<header>
				<h1>Practice exercise list</h1>
			</header>
			
			<aside class="paginationPanel HBox vcenter">
				<div class="paginationFilter HBox vcenter">
					<strong>Filter:</strong>
					<input type="text" value="" style="margin-left: 20px;" />
				</div>

				<div class="spacer"></div>

				<div class="paginationPaging HBox vcenter">
					<div class="text"><b>Paging:</b> </div>
					<div class="paginationButtons HBox vcenter"></div>
					<div class="paginationInfo"></div>
				</div>
			</aside>
			
			<div class="exerciseContainer">
{foreach from=$exercises item=exercise}
  				{include file="exercises/ExerciseItemRender.tpl"}
{/foreach}
			</div>
			
			<aside class="paginationPanel HBox vcenter">
				<div class="paginationFilter HBox vcenter">
					<strong>Filter:</strong>
					<input type="text" value="" style="margin-left: 20px;" />
				</div>

				<div class="spacer"></div>

				<div class="paginationPaging HBox vcenter">
					<div class="text"><b>Paging:</b> </div>
					<div class="paginationButtons HBox vcenter"></div>
					<div class="paginationInfo"></div>
				</div>
			</aside>
		</section>