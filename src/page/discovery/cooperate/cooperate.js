require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/cooperation/detail';

var TPL_COOPERATION = require('./tmpls/cooperate.tpl');

var URL_COOPERATION = PATH_ORIGIN + PATH_NAME;

var Cooperate = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/discovery/cooperation/detail?userId=200110&coopId=6&viewUserId=200148';
        // URL_COOPERATION = 'http://dev.im-dangdang.com/ddweb/v1/discovery/cooperation/detail';
        var data={};

        data.userId=jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.coopId=jsmod.util.url.getParam(HREF_ORIGIN,'coopId');
        data.viewUserId=jsmod.util.url.getParam(HREF_ORIGIN,'viewUserId');

        $.ajax({
            url:URL_COOPERATION,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.data){
                    console.log(json.data);
                  self.data = json.data;
                  self.render(json.data);
                }
            }
        })

    },

    render: function(data){
        var html = swig.render(TPL_COOPERATION,{
            locals:{
                data:data
            }
        })

        this.$container.html(html);

        this.initAvatar();

        this.deviceDetect();

        this.initBridge();
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

    initBridge: function(){
        var self = this;

        self.baseInfo = {
            "applyStatus":self.data.applyStatus,
            "showAccess":self.data.showAccess,
            "userShowName":self.data.userShowName,
            "userId":self.data.userId,
            "headImage":self.data.headImage,
            "isFinished":self.data.isFinished,
            "coopId":self.data.webInfo.coopId,
            "isCanSignUp":self.data.isCanSignUp,
            "location":self.data.location,
            "longitude":self.data.longitude,
            "latitude":self.data.latitude
        }

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
        setupWebViewJavascriptBridge(function(bridge) {

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
            })

            self.$container.delegate('.tap-avatar','click',function(){
                bridge.callHandler('tapUserImage')
            })

            self.$container.delegate('.tap-name','click',function(){
                bridge.callHandler('tapUserName')
            })

            self.$container.delegate('.show-access','click',function(){
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.tap-sign','click',function(){
                bridge.callHandler('tapAppliedUserList')
            })

             self.$container.delegate('.edit-btn','click',function(){
                 bridge.callHandler('edit')
             })

             self.$container.delegate('.sign-btn','click',function(){
                 bridge.callHandler('doApply')
             })

             self.$container.delegate('.communicate-btn','click',function(){
                 bridge.callHandler('doChat')
             })

             self.$container.delegate('.tap-location','click',function(){
                 bridge.callHandler('tapPlace')
             })
       })
    }
})

new Cooperate();
