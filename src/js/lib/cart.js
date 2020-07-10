let baseUrl = "http://localhost/midea/"; // 基础路径 必须是绝对路径

define(['jquery', 'cart'], function ($, cookie) {
    return {
        render: function () {
            let shop = JSON.parse(localStorage.getItem('shop'));
            // console.log(shop);
            if (shop) {
                let idlist = shop.map(elm => elm.id).join();
                // console.log(idlist);
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function (res) {
                        let tempstr = '';
                        let temp = '';
                        res.forEach(elm => {
                            let arr = shop.filter(val => val.id == elm.id);
                            tempstr += `
                            <div class="item_detail ">
                                <div class="item_sub item_sub_selected ">
                                    <div class="cart_choose">
                                        <!--换赠品-->
                                        <input type="checkbox" class="item_choose  js_item_choose item_choose_wrap ">
                                        <div class="line_top"></div>
                                    </div>
                                    <div class="item_sub_detail ">
                                        <div class="cart_img ">
                                            <img src="${baseUrl}/src/${elm.pic}">
                                        </div>
                                        <div class="cart_product " title="${elm.title}">
                                            <div class="title-box ">
                                                <a target="_blank " href=" ">${elm.title}</a>
                                            </div>
                                        </div>
                                        <div class="cart_sku ">
                                            <span class="sku_color ">巴赫银</span>
                                            <span class="sku_spec ">10KG</span>
                                        </div>
                                        <div class="cart_price ">
                                            <span class="price_old ">${elm.price}</span>
                                            <span class="price_new ">${elm.price}</span>
                                            <!-- 失效商品 套装商品不展示-->
                                            <!-- TODO 延保价格 -->
                                            <div class="service-price"></div>
                                        </div>
                                        <div class="cart_num ">
                                            <!-- 下架或者删除或者换赠品-->
                                            <div class="num_wrap num_wrap_inline">
                                                <span class="minus "> <span class="inner "></span></span>
                                                <input class="num " type="text " pattern="\d{0,3} " value="${arr[0].num} " disabled="disabled">
                                                <span class="plus "><span class="inner "></span></span>
                                                <div class="cart_product_status js_product_status_258911 "></div>
                                            </div>
                                            <!-- 延保个数 -->
                                            <span class="service-num "></span>
                                        </div>
                                        <div class="cart_total ">${(arr[0].num * elm.price).toFixed(2)}</div>
                                        <div class="cart_operation ">
                                            <span class="operation_collect js_item_delete ">移入收藏夹</span>
                                            <span class="operation_delete js_item_delete " id="${elm.id}">删除</span>
                                        </div>
                                    </div>
                                    <div class="line_through "></div>
                                </div>
                            </div>
                            `;
                            temp += `
                            <div class="cart_sum_right">
                                <div class="cart_sum_num">已选商品<span class="color_f60 js_total_check">0</span>款</div>
                                <div class="cart_sum_price">
                                    <div class="total_price">
                                        合计：<span class="total_price_inner">
                                             <span class="js_total_price">¥ 0.00</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="cart_sum_to_order js_to_order">去结算</div>
                            </div>
                            `;



                        });
                        //渲染
                        $('.cart_item ').append(tempstr);
                        $('.cart_bottom').append(temp);
                        //数量
                        $('.plus').on('click', function () {
                            let a = $(this).parent().find('.num')
                            let b = $(this).parent().parent().parent().find('.cart_total ')
                            let c = $(this).parent().parent().parent().find('.cart_price ').find('.price_new ')
                            parseInt(a.val()) < 4 ? a.val(parseInt(a.val()) + 1) : a.val(5)
                            b.text(a.val() * c.text() + '.00')
                        })
                        $('.minus').on('click', function () {
                            let a = $(this).parent().find('.num')
                            let b = $(this).parent().parent().parent().find('.cart_total ')
                            let c = $(this).parent().parent().parent().find('.cart_price ').find('.price_new ')
                            parseInt(a.val()) > 1 ? a.val(parseInt(a.val()) - 1) : a.val(1)
                            b.text(a.val() * c.text() + '.00')
                        })
                        //删除
                        $('.js_sum_delete ').on('click', function () {
                            let _id = this.id;
                            let _shop = [];
                            let flag = confirm('确定吗');
                            if (flag) {
                                shop.forEach(elm => {
                                    if (elm.id = _id) {
                                        _shop.push(elm);
                                    }
                                })
                                localStorage.setItem('shop', JSON.stringify(_shop))
                            }
                            location.reload()
                        })
                        //单个删除
                        $('.js_item_delete ').on('click', function () {
                            let _id = this.id;
                            let _shop = [];
                            let flag = confirm('确定吗');
                            if (flag) {
                                shop.forEach(elm => {
                                    if (elm.id != _id) {
                                        _shop.push(elm);
                                    }
                                })
                                localStorage.setItem('shop', JSON.stringify(_shop))
                            }
                            location.reload()
                        })
                        //单选
                        $('.js_item_choose ').on('click', function () {
                            let res = 0
                            $("input:checked").length == shop.length ? $(".js_all_choose").prop("checked", true) : $(".js_all_choose").prop("checked", false)

                            if ($("input:checked").is(':checked')) {
                                Array.from($("input:checked").parent().parent().find('.cart_total')).forEach(elm => {
                                    res += parseInt(elm.innerHTML)
                                })
                                $('.js_total_price').text('￥' + res + '.00');
                                $('.js_total_check').text(($("input:checked").parent().parent().find('.cart_total')).length);

                            } else {
                                $('.js_total_price').text('￥' + res + '0.00')
                                $('.color_f60 ').text(($("input:checked").parent().parent().find('.cart_total')).length)
                            }

                        })

                        //全选
                        $('.js_all_choose').on('input', function () {
                            let res = 0
                            if ($(this).is(':checked')) {
                                $(".item_choose").prop("checked", true)
                                Array.from($("input:checked").parent().parent().find('.cart_total')).forEach(elm => {
                                    res += parseInt(elm.innerHTML)
                                })
                                $('.js_total_price').text('￥' + res + '.00');
                                $('.js_total_check').text(shop.length);
                            } else {
                                $(".item_choose").prop("checked", false)
                                $('.js_total_price').text('￥' + '0.00')
                                $('.color_f60 ').text(shop.length)
                            }
                        })
                    }
                });

            }
        },
        number: function () {

        }
    }
})