define(["jquery", "jquery-cookie"], function ($) {
  //加载已加入购物车的商品
  /*
    cookie里面只有id 数量
    加载数据必须要用商品的具体信息 ，数据源
    goodsCarList.json
    goodsList.json
    注：找出加入购物车的商品数据
    new Promise 处理两次按照顺序加载数据
  */
  //更新商品全面的数据用
  function loadCarData() {
    new Promise(function (resolve, reject) {
      $.ajax({
        url: "../data/goodsCarList.json",
        success: function (obj) {
          resolve(obj.data);
        },
        errror: function (msg) {
          reject(msg);
        },
      });
    })
      .then(function (arr1) {
        // console.log(arr1);
        //下载第二份代码
        return new Promise(function (resolve, reject) {
          $.ajax({
            url: "../data/goodsList2.json",
            success: function (arr2) {
              //将两份数据合并  arr1和arr2
              var newArr = arr1.concat(arr2);
              resolve(newArr);
            },
            error: function (msg) {
              reject(msg);
            },
          });
        });
      })
      .then(function (arr) {
        // console.log(arr);
        //arr所有商品信息 我们需要在页面上加载购物车的数据
        //通过cookie找到加到购物车的商品
        var cookieStr = $.cookie("goods");
        //判断cookieStr是否为空
        if (cookieStr) {
          var cookieArr = JSON.parse(cookieStr);
          var newArr = [];

          for (var i = 0; i < cookieArr.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (
                cookieArr[i].id == arr[j].product_id ||
                cookieArr[i].id == arr[j].goodsid
              ) {
                arr[j].num = cookieArr[i].num;
                //设置商品id 方便
                arr[j].id = arr[j].product_id
                  ? arr[j].product_id
                  : arr[j].goodsid;

                //找到处理过的数据添加进去
                newArr.push(arr[j]);
              }
            }
          }
          // console.log(newArr);
          //加载前先删除该节点内的所有内容
          $("#J_cartListBody .J_cartGoods").html("");
          //通过循环 加载到页面上
          for (var i = 0; i < newArr.length; i++) {
            var node = `<div id="${newArr[i].id}" class="item-row clearfix"> 
            <div class="col col-check">  
                <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
            </div> 
            <div class="col col-img">  
                <a href="//item.mi.com/1192300048.html" target="_blank"> 
                    <img alt="" src="${
                      newArr[i].image
                    }" width="80" height="80"> 
                </a>  
            </div> 
            <div class="col col-name">  
                <div class="tags">   
                </div>     
                <div class="tags">  
                </div>   
                <h3 class="name">  
                    <a href="//item.mi.com/${
                      newArr[i].id
                    }.html" target="_blank"> 
                        ${newArr[i].name} 
                    </a>  
                </h3>        
            </div> 
            <div class="col col-price"> 
                ${newArr[i].price}元 
                <p class="pre-info">  </p> 
            </div> 
            <div class="col col-num">  
                <div class="change-goods-num clearfix J_changeGoodsNum"> 
                    <a href="javascript:void(0)" class="J_minus">
                        <i class="iconfont"></i>
                    </a> 
                    <input tyep="text" name="2192300031_0_buy" value="${
                      newArr[i].num
                    }" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                    <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                </div>  
            </div> 
            <div class="col col-total"> 
                ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                <p class="pre-info">  </p> 
            </div> 
            <div class="col col-action"> 
                <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
            </div> 
        </div>`;
            $("#J_cartListBody .J_cartGoods").append(node);
          }
          isCheckAll();
        } else {
          //隐藏掉
          $("#J_cartBox").css("display", "none");
        }
      });
  }

  //下载数据
  function download() {
    $.ajax({
      url: "../data/goodsCarList.json",
      success: function (res) {
        var arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          var node = $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}" alt="${arr[i].name} "> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                               ${arr[i].name} 
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a  href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" style="display: none;" id="${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`);
          $(".cart-recommend .xm-recommend ul").append(node);
        }
      },
      error: function (msg) {
        alert(msg);
      },
    });
  }

  //移入移出
  function cartHover() {
    //通过事件委托
    $("#J_miRecommendBox .xm-recommend ul").on(
      "mouseenter",
      ".J_xm-recommend-list",
      function () {
        $(this).find(".xm-recommend-tips a").css("display", "block");
      }
    );
    $("#J_miRecommendBox .xm-recommend ul").on(
      "mouseleave",
      ".J_xm-recommend-list",
      function () {
        $(this).find(".xm-recommend-tips a").css("display", "none");
      }
    );

    //通过实践委托加入购物车操作
    $("#J_miRecommendBox .xm-recommend ul").on(
      "click",
      ".xm-recommend-tips .btn",
      function () {
        var iNow = 0;
        var id = this.id;
        var first = $.cookie("goods") == null ? true : false;
        if (first) {
          var cookieArr = [{ id: id, num: 1 }];
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7,
          });
        } else {
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

          //商品不存在新添加
          if (!same) {
            var obj = { id: id, num: 1 };
            cookieArr.push(obj);
          }
          //存回cookie
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7,
          });
        }
        loadCarData();
        $("#J_cartBox").css("display", "block");
        return false;
      }
    );
  }

  //全选按钮 和 单选按钮添加点击
  function checkFunc() {
    //全选
    $("#J_selectAll").click(function () {
      //每一个单选框
      if ($(this).hasClass("icon-checkbox-selected")) {
        $(this).add(".col-check i").removeClass("icon-checkbox-selected");
      } else {
        $(this).add(".col-check i").addClass("icon-checkbox-selected");
      }
      isCheckAll();
    });

    //单选
    $("#J_cartListBody .J_cartGoods").on("click", ".col-check i", function () {
      if ($(this).hasClass("icon-checkbox-selected")) {
        $(this).add("#J_selectAll").removeClass("icon-checkbox-selected");
      } else {
        $(this).addClass("icon-checkbox-selected");
      }
      isCheckAll();
    });
  }

  //判断有多少个被选中
  function isCheckAll() {
    var allChecks = $("#J_cartListBody").find(".item-row");
    var isAll = true; //假设是否都选中
    var total = 0; //计算总价格
    var count = 0; //记录被选中的数量
    var totalCount = 0; //记录总数
    allChecks.each(function (index, item) {
      if (!$(item).find(".col-check i").hasClass("icon-checkbox-selected")) {
        //判断其中这个商品没有被选中
        isAll = false;
      } else {
        total +=
          parseFloat($(this).find(".col-price").html().trim()) *
          parseFloat($(this).find(".col-num input").val());
        //被选中的商品的数量
        count += parseInt($(this).find(".col-num input").val());
      }
      //计算所有加购物车的商品一共有几件
      totalCount += parseInt($(this).find(".col-num input").val());
    });
    //设置
    $("#J_cartTotalNum").html(totalCount);
    $("#J_selTotalNum").html(count);
    $("#J_cartTotalPrice").html(total.toFixed(1));

    //判断是否全选
    if (isAll) {
      $("#J_selectAll").addClass("icon-checkbox-selected");
    } else {
      $("#J_selectAll").removeClass("icon-checkbox-selected");
    }
  }

  //给页面上的商品添加删除加减
  function changeCars() {
    //给每一个删除按钮添加事件
    $("#J_cartListBody .J_cartGoods").on("click", ".J_delGoods", function () {
      var id = $(this).closest(".item-row").remove().attr("id");
      //将id数据从cookie里面删除
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);
      for (var i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].id == id) {
          //找到当前id的cookie中的这个对象删除掉
          cookieArr.splice(i, 1);
          break;
        }
      }
      cookieArr.length == 0
        ? $.cookie("goods", null)
        : $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7,
          });
      loadCarData();
      return false;
    });

    //给加减添加点击事件
    $("#J_cartListBody .J_cartGoods").on(
      "click",
      ".J_plus,.J_minus",
      function () {
        //找到点击商品的id
        var id = $(this).closest(".item-row").attr("id");
        //将id数据从cookie里面更新数量
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            if (this.className == "J_minus") {
              cookieArr[i].num == 1 ? alert("数量已经为1") : cookieArr[i].num--;
            } else {
              cookieArr[i].num++;
            }
            break;
          }
        }

        //直接存进cookie
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
        });

        //更新页面上的商品数量
        // $(this).siblings("input").val(cookieArr[i].num);
        loadCarData();
        return false;
      }
    );
  }

  return {
    download: download,
    cartHover: cartHover,
    loadCarData: loadCarData,
    checkFunc: checkFunc,
    changeCars: changeCars,
  };
});
