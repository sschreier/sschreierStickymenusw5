{extends file="parent:frontend/index/index.tpl"}

{block name='frontend_index_navigation_categories_top'}
	{if ({config name="stickyMenuIsActive" namespace="sschreierStickymenusw5"}) == 0}
	    <nav class="navigation-main" 
	    	data-sticky-menu="true" 
	    	data-positionStickyMenuIsActive="{config name='positionStickyMenuIsActive' namespace='sschreierStickymenusw5'}" 
	    	data-viewPort-m="{config name='activeStickyMenuViewportTabletPortrait' namespace='sschreierStickymenusw5'}" 
	    	data-viewPort-l="{config name='activeStickyMenuViewportTabletLandscape' namespace='sschreierStickymenusw5'}" 
	    	data-viewPort-xl="{config name='activeStickyMenuViewportDesktop' namespace='sschreierStickymenusw5'}" 
	    	data-classNameAdvancedMenuContainer="{config name='classNameAdvancedMenuContainer' namespace='sschreierStickymenusw5'}" 
	    	data-verticalScrollbarInAdvancedMenu="{config name='verticalScrollbarInAdvancedMenu' namespace='sschreierStickymenusw5'}" 
	    	data-AdvancedMenuIsActive="{config name='AdvancedMenuIsActive' namespace='sschreierStickymenusw5'}"
	    	>
	        <div class="container" data-menu-scroller="true" data-listSelector=".navigation--list.container" data-viewPortSelector=".navigation--list-wrapper">
	            {block name="frontend_index_navigation_categories_top_include"}
	                {include file='frontend/index/main-navigation.tpl'}
	            {/block}
	        </div>
	    </nav>
    {else}
    	{$smarty.block.parent}
    {/if}
{/block}