console.log("加载ok");

/*
    配置当前这个项目用到了哪些模块
    遵从的都是AMD规范
*/
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    nav: "nav",
    slide: "slide",
    data: "data",
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
  },
});

require(["nav", "slide", "data"], function (nav, slide, data) {
  //导航
  nav.download();
  nav.banner();
  nav.leftNavTab();
  nav.topNavTab();
  nav.searchTab();

  //商品列表
  slide.download();
  slide.slideTab();

  //主页数据的加载
  data.download();
  data.tabMenu();
});
