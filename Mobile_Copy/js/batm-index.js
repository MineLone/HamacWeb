function bindEvent() {
  formBanned()
}

function formBanned() {
  $('input[type="submit"]').on('click', function () {
    var nVal = $('input[name="name"]').val();
    var pVal = $('input[name="phone"]').val();
    var tVal = $('input[name="type"]').val();
    var re = /^1[3456789]\d{9}$/;

    if (!nVal) {
      alert("请填写您的称呼！");
      return false;
    }
    if (!pVal || !re.test(pVal)) {
      alert("请填写正确的手机号！");
      return false;
    }
    if (!tVal) {
      alert("请填写您想要了解的产品型号！");
      return false;
    }

  })
}

bindEvent();
