define(["jquery"], function ($) {
  //下载数据

  function download() {
    $.ajax({
      url: "../data/slide.json",
      success: function (res) {
        slideArr = res.data.list.list;
        for (var i = 0; i < slideArr.length; i++) {
          var node = $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
            <a href="#" target = "_blank">
                <div class = 'content'>
                    <div class = 'thumb'>
                        <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                    </div>
                    <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                    <p class = 'desc'>${slideArr[i].desc}</p>
                    <p class = 'price'>
                        <span>${slideArr[i].seckill_Price}</span>元
                        <del>${slideArr[i].goods_price}元</del>
                    </p>
                </div>
            </a>
        </li>`);
          $("#J_flashSaleList ul").append(node);
        }
      },
      error: function (msg) {
        alert(msg);
      },
    });
  }

  //商品列表滚动
  function slideTab() {
    //获取页面上的左右按钮
    var aSpans = $(".swiper-controls").find("span");
    var iNow = 0; //显示第一组图片，默认下标是0开始，每四个图片一组
    var count = Math.floor(26 / 4);
    var timer = null; //timer设置全局只有一个定时器
    //手动滚动
    aSpans.click(function () {
      if ($(this).index() == 0) {
        //左键
        iNow--;
        iNow = Math.max(0, iNow);
      } else {
        //右键
        iNow++;
        iNow = Math.min(count, iNow);
      }
      tab();
    });

    //启动定时器让他自己去滚动
    timer = setInterval(function () {
      if (iNow >= count) {
        clearInterval(timer);
      } else {
        iNow++;
        tab();
      }
    }, 4000);

    //移入移出启动 关闭定时器
    $("#J_flashSaleList")
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        iNow >= count
          ? (timer = null)
          : (timer = setInterval(function () {
              if (iNow >= count) {
                clearInterval(timer);
              } else {
                iNow++;
                tab();
              }
            }, 4000));
      });

    //滚动方法

    function tab() {
      //左右按钮显示否
      iNow <= 0
        ? aSpans.eq(0).addClass("swiper-button-disabled")
        : aSpans.eq(0).removeClass("swiper-button-disabled");

      iNow >= count
        ? aSpans.eq(1).addClass("swiper-button-disabled")
        : aSpans.eq(1).removeClass("swiper-button-disabled");
      //计算运动的目的值
      var iTarget = iNow >= count ? iNow * -992 + 496 : iNow * -992;
      $("#J_flashSaleList ul").css({
        transform: `translate3d(${iTarget}px,0,0)`,
        transitionDuration: "1000ms",
      });
    }
  }

  return {
    download: download,
    slideTab: slideTab,
  };
});
