
<!-- Pending Assesments -->
		<section class="VBox">
			<header>
				<h1>
{if empty($action) || $action == "pending"}
	{assign var="itemRender" value="$webLocale/evaluation/PendingItemRender.tpl"}
					Ebaluazio baten zain daudenak
{elseif $action == "byuser"}
	{assign var="itemRender" value="$webLocale/evaluation/ByUserItemRender.tpl"}
					Nik ebaluatutako erantzunak
{elseif $action == "touser"}
	{assign var="itemRender" value="$webLocale/evaluation/ToUserItemRender.tpl"}
					Niri ebaluatutako erantzunak
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