(function($) {
    $.fn.extend({
        slider: function(options) {
            // 函数式编程
            let main = null, // 主函数
                init = null, // 初始化
                start = null, // 开始动画
                stop = null, // 停止动画
                prev = null, // 上一张
                next = null, // 下一张
                yuan = null, // 圆点
                timer = null, // 计时器
                elms = {}, // 命名空间 存储元素
                defaults = {
                    speed: 1000, // 动画速度
                    delay: 5000 // 延迟时间  展示使用
                };

            $.extend(defaults, options); // 合并参数

            init = function() {
                // 1. 元素选取
                elms.sliderDiv = this.children('div'); // 选择滑动的div
                // console.log(elms.sliderDiv);

                elms.btns = this.children('span'); // 选择按钮
                // console.log(elms.btns);
                elms.yuan = this.children('ul').children('li')
                    // console.log(elms.yuan = this.children('ul').children('li'));


                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone()); // 克隆第一张图片
                //  索引 用于记录当前图片的索引
                elms.index = 1; // 第一张图片


                // 时间绑定
                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });
  
                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });

                elms.yuan.on('click', function() {
                    // console.log($(this).index());
                    // $(this).index()
                    // elms.index=$(this).index()+1
                    left = null;
                    if ($(this).index() + 1 == 1) {
                        left = '0px';
                    } else if ($(this).index() + 1 == 2) {
                        left = '-1200px';
                    } else if ($(this).index() + 1 == 3) {
                        left = '-2400px';
                    }
                    elms.sliderDiv.animate({
                        left: left
                    })

                    elms.index = $(this).index() + 1;
                    // $(this).eq(elms.index-1).addClass('red').siblings().removeClass('red');
                    $(this).addClass('red').siblings().removeClass('red');

                })
            }.bind(this);


            start = function(direction) {
                let left = '-=1200px'; // 设置移动的距离

                if (!direction) {
                    left = '+=1200px';
                    if (elms.index === 1) { // 判断当前为第一张图片
                        elms.index = 4; // 切换到第四张图片
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', `-${imgLeft - divLeft}px`);
                    }
                    $('.slider>ul>li').eq(elms.index - 1).addClass('red').siblings().removeClass('red');
                }

                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function() {

                    if (direction) elms.index++;
                    else elms.index--;

                    if (elms.index === 4) { // 判断到达最后一张图片
                        elms.index = 1; // 将索引设置为1
                        elms.sliderDiv.css('left', 0); //  将定位设置为0
                    }
                    // console.log($('ul>li').eq(elms.index - 1));

                    $('.slider>ul>li').eq(elms.index - 1).addClass('red').siblings().removeClass('red');
                });

            }.bind(this);

            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }

            stop = function() {
                elms.sliderDiv.stop(true, true);
                clearInterval(timer);
            }

            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay);
            }

            main();
        }
    });
})(jQuery);