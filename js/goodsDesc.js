define(["jquery", "jquery-cookie"], function ($) {
  //通过name找到value
  function valueByName(search, name) {
    //查找键值对开始的位置
    var start = search.indexOf(name + "=");
    if (start == -1) {
      return null;
    } else {
      var end = search.indexOf("&", start);
      if (end == -1) {
        end = search.length;
      }
      //提取想要的键值对
      var str = search.substring(start, end);
      var arr = str.split("=");
      return arr[1];
    }
  }

  //下载数据
  function download() {
    //1、找到详情页加载商品的id
    var product_id = valueByName(location.search, "product_id");

    $.ajax({
      url: "../data/goodsList.json",
      success: function (res) {
        //2、通过id找到商品商品信息
        var goodsMsg = res.find((item) => item.product_id == product_id);
        var node = $(` <!-- 导航 -->
                        <div id = 'J_proHeader' data-name="${goodsMsg.name}">
                            <div class = 'xm-product-box'>
                                <div id = 'J_headNav' class = 'nav-bar'>
                                    <div class = 'container J_navSwitch'>
                                        <h2 class = 'J_proName'>${goodsMsg.name}</h2>
                                        <div class = 'con'>
                                            <div class = 'left'>
                                                <span class = 'separator'>|</span>
                                                <a href="#">${goodsMsg.title}</a>
                                            </div>
                                            <div class = 'right'>
                                                <a href="#">概述</a>
                                                <span class = 'separator'>|</span>
                                                <a href="#">参数</a>
                                                <span class = 'separator'>|</span>
                                                <a href="#">F码通道</a>
                                                <span class = 'separator'>|</span>
                                                <a href="#">用户评价</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 商品详情数据展示 -->
                        <div class = 'xm-buyBox' id = 'J_buyBox'>
                            <div class = 'box clearfix'>
                                <!-- 商品数据 -->
                                <div class = 'pro-choose-main container clearfix'>
                                    <div class = 'pro-view span10'>
                                        <!-- img-con fix 设置图片浮动 -->
                                        <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                            <div class = 'ui-wrapper' style="max-width: 100%;">
                                                <!-- 图片 -->
                                                <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                                    <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>

                                                    </div>
                                                </div>
                                                <!-- 显示第几张图片的下标 -->
                                                <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                                    <div class = 'ui-pager ui-default-pager'>
                                                        
                                                    </div>
                                                    <div class = 'ui-controls-direction'>
                                                        <a class="ui-prev" href="">上一张</a>
                                                        <a class="ui-next" href="">下一张</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class = 'pro-info span10'>
                                        <!-- 标题 -->
                                        <h1 class = 'pro-title J_proName'>
                                            <span class = 'img'></span>
                                            <span class = 'name'>${goodsMsg.name}</span>
                                        </h1>
                                        <!-- 提示 -->
                                        <p class = 'sale-desc' id = 'J_desc'>
                                            ${goodsMsg.product_desc_ext}
                                        </p>
                                        <div class = 'loading J_load hide'>
                                            <div class = 'loader'></div>
                                        </div>
                                        <!-- 主体 -->
                                        <div class = 'J_main'>
                                            <!-- 经营主题 -->
                                            <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                            <!-- 价格 -->
                                            <div class = 'pro-price J_proPrice'>
                                                <span class = 'price'>
                                                    ${goodsMsg.price_max}元
                                                    <del>${goodsMsg.market_price_max}元</del>
                                                </span>
                                                <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                            </div>
                                            <!-- 常态秒杀倒计时 -->
                                            <div class = 'pro-time J_proSeckill'>
                                                <div class="pro-time-head">
                                                    <em class="seckill-icon"></em> 
                                                    <i>秒杀</i>
                                                    <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                            </div>
                                                <div class = 'pro-time-con'>
                                                    <span class = 'pro-time-price'>
                                                        ￥
                                                        <em class = 'J_seckillPrice'>${goodsMsg.price_min}</em>
                                                        <del>
                                                            ￥
                                                            <em class = 'J_seckillPriceDel'>${goodsMsg.market_price_min}</em>
                                                        </del>
                                                    </span>
                                                </div>
                                            </div>
                                                <!-- 已经选择产品 -->
                                                <div class = 'pro-list' id = 'J_proList'>
                                                    <ul>
                                                        <li>${goodsMsg.name} ${goodsMsg.value}  
                                                            <del>${goodsMsg.market_price_min}元</del>  
                                                            <span>  ${goodsMsg.price_min} 元 </span> 
                                                        </li>
                                                        <li class="totlePrice" data-name="seckill">   
                                                            秒杀价   ：${goodsMsg.price_min}元  
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!-- 购买按钮 -->
                                                <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                                    <li>  
                                                        <a href="goodsCar.html" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.product_id}">加入购物车</a>  
                                                    </li>   
                                                    <li>  
                                                        <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                            <i class="iconfont default"></i>查看购物车 
                                                        </a>  
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
        node.insertAfter("#app div .header");

        //找到详情页上所有的图片
        var aImages = goodsMsg.images;
        if (aImages.length == 1) {
          //把一张图片加上去
          node.find("#J_sliderView").append(
            $(`<img class = 'slider done' 
            src="${aImages[0]}" 
            style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
            alt=""/>`)
          );
          //隐藏上一张下一张的按钮
          node.find(".ui-controls").hide();
        } else {
          for (var i = 0; i < aImages.length; i++) {
            node.find("#J_sliderView").append(
              $(`<img class = 'slider done' 
                    src="${aImages[i]}" 
                    style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${
                      i == 0 ? "block" : "none"
                    };" 
                    alt=""/>`)
            );
            //显示第几张图片的按钮
            node.find(".ui-pager").append(
              $(`<div class = 'ui-pager-item'>
            <a href="#" data-slide-index = "0" class = 'ui-pager-link ${
              i == 0 ? "active" : ""
            }'>1</a>
       </div>`)
            );
          }
        }
      },
      error: function (msg) {
        alert(msg);
      },
    });
  }

  //添加轮播效果
  function banner() {
    //设置一些全局变量
    var iNow = 0; //默认第一张图片显示
    var aBtns = null; //获取小块，所有按钮
    var aImgs = null; //获取所有图片
    var timer = null; //定时器返回值

    //点击按钮切换

    $("#app div").on(
      "click",
      ".ui-controls .ui-pager .ui-pager-item a",
      function () {
        //获取当前节点父节点在兄弟节点的下标
        iNow = $(this).parent().index();
        tab();
        return false;
      }
    );

    //启动定时器;
    timer = setInterval(function () {
      iNow++;
      tab();
    }, 3000);

    //添加鼠标移入移出
    $("#app div").on("mouseenter", "#J_img", function () {
      clearInterval(timer);
    });

    $("#app div").on("mouseleave", "#J_img", function () {
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 3000);
    });

    //添加上一张和下一张画面切换
    $("#app div").on("click", ".ui-prev,.ui-next", function () {
      if (this.className == "ui-prev") {
        iNow--;
        if (iNow == -1) {
          iNow = 4;
        }
      } else {
        iNow++;
      }
      tab();
      return false;
    });

    //切换
    function tab() {
      //下面小图片亮
      if (!aBtns) {
        aBtns = $("#J_img").find(".ui-controls .ui-pager .ui-pager-item a");
      }

      //切换对应大图片
      if (!aImgs) {
        aImgs = $("#J_img").find("img");
      }
      if (aImgs.size() == 1) {
        clearInterval(timer);
      } else {
        if (iNow >= 5) {
          iNow = 0;
        }
        aBtns.removeClass("active").eq(iNow).addClass("active");
        aImgs.hide().eq(iNow).show();
      }
    }

    //加入购物车效果
    $("#app div").on("click", ".J_login", function () {
      //获取其商品的id
      //cookie(最大4kb 只能存字符串) 存id和数量
      //[{id:1,num1},{id:2,nun2}]
      var id = this.id;
      //1、判断是否第一次添加
      var first = $.cookie("goods") == null ? true : false;
      //2、第一次添加
      if (first) {
        var cookieArr = [{ id: id, num: 1 }];
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
        });
      } else {
        //3、判断商品是否储存在cookie
        var same = false;
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            cookieArr[i].num++;
            same = true;
            break;
          }
        }
        //4、商品不存在新添加
        if (!same) {
          var obj = { id: id, num: 1 };
          cookieArr.push(obj);
        }

        //最后都要存回cookie
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
        });
      }
      // return false;
    });
  }

  return {
    download: download,
    banner: banner,
  };
});
