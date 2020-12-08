<?php
    namespace sschreierStickymenusw5\Subscriber;

    use Enlight\Event\SubscriberInterface;
    use Doctrine\Common\Collections\ArrayCollection;
    use Shopware\Components\Theme\LessDefinition;

    class Less implements SubscriberInterface {
        public static function getSubscribedEvents(){
            return [
               'Theme_Compiler_Collect_Plugin_Less' => 'addLessFiles'
            ];
        }

        /**
         * Provide the needed less files
         *
         * @param \Enlight_Event_EventArgs $args
         * @return LessDefinition[]|ArrayCollection
         */
        public function addLessFiles(\Enlight_Event_EventArgs $args){
            $less = new LessDefinition(
                //configuration
                [
                    'backgroundColorStickyMenu' => Shopware()->Config()->getByNamespace('sschreierStickymenusw5', 'backgroundColorStickyMenu'),
                    'transitionDurationStickyMenu' => Shopware()->Config()->getByNamespace('sschreierStickymenusw5', 'transitionDurationStickyMenu'),
                    'boxShadowStickyMenu' => Shopware()->Config()->getByNamespace('sschreierStickymenusw5', 'boxShadowStickyMenu'),
                    'borderBottomStickyMenu' => Shopware()->Config()->getByNamespace('sschreierStickymenusw5', 'borderBottomStickyMenu'),
                    'zIndexStickyMenu' => Shopware()->Config()->getByNamespace('sschreierStickymenusw5', 'zIndexStickyMenu')
                ],
                //less files to compile
                array(
                    dirname(__DIR__) . '/Resources/frontend/less/all.less'
                ),
                //import directory
                dirname(__DIR__)
            );
            
            return new ArrayCollection(array($less));
        }
    }