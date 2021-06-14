console.log("加载成功");

/*
    配置模块
*/
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    register: "register",
  },
});
require(["register"], function (register) {
  register.registerSend();
});
