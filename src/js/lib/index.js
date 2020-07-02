let baseUrl = "http://localhost/midea/"; // 基础路径 必须是绝对路径

define(['jquery', 'slider'], function($) {
    return {
        render: function() {


            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    let temp = '';
                    res.forEach(elm => {
                        temp += `
                                <div class="product product_${elm.id}">
                                    <a class="url" href="${baseUrl}src/html/mtag.html?id=${elm.id}">
                                        <div class="tag_wrap">
                                            <i class="tag_pro_jx"></i>
                                        </div>
                                        <img class="photo" src="${baseUrl}src/${elm.pic}" alt="${baseUrl}/src/${elm.title}">
                                        <span class="title">${elm.title}</span>
                                        <span class="price_wrap">¥<span class="price">${elm.price}</span>
                                        <span class="price_pro">¥<em>${elm.price}</em>
                                                <i class="tag_pro"></i></span>
                                        </span>
                                    </a>
                                </div>
                                    `;


                        if (elm.id <= 5) { $('.floor_1').html(temp); }
                        if (elm.id >= 5) { $('.floor_2').html(temp); }

                    });


                }
            });
        }
    }

});