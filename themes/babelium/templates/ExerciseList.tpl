
		<section style='width:100%; background-color: green;'>
			<header>
				<h1>This is home!</h1>
			</header>
			
{foreach from=$exercises item=exercise}
  			<article style='width:50%;height:100px;float:left;background-color:#CECECE;'>
				<h1 style='background-color:red;'>
					{$exercise.title}
				</h1>
			</article>
{/foreach}
		</section>