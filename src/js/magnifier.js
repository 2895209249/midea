function magnifier() {
    var movebox = $('.movebox'),
        bigpic = $('.bigpic'),
        big = $('.big'),

        smallpic = $('.smallpic');
    li = $('.thumbnails>li>img')
    picimg = document.querySelector('.smallpic>img')
    bigimg = document.querySelector('.bigpic')
        // console.log(bigpic);
        // console.log(smallpic);
        // console.log(big);
        // console.log(bigpic);
        // console.log(smallpic);
        // console.log(movebox);

    // 1. 绑定事件
    smallpic.on('mouseover', function() {
        // 让元素显示
        movebox.addClass('show');
        big.addClass('show');
        // movebox的大小计算
        movebox.css({
            width: (smallpic.offset().left * big.offset().left) / bigpic.offset().left + 'px' ,
            height: (smallpic.offset().top * big.offset().top) / bigpic.offset().top + 'px' ,
        })
        // 2.让movebox跟随鼠标移动
        smallpic.on('mousemove', function(ev) {
            // console.log(smallpic.offset().top);

            let top = ev.pageY - smallpic.offset().top - movebox.offset().top / 2;
            let left = ev.pageX - smallpic.offset().left - movebox.offset().left / 2;

            // 3.比例计算
            let ratio = bigpic.offset().left / smallpic.offset().top; // 小数 大于1的数
            let uratio = bigpic.offset().top / smallpic.offset().left;
            // console.log(bigpic.offset().top / smallpic.offset().top);

            // 边界管理
            if (top <= 0) {
                top = 0;
            } else if (top >= smallpic.offset().height - movebox.offset().height) {
                top = smallpic.offset().height - movebox.offset().height - 2;
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= smallpic.offset().width - movebox.offset().width) {
                left = smallpic.offset().width - movebox.offset().width - 2;
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