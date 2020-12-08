{extends file="parent:frontend/index/main-navigation.tpl"}

{block name='frontend_index_navigation_categories_top_home'}
    {if ({config name="showNavigationMenuItemHome" namespace="sschreierStickymenusw5"}) == 0}
        {if ({config name="replaceNavigationMenuItemHomeWithIcon" namespace="sschreierStickymenusw5"}) == 0}
            <li class="navigation--entry{if $sCategoryCurrent == $sCategoryStart && $Controller == 'index'} is--active{/if} is--home" role="menuitem">
                {block name='frontend_index_navigation_categories_top_link_home'}
                    <a class="navigation--link is--first{if $sCategoryCurrent == $sCategoryStart && $Controller == 'index'} active{/if}" href="{url controller='index'}" title="{s name='IndexLinkHome' namespace="frontend/index/categories_top"}{/s}" aria-label="{s name='IndexLinkHome' namespace="frontend/index/categories_top"}{/s}" itemprop="url">
                        <span itemprop="name">{s name='IndexLinkHomeIcon' namespace="frontend/index/categories_top"}<i class="icon--house"></i>{/s}</span>
                    </a>
                {/block}
            </li>
        {else}
            {$smarty.block.parent}
        {/if}
    {/if}
{/block}