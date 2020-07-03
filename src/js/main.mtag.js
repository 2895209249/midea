require.config({
    paths: {
        jquery: './jquery.min',
        mtag: './lib/mtag',
        cookie: './cookie',
        magnifier: './magnifier',
        public2: './public2'
    },
    shim: {}
});

require(['jquery', 'mtag'], function($, mtag) {
    // 回调函数 解决代码执行顺序问题
    // 当页面渲染完成才能获取元素
    // mtag.render(function(id, price) {
    //     $('.add').on('click', function() {
    //         mtag.addItem(id, price, $('.num').val());
    //     })
    // });
    mtag.render(function(id, price) {
        $('.add').on('click', function() {
            mtag.addShopCar(id, price, $('.num').val());
        })
    });


});