require('page/common/common.js');

require('./preview.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS_PRE = require('./tmpls/news.tpl');

var TPL_ACTIVITY_PRE = require('./tmpls/activity.tpl');

var TPL_COOPERATE_PRE = require('./tmpls/cooperate.tpl');

var Empty = require('page/components/empty/empty.js');

var TPL_MAP_PRE = {
    '1':TPL_NEWS_PRE,
    '2':TPL_ACTIVITY_PRE,
    "3":TPL_COOPERATE_PRE
}

var CirclePreview = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    initBridge: function(){
        var self = this;

        /*这段代码是固定的，必须要放到js中*/
        function setupWebViewJavascriptBridge(callback) {

          if(window.isIOS){
            if (window.WebViewJavascriptBridge) {
              return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
              return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
              document.documentElement.removeChild(WVJBIframe)
            }, 0)
          }else{
            if(window.WebViewJavascriptBridge){
              callback(WebViewJavascriptBridge);
            }else{
              document.addEventListener('WebViewJavascriptBridgeReady',function(){
                callback(WebViewJavascriptBridge);
              },false)
            }
          }

        }

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            self.$container.delegate('.tap-avatar','click',function(){

                bridge.callHandler('tapUserImage')

            })

        })

    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1348';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1346';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=256';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');

        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    self.baseInfo = {
                        "userId":json.data.webShowInfo.userId,
                        "targetId":json.data.articleInfo.articleId,
                        "articleId":json.data.articleInfo.articleId,
                        "type":json.data.articleInfo.articleType,
                        "circleId":json.data.circleInfo.circleId,
                        "circleName":json.data.circleInfo.circleName,
                        "memberType":json.data.circleInfo.memberType,
                        "isCanComment":json.data.articleInfo.isCanComment,
                        "pictureUrl":json.data.circleInfo.circleLogo.pictureUrl,
                        "articleTitle":json.data.articleInfo.articleTitle
                    }
                    var html = swig.render(TPL_MAP_PRE[json.data.articleInfo.articleType],{locals:{data:json.data}});
                    self.$container.html(html);
                    self.deviceDetect();
                    self.initBridge();
                    self.initEvents();
                    return;
                }

                if(json.status == 10865){
                    var html = new Empty({
                        word: json.msg,
                        invalid: 1
                    }).render();
                }else {
                    var html = new Empty({
                        word: json.msg,
                    }).render();
                }

                self.$container.html(html);
            }
        })


    },

    initEvents: function(){
        this.$container.delegate('.close-icon','click',function(){
            $(this).parents('.preview-fix').remove();
        })
    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    }

})

new CirclePreview();
