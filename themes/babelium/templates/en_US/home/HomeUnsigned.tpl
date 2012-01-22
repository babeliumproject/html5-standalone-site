
<!-- MOTD MESSAGES -->
		<aside id="motd">
			<ul id="motdmessageshelper" class="HBox hcenter vcenter">
				<li class="HBox vcenter hcenter">1</li>
				<li class="HBox vcenter hcenter">2</li>
				<li class="HBox vcenter hcenter">3</li>
				<li class="HBox vcenter hcenter">4</li>
			</ul>
		
			<ul id="motdmessages" class="HBox vcenter hcenter">
{foreach from=$motds item=motd}
				<li class="motdMessage">
					<div class="HBox">
						<div class="HBox vstart hcenter motdImage">
							<img src="http://babeliumproject.com/{$motd->resourceUrl}" alt="{$motd->resourceUrl}" />
						</div>
						<div class="VBox motdContent" style="margin-right: 15px;">
							<span class="title">{$motd->title}</span>
							<p class="motdText">{$motd->message}</p>
						</div>
					</div>
				</li>
{/foreach}
			</ul>
			
			<div class="hhelper"></div>
		</aside>
<!-- END OF MOTD MESSAGES -->
