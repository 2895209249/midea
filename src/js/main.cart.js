require.config({
    paths: {
        jquery: './jquery.min',
        cart: './lib/cart'
    }
});

require(['cart'], function(cart) {
    cart.render(function() {

        $('.cart_item ').on('click',function(e){
            if(typeof $(e.target).attr('id') == 'string'){
                if($(e.target).attr('id').slice(0,7) == 'shopDel'){
                    shop.delete($(e.target).attr('id'));
                }
            }
        })
    });
})