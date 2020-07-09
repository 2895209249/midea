function magnifier() {
    var movebox = $('.movebox'),
        bigpic = $('.bigpic'),
        big = $('.big'),

        smallpic = $('.smallpic');
    li = $('.thumbnails>li>img')
    picimg = document.querySelector('.smallpic>img')
    bigimg = document.querySelector('.bigpic')

    // 1. 绑定事件
    smallpic.on('mouseover', function() {
        // 让元素显示
        movebox.addClass('show');
        big.addClass('show');
        // movebox的大小计算
        movebox.css({
            width: ((smallpic.width() * big.width()) / bigpic.width()  )/2+ 'px',
            height: ((smallpic.height() * big.height()) / bigpic.height() )/2+ 'px' 
        })
        // 2.让movebox跟随鼠标移动
        smallpic.on('mousemove', function(ev) {
            // console.log(smallpic.height());

            let top = ev.pageY - smallpic.offset().top - movebox.height() / 2;
            let left = ev.pageX - smallpic.offset().left - movebox.width() / 2;

            // 3.比例计算
            let ratio = bigpic.width() / smallpic.height(); // 小数 大于1的数
            let uratio = bigpic.height()/ smallpic.width();
            // console.log(bigpic.height() / smallpic.height());
            // console.log(top);
            // console.log(left);
            // 边界管理
            if (top <= 0) {
                top = 0;
            } else if (top >= smallpic.height() - movebox.height()) {
                top = smallpic.height() - movebox.height() - 2;
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= smallpic.width() - movebox.width()) {
                left = smallpic.width() - movebox.width() - 2;
            }

            movebox.css({
                top: top + 'px',
                left: left + 'px'
            });


            bigpic.css({
                top: -top * uratio + 'px',
                left: -left * ratio + 'px'
            });
        });
    });

    smallpic.on('mouseout', function() {
        movebox.removeClass('show');
        big.removeClass('show');
    });
    li.on('click', function() {
        picimg.src = this.src;
        bigimg.src = this.src;
        $(this).parent().addClass('cur').siblings().removeClass('cur')
    })

}