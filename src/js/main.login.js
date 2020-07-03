require.config({
    paths: {
        jquery: './jquery.min',
        login: './lib/login'
    }
});

require(['login', 'jquery'], function(login) {
    $('.zhuce').on('click', function() {
        $('.login').addClass('hide');
        $('.login_hide').removeClass('hide');
    })
    $('.denglu').on('click', function() {
        $('.login').removeClass('hide');
        $('.login_hide').addClass('hide');
    })
    login.render();
    
})