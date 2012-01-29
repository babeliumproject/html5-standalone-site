
<!-- Pending Assesments -->
		<section class="VBox">
			<header>
				<h1>
{if empty($action) || $action == "pending"}
	{assign var="itemRender" value="$webLocale/evaluation/PendingItemRender.tpl"}
					Waiting for Assesments
{elseif $action == "byuser"}
	{assign var="itemRender" value="$webLocale/evaluation/ByUserItemRender.tpl"}
					Assesments assesed by user
{elseif $action == "touser"}
	{assign var="itemRender" value="$webLocale/evaluation/ToUserItemRender.tpl"}
					Assesments assesed to user
{/if}				
				</h1>
			</header>
			
{include file="$webLocale/util/Pagination.tpl"}
			
			<div class="assesmentsContainer">		

{foreach from=$data item=evaluation name=evaluations}
	{if isset($evaluation) && !empty($evaluation)}
		{include file=$itemRender}
	{/if}
{/foreach}
			</div>
			
{include file="$webLocale/util/Pagination.tpl"}

		</section>