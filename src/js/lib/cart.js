let baseUrl = "http://localhost/midea/"; // 基础路径 必须是绝对路径

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据
            // console.log(shop);
            if (shop) {
                shop = JSON.parse(shop);
                // console.log(shop);
                let idlist = shop.map(elm => elm.id).join();
                // console.log(idlist);
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        // console.log(res);
                        let tempstr = '';
                        let temp = '';

                        res.forEach(elm => {
                            // console.log(res);
                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);

                            // console.log(arr);
                            // console.log(elm);

                            tempstr += `
                            <div class="item_detail ">
                                <div class="item_sub item_sub_selected ">
                                    <div class="cart_choose">
                                        <!--换赠品-->
                                        <div class="item_choose_wrap">
                                            <div class="item_choose"></div>
                                        </div>
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
                                                <input class="num " type="text " pattern="\d{0,3} " value="${arr[0].num} ">
                                                <span class="plus "><span class="inner "></span></span>
                                                <div class="cart_product_status js_product_status_258911 "></div>
                                            </div>

                                            <!-- 延保个数 -->
                                            <span class="service-num "></span>
                                        </div>
                                        <div class="cart_total ">${(arr[0].num*elm.price).toFixed(2)}<!-- 延保价格 -->
                                            <div class="service-price "></div>
                                        </div>
                                        <div class="cart_operation ">
                                            <span class="operation_collect js_item_delete ">移入收藏夹</span>
                                            <span class="operation_delete js_item_delete ">删除</span>
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

                        $('.cart_item ').append(tempstr);
                        $('.cart_bottom').append(temp);
                        $('.operation_delete').on('click', function() {
                            document.cookie = "shop=''"
                            window.location.reload()
                        });
                        let i = 0
                        $('.quanxuan').on('click', function() {

                            if (i % 2 == 0) {
                                $('.item_choose').addClass("item_choose_checked");
                                i = 1
                                $('.js_total_price').text('￥' + parseInt($('.cart_total ').text()))
                                $('.color_f60 ').text($('.item_sub_selected ').length)
                            } else {
                                $('.item_choose').removeClass("item_choose_checked");
                                i = 0
                                $('.js_total_price').text('￥' + '0.00')
                                $('.color_f60 ').text($('.item_choose_checked ').length)
                            }

                        })





                    }
                });
            }
        }
    }
});