<?php

class MageProfis_EditGuestOrder_EditguestorderController
    extends Mage_Adminhtml_Controller_Action
{
    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

    public function postAction()
    {
        $post = $this->getRequest()->getPost();
        try {
            if (empty($post)) {
                Mage::throwException($this->__('Invalid form data.'));
            }

            $order = Mage::getModel('sales/order')->load($post['order_id']);
            $order->setCustomerEmail($post['customer_email']);
            $order->setCustomerFirstname($post['customer_firstname']);
            $order->setCustomerLastname($post['customer_lastname']);
            $order->save();

        } catch (Exception $e) {
            Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
        }
        $this->_redirect('*/*');
    }
}
