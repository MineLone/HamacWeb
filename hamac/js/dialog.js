$.extend({
    dialog: function (option) {

        var title = option.title,
            msg = option.msg,
            type = option.type || 'def',
            after = option.after,
            before = option.before,
            html = option.html,
            diaObj = {
                //初始化
                init: function () {

                    //添加DOM
                    if (type == 'def') {
                        $('body').append('<div class="dialog">\n' +
                            '    <div class="dia-content">\n' +
                            '        <div class="dia-inner">\n' +
                            '            <div class="dia-close"></div>\n' +
                            '            <div class="dia-tit"><i></i><span>' + title + '</span></div>\n' +
                            '            <div class="dia-msg">' + msg + '</div>\n' +
                            '        </div>\n' +
                            '    </div>\n' +
                            '</div>');
                    }
                    else {
                        $('body').append('<div class="dialog">' + html + '</div></div>');
                    }

                    before ? ((before instanceof Function) ? before() : console.error('before is not a function')) : 0;
                    this.diaShow();
                    this.event();
                },
                //弹窗显示
                diaShow: function () {
                    $('.dialog').fadeIn(200);
                },
                //弹窗隐藏
                diaHide: function () {
                    //执行回调
                    after ? ((after instanceof Function) ? after() : console.error('after is not a function')) : 0;
                    $('.dialog').fadeOut(200).remove();
                },
                event: function () {
                    //点击遮罩隐藏
                    $('.dialog').on('click', function (e) {
                        (e.target === e.currentTarget) ? diaObj.diaHide() : 0;
                    });
                    //点击关闭
                    $('.dialog .dia-close').on('click', function (e) {
                        diaObj.diaHide();
                    });
                }
            };
        diaObj.init();
    }
});

