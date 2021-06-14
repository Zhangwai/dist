console.log("加载成功");

//引入用到的模块
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    nav: "nav",
    goodsList: "goodsList",
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
  },
});
require(["nav", "goodsList"], function (nav, goodsList) {
  nav.topNavDownload();
  nav.leftNavDownload();
  nav.leftNavTab();
  nav.topNavTab();
  nav.searchTab();
  nav.allGoodsTab();

  goodsList.download();
  goodsList.banner();
});
