let baseUrl = "http://localhost/midea/"; // 基础路径 必须是绝对路径

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let id = location.search.split("=")[1];
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function (res) {
                    let temp = `
                    <div class="product_left">
                        <div class="big hide">
                            <img class="bigpic " alt="${baseUrl}src/${res.title}" src="${baseUrl}src/${res.pic}">
                        </div>
                        <div class="smallpic">
                            <img class="smallpic_inner" src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            <div class="movebox hide"></div>
                        </div>
                        <ul id="thumbnails" class="thumbnails">
                            <li class="cur">
                                <img src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            </li>
                            <li >
                                <img src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            </li>
                            <li >
                                <img src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            </li>
                            <li >
                                <img src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            </li>
                            <li >
                                <img src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                            </li>
                        </ul>
                    </div>
                    <div class="product_right">
                    <!--   S 主标题-->
                    <h1 title="${res.title}">
                        <span class="self_product">自营</span> ${res.title}
                    </h1>
                    <!--   S 副标题-->
                    <h5 title="${res.title}">
                        <span class="item_price_protect" title="">极速保价</span> 晒单送三年整机延保，销售火爆，部分地区预计6月30日发货,具体以发货日期为准
                    </h5>
                    <!--   S 价格 活动等展示-->
                    <div class="act_wrap">
                        <span class="icon_timer"></span>
                        <span class="act_text">
                            <span class="text_timer">
                                <span id="intervalTime">距活动结束：00天06小时58分21秒</span>
                        </span>
                        </span>
                    </div>
                    <div class="floor_price_act">
                        <div class="price_act_inner">
                            <div class="price_wrap">
                                <span class="new_price"><span class="currency_symbol">¥</span><b class="price">${res.price}</b></span>
                                <del class="old_price">
                                    ¥${res.price}
                                </del>
                                <div class="sku_tag sku_tag_important">限时特惠</div>
                                <p class="pro_info_wrap">
                                    <span class="pro_price">
                                        ¥
                                        <span class="price">
                                        ${res.price}
                                        </span>
                                    <i class="tag_pro"></i>
                                    </span>
                                    <span class="pro_tips">
                                        开通PRO会员，预计可省
                                        <em class="highlight">500元</em>
                                        <i class="icon icon_warning" id="btnProSave"></i>
                                        <a class="pro_tips-btn" href="">
                                            立即开卡
                                            <i class="icon icon_right"></i>
                                        </a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--   S 专享、优惠、领券评论展示  普通商详展示：手机专享和免息；预售商详只展示免息-->
                    <div class="floor_coupon_comment">
                        <div class="inner_floor floor_onsale js_no_promote">
                            <h3>优惠</h3>
                            <div class="floor_list">
                                <div class="option option_act">
                                    <span class="icon_act">送积分</span>
                                    <span class="text_act">最高送349积分</span>
                                </div>
                            </div>
                        </div>
                        <!-- 领券：普通和预售商详支持领券-->
                        <div class="inner_floor floor_coupon ">
                            <h3>领券</h3>
                            <div class="floor_list js_coupon_list">
                                <div class="option option_coupon coupon_1">
                                    <div class="coupon_left">
                                        <i class="coupon_icon"></i>
                                        <span class="text">满1000减50</span>
                                    </div>
                                    <div class="coupon_right J_get_coupon" >
                                        <span class="text">领取</span>
                                        <i class="coupon_icon coupon_icon_right"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="coupon_show coupon_show_height J_show_coupon hide"></div>
                        </div>
                        <div class="inner_floor floor_comment J_floor_comment">
                            <h3>评价</h3>
                            <div class="floor_list">
                                <span class="option">质量好(154)</span>
                                <span class="option">容量合适(126)</span>
                                <span class="option">快递很快(125)</span>
                            </div>
                        </div>
    
                    </div>
                    <!--   S SKU相关信息展示-->
                    <div id="skuWrap" class="sku_wrap">
                        <div class="sku sku_color" id="skuColor">
                            <h3>颜色</h3>
                            <div class="sku_list">
                                <span class="option option_selected">
                                    <img class="color_img" src="${baseUrl}src/${res.pic}" alt="${baseUrl}src/${res.title}">
                                    <span class="color_name">星际银</span>
                                </span>
                            </div>
                        </div>
                        <div class="sku sku_spec" id="skuSpec">
                            <h3>规格</h3>
                            <div class="sku_list">
                                <span class="option option_selected" >629L</span>
                            </div>
                        </div>
                        <div class="sku sku_num">
                            <h3>数量</h3>
                            <div class="num_wrap" mtag="30007.6.1" id="divEditNum_149826">
                                <span id="minus" class="minus"> <span class="inner"></span></span>
                                <input id="num" class="num num_sync" type="tel" value="2" pattern="[0-9]" >
                                <span id="plus" class="plus"><span class="inner"></span></span>
                                <div class="stock_quota">
                                    <div class="stock_status">库存 ${res.num}
                                    </div>
                                    <!-- 预售商详 ：预热期 不展示限购数 其他 取nQuotaNum -->
                                    <div class="quota_status">（限购5件）</div>
                                </div>
                            </div>
                        </div>
                        <div class="sku sku_address">
                            <h3>配送</h3>
                            <div class="address_wrap">
                                <div class="address_selected">
                                    <span class="address_option address_selected_province">广东省</span>
                                    <span class="address_option address_selected_city ">广州市</span>
                                    <span class="address_option address_selected_area">天河区</span>
                                    <span class="arrow"></span>
                                </div>
                            </div>
                            <span class="product_status">有货</span>
                        </div>
                        <div class="sku sku_service">
                            <h3>服务</h3>
                            <span class="service__item">延长保修
                                <a href=""><i class="icon icon_warning"></i></a>
                            </span>
                        </div>
                        <div class="sku sku_supplier ">
                            <h3>供货商</h3>
                            <span style="display:inline-block;height: 30px;line-height: 30px; color: #000;">美的冰箱官方旗舰店</span>
                        </div>
    
                    </div>
                    <div class="floor_btn">
                        <a href="" class="cart_btn add" id="btnCart" data-click="0">加入购物车</a>
                        <a href="http://localhost/midea/src/html/cart.html" class="primary_btn" id="btnBuy">
                            <i class="alarm_icon"></i> 立即购买
                        </a>
                    </div>
                    <div class="floor_service">
                        <div class="service_inner">
                            <span class="service_icon"></span>
                            <span class="service_option">美的唯一官方商城</span>
                        </div>
                        <div class="service_inner">
                            <span class="service_icon"></span>
                            <span class="service_option">全国联保</span>
                        </div>
                        <div class="service_inner">
                            <span class="service_icon"></span>
                            <span class="service_option">全场包邮</span>
                        </div>
                    </div>
                </div>
                    `;

                    $('.product_wrap').append(temp);
                    let temp2 = `
                            <div class="tabs_content tabs_content_product cur" id="product_intro">
                                <div class="style_wrap_790">
                                    ${res.details}
                                </div>
                            </div>
                                 `;


                    $('.tabs_content_wrap').append(temp2);
                    callback && callback(res.id, res.price);
                    magnifier()
                    let num = $('#num')
                    $('#plus').on('click', function () {
                        parseInt(num.val()) < 4 ? num.val(parseInt(num.val()) + 1) : num.val(5)

                    })
                    $('#minus').on('click', function () {
                        parseInt(num.val()) > 1 ? num.val(parseInt(num.val()) - 1) : num.val(1)
                    })
                }
            });
        },
        addShopCar: function (id, price, num) {
            let shop = localStorage.getItem('shop');
            let product = {
                id: id,
                price: price,
                num: num
            }
            if (shop) { // 存在
                shop = JSON.parse(shop); // 将字符串转成数组
                shop.some(elm => elm.id == id)?
                shop.forEach(elm => {elm.id == id ? elm.num = num : null;}):shop.push(product)
                
            } else {
                shop = []; // 不存在新建数组
                shop.push(product); // 放入商品
            }
            localStorage.setItem('shop', JSON.stringify(shop))
        }
    }
});