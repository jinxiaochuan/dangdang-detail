require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS = require('./tmpls/news.tpl');

var TPL_ACTIVITY = require('./tmpls/activity.tpl');

var TPL_COOPERATE = require('./tmpls/cooperate.tpl');

var TPL_MAP = {
    '1':TPL_NEWS,
    '2':TPL_ACTIVITY,
    "3":TPL_COOPERATE
}

var CircleDetail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    initBridge: function(){
        var self = this;

        self.initInfo();

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

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
            })

            self.$container.delegate('.tap-avatar','click',function(){

                bridge.callHandler('tapUserImage',self.logoInfo,function(){})

            })

            self.$container.delegate('.tap-sign','click',function(){

                bridge.callHandler('tapAppliedUserList')

            })


            self.$container.delegate('.sign-btn:not(".disabled")','click',function(){

                bridge.callHandler('apply')

            })

            self.$container.delegate('.edit-btn','click',function(){

                bridge.callHandler('edit')
            })

            self.$container.delegate('.communicate-btn','click',function(){

                bridge.callHandler('doChat')

            })

            self.$container.delegate('.show-access','click',function(){

                bridge.callHandler('tapShowAccess')

            })

            self.$container.delegate('.comment-wrap','click',function(){

                bridge.callHandler('doComment')

            })

        })


    },

    initInfo: function(){
        var self = this;

        self.baseInfo = {
            "userId":self.data.webShowInfo.userId,
            "targetId":self.data.articleInfo.articleId,
            "articleId":self.data.articleInfo.articleId,
            "type":self.data.articleInfo.articleType,
            "circleId":self.data.circleInfo.circleId,
            "circleName":self.data.circleInfo.circleName,
            "memberType":self.data.circleInfo.memberType,
            "showAccess":self.data.articleInfo.showAccess,
        }

        self.logoInfo = {
            "imgUrl":self.data.circleInfo.circleLogo
        }


    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200119&articleId=988&isAdminIdentity=1';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200182&articleId=988&isAdminIdentity=1';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';
        var data = {},isAdminIdentity;

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');
        isAdminIdentity  = jsmod.util.url.getParam(HREF_ORIGIN,'isAdminIdentity');
        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.data){
                    console.log(json.data);

                    self.data = json.data;

                    var html = swig.render(TPL_MAP[json.data.articleInfo.articleType],{locals:{data:$.extend(json.data,{'isAdminIdentity':isAdminIdentity})}});

                    self.$container.html(html);

                    self.initAvatar();

                    self.deviceDetect();

                    self.initBridge();

                }
            }

        })


    },

    initAvatar: function(){
        var width_avatar = this.$container.find('.tap-avatar').width();
        jsmod.util.stretchImg($('.avatar')[0],width_avatar,width_avatar,true,false);
    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    },


})

new CircleDetail();
