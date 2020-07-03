require.config({
    paths: {
        jquery: './jquery.min',
        cart: './lib/cart'
    }
});

require(['cart'], function(cart) {
    cart.render();
})