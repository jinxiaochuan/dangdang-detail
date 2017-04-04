
var main = require('./main.js');

var  _option;

_option = {
    backgroundColor: "#FFF"
};

/**
 * Dialog模块，居中定位，并显示遮罩图层，不能同时打开两个弹窗，
 * 显示弹窗时会隐藏当前正打开的弹窗，
 * z-index 大于 1000 的元素不会被覆盖。
 * 默认点击 esc 关闭当前显示弹窗，opacity 为 0.7，可以通过类方法改变全局的设置
 *
 * @constructor
 * @alias module:jsmod/ui/dialog
 * @param {object} option
 * @param {int}    option.width                  宽度
 * @param {int}    option.height                 高度
 * @param {string} option.html                   html代码
 * @param {Coords} [option.offset]               定位时的偏移
 * @param {string} [option.backgroundColor=#FFF] 弹窗的背景色, 如果不要背景色则填 null
 * @expample
 * var Dialog = require("jsmod/ui/dialog");
 *
 * // 创建实例
 * new Dialog({
     *     html: "<div>dIALOG</div>",
     *     height: 300,
     *     width: 300
     * });
 */
var Dialog = function (option) {
    var self = this;

    self.option = $.extend({}, _option, option);
    self.init();
}

Dialog.opacity = 0.7; // 默认的透明度

/**
 * 重置frame窗体中的内容
 * @private
 */
Dialog.resetFrame = function () {
    var frame = $(".mod-dialog-frame");

    if (frame.length == 0) {
        if (main.ie6) {
            Dialog.frame = $('<div class="mod-dialog-frame" style="overflow:auto; overflow-x:hidden; display:none; position: absolute; left:0; top: 0; right:0; bottom: 0; z-index: 10000;">').appendTo("body");
            Dialog.frame.css("width", $(window).width());
            Dialog.frame.css("height", $(window).height());
            Dialog.frame.bgiframe();
        } else {
            Dialog.frame = $('<div class="mod-dialog-frame" style="overflow:auto; display:none; position: fixed; left:0; top: 0; right:0; bottom: 0; z-index: 10000;"></div>').appendTo("body");
        }

        Dialog.setOpacity();
    }

    if (main.ie6) {
        Dialog.frame.css("top", $("html").scrollTop());
    }

    if (frame.find(".mod-dialog-wrap").length > 0) {
        frame.find(".mod-dialog-wrap").detach();
    }
}

/**
 * 类方法，禁止点击 esc 触发关闭
 * @public
 */
Dialog.disableKeyEvent = function () {
    $(document).off("keydown.dialog");
    Dialog.keyEvent = false;
}

/**
 * 类方法，启用点击 esc 触发关闭
 * @public
 */
Dialog.enableKeyEvent = function () {
    if (!Dialog.keyEvent) {
        $(document).on("keydown.dialog", function (e) {
            if (e.keyCode == 27) {
                Dialog._instance && Dialog._instance.hide({fade: true});
                /**
                 * 点击 esc 关闭弹窗时触发，让使用者知道用户是以何种方式关闭弹窗
                 * @event module:jsmod/ui/dialog#pressesc
                 */
                $(Dialog._instance).trigger("pressesc");
            }
        });

        Dialog.keyEvent = true;
    }
}

/**
 * 类方法，恢复默认设置
 * @public
 */
Dialog.reset = function (argument) {
    Dialog.enableKeyEvent();
    Dialog.setOpacity(0.7);
}

// 监听resize改变弹窗位置
if (!Dialog.resetEvent) {
    $(window).on("resize.dialog", function () {
        if (Dialog._instance  && Dialog.frame.css("display") != "none") {
            if (main.ie6) {
                Dialog.frame.css("width", $(window).width());
                Dialog.frame.css("height", $(window).height());
                Dialog.frame.css("top", $("html").scrollTop());
            }
            Dialog._instance.adjuestPosition();
        }
    });

    Dialog.resetEvent = true;
}

Dialog.enableKeyEvent();

/**
 * 类方法，设置蒙层的透明度
 * @public
 * @param {double} [option.opacity=0.7]  设置蒙层的透明度
 */
Dialog.setOpacity = function (opacity) {
    var hex;

    if (opacity !== undefined) {
        Dialog.opacity = opacity;
    }

    hex = parseInt(Dialog.opacity * 255).toString(16);

    if (hex == "0") {
        hex = "00";
    }

    if (Dialog.frame) {
        Dialog.frame.css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#" + hex + "000000,endColorstr=#" + hex + "000000");

        if (!main.ie6) {
            Dialog.frame.css("background-color", "rgba(0, 0, 0," + Dialog.opacity + ")");
        }
    }
}

$.extend(Dialog.prototype,
    /**
     * @lends module:jsmod/ui/dialog.prototype
     */
    {
        /**
         * 初始化弹出内容，并绑定各种事件
         * @private
         */
        init: function () {
            var self = this,
                element;

            element = $(self.option.html);
            self.content = $('<div style="overflow:hidden; position: absolute;" class="mod-dialog-wrap"></div>').append(element);

            if (self.option.backgroundColor) {
                self.content.css("background-color", self.option.backgroundColor);
            }

            Dialog.resetFrame();
            self.setBox();
            Dialog.frame.append(self.content);
        },
        /**
         * 设置宽、高，会自动调用 adjuestPosition 函数重置位置
         * @public
         * @param {object} option          配置项, 宽度和高度可以都设置，也可以只设置其一
         * @param {int}    [option.width]  宽度
         * @param {int}    [option.height] 高度
         */
        setBox: function (option) {
            var self = this;

            $.extend(self.option, option);
            self.option.width && self.content.css("width", self.option.width);
            self.option.height && self.content.css("height", self.option.height);

            if (Dialog.frame.css("display") != "none") {
                self.adjuestPosition();
            }
        },
        /**
         * 显示弹窗
         * @public
         * @param {object} option         配置项
         * @param {bool}   [option.fade]  渐变效果
         */
        show: function (option) {
            var self = this;

            option = option || {};

            $("html").css("overflow", "visible");
            $("body").css("overflow", "hidden");

            Dialog.resetFrame();
            Dialog.frame.show();

            if (option.fade) {
                self.content.hide().appendTo(Dialog.frame).fadeIn("fast");
            } else {
                Dialog.frame.append(self.content);
            }

            self.adjuestPosition();

            Dialog._instance = self;
        },
        /**
         * 隐藏弹窗
         * @public
         * @param {object} option         配置项
         * @param {bool}   [option.fade]  渐变效果
         */
        hide: function (option) {
            var self = this;

            option = option || {};

            $("html").css("overflow", "");
            $("body").css("overflow", "");

            if (option.fade) {
                Dialog.frame.fadeOut("fast");
            } else {
                Dialog.frame.hide();
            }
        },
        /**
         * 调整位置，当改变宽高后需要调用此函数调整位置，通过 setBox 函数设置会自动调用此函数
         * @public
         */
        adjuestPosition: function () {
            var self = this,
                offset = self.option.offset || {},
                wHeight, wWidth, height, width, top, left;

            wHeight = Dialog.frame.height();
            wWidth = Dialog.frame.width();

            height = self.content.height();
            width = self.content.width();

            top = wHeight / 2 - height / 2 + (offset.top || 0);
            left = wWidth / 2 - width / 2 + (offset.left || 0);
            top = top < 0 ? 0 : top;
            left = left < 0 ? 0 : left;

            if(self.option.closeToTop){
                top = top < 0 ? 0 : top*0.25;
            }

            self.content.css("top", top);
            self.content.css("left", left);
        },
        /**
         * 获取 content 元素
         * @public
         */
        getElement: function () {
            return this.content;
        },
        /**
         * @public
         */
        destroy: function () {
            this.hide();
            this.content.remove();
            this.content = null;
        }
    }
);

module.exports = Dialog;
