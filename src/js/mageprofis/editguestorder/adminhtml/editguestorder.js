(function(){
    document.observe('click', function(e) {
        if (e.target.id == 'editguestorder_link') {
            e.preventDefault();

            var name     = $(e.target).up('.entry-edit').down('.fieldset .value strong:eq(0)').innerHTML;
            var email    = $(e.target).up('.entry-edit').down('.fieldset .value strong:eq(1)').innerHTML;
            var order_id = location.href.match(/\/order_id\/([0-9]+)\//).pop();

            if (!order_id) {
                alert('Missing order id. Wtf?');
                return;
            }

            name = name.split(' ');

            $('customer_lastname').value = name.pop();
            $('customer_firstname').value = name.join(' ');
            $('customer_email').value = email;
            $$('#editguestorder_overlay form input[name="order_id"]')[0].value = order_id;

            $('editguestorder_overlay').show();
            return false;
        }

        if (e.target.id == 'editguestorder_overlay') {
            $('editguestorder_overlay').hide();
        }

        // Cancel Button
        if (e.findElement('#editguestorder_btn_cncl')) {
            $('editguestorder_overlay').hide();
        }

        // Save Button
        if (e.findElement('#editguestorder_btn_save')) {
            var indicator = $$('.indicator')[0];
            var button = e.findElement('#editguestorder_btn_save');

            button.disable();
            button.addClassName('disabled');
            indicator.show();

            button.up('form').request({
                onComplete: function() {
                    indicator.hide();
                    button.removeClassName('disabled');
                    button.enable();
                    $('loading-mask').hide();
                },
                onSuccess: function(response) {
                    indicator.hide();
                    button.removeClassName('disabled');
                    button.enable();
                    $('loading-mask').hide();
                    var name  = $('customer_firstname').value + ' ' + $('customer_lastname').value;
                    var email = $('customer_email').value;
                    $('editguestorder_link').up('.entry-edit').down('.fieldset .value strong:eq(0)').innerHTML = name;
                    $('editguestorder_link').up('.entry-edit').down('.fieldset .value strong:eq(1)').innerHTML = email;
                }
            });
            $('editguestorder_overlay').hide();
        }
    });
})();
