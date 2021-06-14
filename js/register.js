define(["jquery"], function ($) {
  //注册
  function registerSend() {
    $("#register-button").click(function () {
      $.ajax({
        type: "post",
        url: "./php/register.php",
        data: {
          username: $(".item_account").eq(0).val(),
          password: $(".item_account").eq(1).val(),
          repassword: $(".item_account").eq(2).val(),
          createtime: new Date().getTime(),
        },
        success: function (res) {
          console.log(res);
        },
        error: function (msg) {
          console.log(msg);
        },
      });
    });
  }
  return {
    registerSend: registerSend,
  };
});
