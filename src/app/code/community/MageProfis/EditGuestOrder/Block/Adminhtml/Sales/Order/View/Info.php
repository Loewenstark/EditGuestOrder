<?php

class MageProfis_EditGuestOrder_Block_Adminhtml_Sales_Order_View_Info
    extends Mage_Adminhtml_Block_Sales_Order_View_Info
{
    public function getAccountEditLink($label = '')
    {
        if (empty($label))
        {
            $label = $this->__('Edit');
        }
        $url = $this->getCustomerViewUrl();
        if ($url)
        {
            return '<a href="' . $url . '" target="_blank">' . $label . '</a>';
        }
        return '<a href="' . $this->getUrl('*/editguestorder_index') . '" id="editguestorder_link">' . $label . '</a>';
    }
}
