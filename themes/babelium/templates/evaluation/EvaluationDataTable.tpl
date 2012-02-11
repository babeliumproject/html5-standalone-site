
<!-- Pending Assesments -->
		<section class="evaluationItemList VBox">
			<header>
				<h1>
{if empty($action) || $action == "pending"}
	{assign var="itemRender" value="evaluation/PendingItemRender.tpl"}
					{i18n name="EPAITUGABEDAUDENAK"}
{elseif $action == "byuser"}
	{assign var="itemRender" value="evaluation/ByUserItemRender.tpl"}
					{i18n name="NIKEPAITUTAKOAK"}
{elseif $action == "touser"}
	{assign var="itemRender" value="evaluation/ToUserItemRender.tpl"}
					{i18n name="NIRIPAITUTAKOAK"}
{/if}				
				</h1>
			</header>
			
{include file="util/Pagination.tpl"}
			
			<div class="assesmentsContainer">		

{foreach from=$data item=evaluation name=evaluations}
	{if isset($evaluation) && !empty($evaluation)}
		{include file=$itemRender}
	{/if}
{/foreach}
			</div>
			
{include file="util/Pagination.tpl"}

		</section>