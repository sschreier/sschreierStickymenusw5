<?php
  namespace sschreierStickymenusw5\Subscriber;

  use Enlight\Event\SubscriberInterface;
  use Psr\Container\ContainerInterface;

  class EventSubscriber implements SubscriberInterface {
    private $pluginDirectory;

    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct($pluginName, $pluginDirectory, ContainerInterface $container){
      $this->pluginDirectory = $pluginDirectory;
      $this->container = $container;
    }

    public static function getSubscribedEvents(){
      return [
        'Enlight_Controller_Action_PostDispatchSecure_Frontend' => 'onPostDispatch'
      ];
    }

    public function onPostDispatch(\Enlight_Controller_ActionEventArgs $args){
      $controller = $args->get('subject');
      $view = $controller->View();

      $view->addTemplateDir($this->pluginDirectory . '/Resources/views');
    }
  }