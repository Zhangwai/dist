//处理首页的导航部分 声明模块的时候遵从AMD
define(["jquery"], function ($) {
  function download() {
    //数据下载
    $.ajax({
      type: "get",
      url: "../data/nav.json",
      success: function (res) {
        // console.log(res);
        var bannerArr = res.banner;
        for (var i = 0; i < bannerArr.length; i++) {
          $("#J_homeSwiper .swiper-slide").append(
            $(`<a href="${bannerArr[i].url}">
         <img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}" alt="xx">
     </a>`)
          );

          var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
          $("#J_homeSwiper .swiper-pagination").append(node);
          if (i == 0) {
            node.addClass("swiper-pagination-bullet-active");
          }
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
    leftNavDownload();
    topNavDownload();
  }

  //实现轮播图轮播效果
  function banner() {
    var iNow = 0; //显示当前图片下标
    var aImgs = null; //记录图片
    var aBtns = null; //记录小圆圈

    var timer = setInterval(function () {
      iNow++;
      tab();
    }, 2000);

    //封装切换函数
    function tab() {
      if (!aImgs) {
        aImgs = $("#J_homeSwiper .swiper-slide").find("a");
      }
      if (!aBtns) {
        aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
      }
      if (iNow == 5) {
        iNow = 0;
      }

      //图片切换
      aImgs
        .hide()
        .css("opacity", 0.2)
        .eq(iNow)
        .show()
        .animate({ opacity: 1 }, 500);
      //小圆点切换
      aBtns
        .removeClass("swiper-pagination-bullet-active")
        .eq(iNow)
        .addClass("swiper-pagination-bullet-active");
    }

    //添加鼠标移入移出的

    $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next")
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000);
      });

    //点击小圆圈可以切换对应的图片
    $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
      iNow = $(this).index();
      tab();
      return false; //阻止a链接的默认跳转行为
    });

    //点击上一张下一张

    $(".swiper-button-prev,.swiper-button-next").click(function () {
      if (this.className == "swiper-button-prev") {
        iNow--;
        if (iNow == -1) {
          iNow = 4;
        }
      } else {
        iNow++;
      }
      tab();
    });
  }

  //侧边导航栏
  function leftNavDownload() {
    $.ajax({
      method: "get",
      url: "../data/nav.json",
      success: function (res) {
        var sideArr = res.sideNav;
        for (var i = 0; i < sideArr.length; i++) {
          var node = $(`<li class = 'category-item'>
                            <a href="/index.html" class = 'title'>
                                ${sideArr[i].title}
                                <em class = 'iconfont-arrow-right-big'></em>
                            </a>
                            <div class="children clearfix ">
                               
                            </div>
                        </li>`);
          $("#J_categoryList").append(node);

          //取出当前这个选项对相应的子节点
          var childArr = sideArr[i].child;
          //一共多少列
          var col = Math.ceil(childArr.length / 6);
          //计算以共多少列，设置对应的class样式。
          node.find("div.children").addClass("children-col-" + col);
          //通过循环，创建右侧上面的每一个数据
          for (var j = 0; j < childArr.length; j++) {
            if (j % 6 == 0) {
              var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(
                j / 6
              )}">
          </ul>`);
              node.find("div.children").append(newUl);
            }
            newUl.append(
              $(`<li>
            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                <span class="text">${childArr[j].title}</span>
            </a>
        </li>`)
            );
          }
        }
      },
      error: function (msg) {
        alert(msg);
      },
    });
  }

  //给侧边导航加上移入切换效果 选项卡的效果

  function leftNavTab() {
    //事件委托
    $("#J_categoryList").on("mouseenter", ".category-item", function () {
      $(this).addClass("category-item-active");
    });
    $("#J_categoryList").on("mouseleave", ".category-item", function () {
      $(this).removeClass("category-item-active");
    });
  }

  //下载顶部导航数据
  function topNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function (res) {
        //将顶部导航的数据取出
        var topNavArr = res.topNav;
        topNavArr.push({ title: "服务" }, { title: "社区" });
        for (var i = 0; i < topNavArr.length; i++) {
          $(".site-header .header-nav .nav-list").append(
            $(` <li data-index="${i}" class="nav-item ">
                    <a href="javascript: void(0);" class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                </li>`)
          );

          var node = $(
            `<ul class="children-list clearfix" style="display: ${
              i == 0 ? "block" : "none"
            }"></ul>`
          );
          $("#J_navMenu .container").append(node);

          //取出所有子菜单

          if (topNavArr[i].childs) {
            var childArr = topNavArr[i].childs;
            for (var j = 0; j < childArr.length; j++) {
              node.append(
                $(`<li>
                <a href="#">
                    <div class="figure figure-thumb">
                        <img src="${childArr[j].img}" alt="xx">
                    </div>
                    <div class="title">${childArr[j].a}</div>
                    <p class="price">${childArr[j].i}</p>
                </a>
            </li>`)
              );
            }
          }
        }
      },
      error: function (msg) {
        alert(msg);
      },
    });
  }

  //顶部导航添加移入移出效果
  function topNavTab() {
    $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
      $(this).addClass("nav-item-active");
      //找出移入a标签的下标 此下标和下面显示的ul下标一一对应
      var index = $(this).index() - 1;
      if (index >= 0 && index <= 6) {
        $("#J_navMenu")
          // .css("display", "block")
          .removeClass("slide-up")
          .addClass("slide-down");

        // .slideDown(2000);
        $("#J_navMenu .container")
          .find("ul")
          .eq(index)
          .css("display", "block")
          .siblings("ul")
          .css("display", "none");
      }
    });

    $(".header-nav .nav-list").on("mouseleave", ".nav-item", function () {
      $(this).removeClass("nav-item-active");
    });
    $(".site-header").mouseleave(function () {
      $("#J_navMenu")
        // .css("display", "none")
        .removeClass("slide-down")
        .addClass("slide-up");

      // .slideUp(2000);
    });
  }

  //搜索框
  function searchTab() {
    $("#search")
      .focus(function () {
        $("#J_keywordList").removeClass("hide").addClass("show");
      })
      .blur(function () {
        $("#J_keywordList").removeClass("show").addClass("hide");
      });
  }

  //list.html里加的全部商品移入移出
  function allGoodsTab() {
    $(".header-nav .nav-list").on("mouseenter", ".nav-category", function () {
      //让顶部别的商品下拉取消
      $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
      //移入字体改色
      $(this).find(".link-category").addClass("nav-category-active");
      //移入显示全部商品列表
      $(this).find(".site-category").css("display", "block");
    });
    $(".header-nav .nav-list").on("mouseleave", ".nav-category", function () {
      $(this).find(".link-category").removeClass("nav-category-active");
      $(this).find(".site-category").css("display", "none");
    });
  }
  return {
    download: download,
    leftNavDownload: leftNavDownload,
    topNavDownload: topNavDownload,
    banner: banner,
    leftNavTab: leftNavTab,
    topNavTab: topNavTab,
    searchTab: searchTab,
    allGoodsTab: allGoodsTab,
  };
});
