(function($, window) {
	var $window = $(window);

    $.plugin('sschreierStickyMenu', {
		defaults: {
			positionStickyMenuIsActive: 200,
			cloneMainNavigationStickyClass: 'navigation-main-sticky',
			activeClass: 'is--active'
        },

        init: function() {
            var me = this;

            me.applyDataAttributes();

            me.createElement();
            me.registerEvents();
        },

        createElement: function() {
			var me = this,
				verticalScrollbarInAdvancedMenu = $('.navigation-main').attr("data-verticalScrollbarInAdvancedMenu"),
			 	classNameAdvancedMenuContainer = $('.navigation-main').attr("data-classNameAdvancedMenuContainer");;
			
			me.$nav = me.$el.clone();

			me.$nav.addClass(me.opts.cloneMainNavigationStickyClass).appendTo('body');
			
			$('.navigation-main-sticky .js--menu-scroller--arrow.left--arrow').remove();
			$('.navigation-main-sticky .js--menu-scroller--arrow.right--arrow').remove();
			
			/* add new classes for the advanced menu from the scroll nav */
			$('.navigation-main-sticky .navigation--list-wrapper').addClass("navigation--list-wrapper--navigation-main-sticky");	
			$('.navigation-main-sticky .navigation--list.container').addClass("container--navigation-main-sticky");	
			$('.navigation-main-sticky .navigation--entry').addClass("navigation--entry--navigation-main-sticky");	
			$('.navigation-main-sticky .navigation--link').addClass("navigation--link--navigation-main-sticky");	
			$('.navigation-main-sticky .button--close').addClass("button--close--navigation-main-sticky");	
			$('.navigation-main-sticky .menu--container').addClass("menu--container--navigation-main-sticky");	
			
			
			/* update the data attributes from the advanced menu from the scroll nav */
			$('.navigation-main-sticky > .container').attr( "data-viewportselector", ".navigation--list-wrapper--navigation-main-sticky");
			$('.navigation-main-sticky > .container').attr( "data-listselector", ".navigation--list.container.container--navigation-main-sticky");
			$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).attr( "data-listselector", ".navigation--list.container.container--navigation-main-sticky");
			$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).attr( "data-navigationitemselector", ".navigation--entry--navigation-main-sticky:not(.is--home)");
			$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).attr( "data-navigationlinkselector", ".navigation--link--navigation-main-sticky");
			$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).attr( "data-closebuttonselector", ".button--close--navigation-main-sticky");
			$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).attr( "data-menucontainerselector", ".menu--container--navigation-main-sticky");
			
			if(verticalScrollbarInAdvancedMenu == "0"){
				$('.navigation-main-sticky .navigation--entry:not(.is--home), .navigation-main-sticky .'+classNameAdvancedMenuContainer).hover(
					function (){
						$('.navigation-main-sticky').css('height', '100%');
						$('.navigation-main-sticky .container').css('height', '100%');
						$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).css('height', '90%');
						$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).css('overflow-y', 'scroll');
					},
					function (){
						$('.navigation-main-sticky').css('height', 'auto');
						$('.navigation-main-sticky .container').css('height', 'auto');
						$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).css('height', 'auto');
						$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).css('overflow-y', 'auto');
					}
				);			
			}
			
			$.publish('plugin/sschreierStickyMenu/onCreateElement', [ me ]);
        },

        registerEvents: function() {
            var me = this;

            me._on($window, 'scroll', $.proxy(me.onScroll, me));
        },

        onScroll: function() {
            var me = this,
            	positionStickyMenuIsActive = $('.navigation-main').attr("data-positionStickyMenuIsActive"),
            	AdvancedMenuIsActive = $('.navigation-main').attr("data-AdvancedMenuIsActive"),
            	classNameAdvancedMenuContainer = $('.navigation-main').attr("data-classNameAdvancedMenuContainer");
			
			me.$nav.toggleClass(
				me.opts.activeClass,
				($window.scrollTop() >= positionStickyMenuIsActive)
			);
			
			if($window.scrollTop() >= positionStickyMenuIsActive){
				if(AdvancedMenuIsActive == "0"){
					$('.navigation-main-sticky .'+classNameAdvancedMenuContainer).advancedMenu();
				}
				
				window.StateManager.addPlugin('*[data-menu-scroller="true"]', 'swMenuScroller');
			}				
			
			$.publish('plugin/sschreierStickyMenu/onScrollElement', [ me ]);
        },

        destroy: function() {
            var me = this;

			me.$nav.remove();

            me._destroy();
        }
    });

    $(function() {
		var viewportM = $('.navigation-main').attr("data-viewport-m");
		var viewportL = $('.navigation-main').attr("data-viewport-l");
		var viewportXl = $('.navigation-main').attr("data-viewport-xl");
		
		
		if(viewportM == 1 && viewportL == 1 &&  viewportXl == 1){
		}else if(viewportM == 0 && viewportL == 1 &&  viewportXl == 1){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['m']
			);
        }else if(viewportM == 1 && viewportL == 0 &&  viewportXl == 1){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['l']
			);
		}else if(viewportM == 1 && viewportL == 1 &&  viewportXl == 0){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['xl']
			);
		}else if(viewportM == 0 && viewportL == 0 &&  viewportXl == 1){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['m', 'l']
			);
		}else if(viewportM == 0 && viewportL == 1 &&  viewportXl == 0){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['m', 'xl']
			);
		}else if(viewportM == 1 && viewportL == 0 &&  viewportXl == 0){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['l', 'xl']
			);
		}else if(viewportM == 0 && viewportL == 0 &&  viewportXl == 0){
			window.StateManager.addPlugin(
				'*[data-sticky-menu="true"]',
				'sschreierStickyMenu',
				['m', 'l', 'xl']
			);
		}	
    });
})(jQuery, window);