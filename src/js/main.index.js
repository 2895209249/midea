require.config({
    paths: {
        jquery: './jquery.min',
        index: './lib/index',
        slider: './jquery.slider'
    }
});

require(['index', 'jquery'], function(index) {
    $(function() {
        $('.slider').slider({
            delay: 1000
        });
    });
    index.render();
});