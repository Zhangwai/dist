define(["jquery"], function ($) {
  //加载goodList的数据
  function download() {
    $.ajax({
      url: "../data/goodsList2.json",
      success: function (res) {
        // 创建大图商品
        var node = $(`<div data-v-61428f58 class = 'section'>
                            <div data-v-61428f58 class = 'components-list-box'>
                                <div data-v-a2d6c756 class="channel-product-imgText">
                                    <div data-v-a2d6c756 class = 'channel-product-top'>
                                        <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                            <div data-v-a2d6c756 class = 'figure'>
                                                <a href="goodsDesc.html?product_id=${
                                                  res[0].product_id
                                                }">
                                                    <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${
                                                      res[0].image
                                                    }" alt=""/>
                                                </a>
                                            </div>
                                            <div data-v-a2d6c756 class = 'content'>
                                                <h3 data-v-a2d6c756 class = 'title'>
                                                    <a data-v-a2d6c756 href="goodsDesc.html?product_id=${
                                                      res[0].product_id
                                                    }">
                                                       ${res[0].name}
                                                    </a>
                                                </h3>
                                                <p data-v-a2d6c756 class = 'desc'>${
                                                  res[0].desc
                                                }</p>
                                                <p data-v-a2d6c756 class = 'price'>
                                                    <strong data-v-a2d6c756>${
                                                      res[0].price
                                                    }</strong>元
                                                    <span data-v-a2d6c756>起</span>
                                                    ${
                                                      res[0].del == 0
                                                        ? ""
                                                        : "<del data-v-a2d6c756>" +
                                                          res[0].del +
                                                          "元</del>"
                                                    }
                                                    
                                                </p>
                                                <p data-v-a2d6c756 class = 'link'>
                                                    <a data-v-a2d6c756 href="goodsDesc.html?product_id=${
                                                      res[0].product_id
                                                    }">立即购买</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
        $(".page-main .app-body").append(node);

        //创建小图商品
        for (var i = 1; i < res.length; i++) {
          //每两个商品去创建一行
          if (i % 2 != 0) {
            var row = $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                        <div data-v-45ef62b1 class = 'row'>
                         
                        </div>
                    </div>
                </div>
            </div>`);
            $(".page-main .app-body").append(row);
          }

          //创建小图一次插入行
          row.find(".row").append(
            $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                <div data-v-45ef62b1 class = 'figure'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${
                      res[i].product_id
                    }" class = 'exposure'>
                        <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${
                          res[i].image
                        }" alt=""/>
                    </a>
                </div>
                <h3 data-v-45ef62b1 class = 'title'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${
                      res[i].product_id
                    }">${res[i].name}</a>
                </h3>
                <p data-v-45ef62b1 class = 'desc'>${res[i].desc} </p>
                <p data-v-45ef62b1 class = 'price'>
                    <strong data-v-45ef62b1>${res[i].price}</strong>元
                    <span data-v-45ef62b1>起</span>
                    ${
                      res[i].del == 0
                        ? ""
                        : "<del data-v-45ef62b1>" + res[i].del + "元</del>"
                    }
                </p>
            </div>`)
          );
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }

  //实现商品列表页轮播图效果
  function banner() {
    //获取页面上所有的图
    var oDiv = $(".swiper-container .swiper-wrapper");
    //获取小圆点
    var aBtns = $(".swiper-container .swiper-pagination a");
    //设置当前显示图片的下标
    var iNow = 0;
    var timer = null;

    aBtns.click(function () {
      iNow = $(this).index();
      tab();
      return false;
    });

    //启动定时器
    timer = setInterval(function () {
      iNow++;
      tab();
    }, 2000);

    //切换函数
    function tab() {
      aBtns
        .removeClass("swiper-pagination-bullet-active")
        .eq(iNow)
        .addClass("swiper-pagination-bullet-active");
      if (iNow >= aBtns.size()) {
        aBtns.eq(0).addClass("swiper-pagination-bullet-active");
      }
      oDiv.animate(
        {
          left: -2560 * iNow,
        },
        1000,
        function () {
          if (iNow >= aBtns.size()) {
            iNow = 0;
            oDiv.css("left", 0);
          }
        }
      );
    }
    //鼠标移入移出
    $(".swiper-container")
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000);
      });
  }
  return {
    download: download,
    banner: banner,
  };
});
