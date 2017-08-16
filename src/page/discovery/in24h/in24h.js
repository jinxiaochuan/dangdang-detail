require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/in24h/detail';

var TPL_DISCOVERY_IN24 = require('./tmpls/in24h.tpl');

var URL_DISCOVERY_IN24 = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');

var IN24H = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/discovery/in24h/detail?userId=200119&in24hId=7&longitude=116.488580&latitude=39.915222';
        // URL_DISCOVERY_IN24 = 'http://dev.im-dangdang.com/ddweb/v1/discovery/in24h/detail';
        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        data.in24hId = jsmod.util.url.getParam(HREF_ORIGIN, 'in24hId');
        data.longitude = jsmod.util.url.getParam(HREF_ORIGIN, 'longitude');
        data.latitude = jsmod.util.url.getParam(HREF_ORIGIN, 'latitude');
        $.ajax({
            url: URL_DISCOVERY_IN24,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function (json) {
                if (json.status == 1) {
                    self.data = json.data;
                    self.render(json.data);
                    return;
                }
                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);
            }
        })
    },

    render: function(data){
        var html = swig.render(TPL_DISCOVERY_IN24, {
            locals: {
                data: data
            }
        });

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
            "viewedUserId": self.data.in24hInfo.webInfo.viewedUserId,
            "activityLongitude": self.data.in24hInfo.activityLongitude,
            "activityLatitude": self.data.in24hInfo.activityLatitude,
            "activityLocation": self.data.in24hInfo.activityLocation,
            "longitude": self.data.in24hInfo.longitude,
            "latitude": self.data.in24hInfo.latitude,
            "location": self.data.in24hInfo.location,
            "in24hId": self.data.in24hInfo.webInfo.in24hId,
            "showAccess": self.data.in24hInfo.showAccess,
            "applyStatus": self.data.in24hInfo.applyStatus,
            "headImage":self.data.in24hInfo.userInfo.headImage,
            "showName":self.data.in24hInfo.userInfo.showName,
            "isCanSeePersonFile":self.data.in24hInfo.isCanSeePersonFile,
            "isFollow":self.data.in24hInfo.isFollow,
            "isCanSignUp":self.data.in24hInfo.isCanSignUp,
            "userImage":self.data.in24hInfo.userInfo.userImage,
            "title":self.data.in24hInfo.title
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
        setupWebViewJavascriptBridge(function (bridge) {

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            bridge.registerHandler('doChangeStatus',function(data, responseCallback){
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
            })

            self.$container.delegate('.tap-avatar', 'click', function () {
                bridge.callHandler('tapUserImage')
            })

            self.$container.delegate('.tap-name', 'click', function () {
                bridge.callHandler('tapUserName')
            })

            self.$container.delegate('.in24-address', 'click', function () {
                bridge.callHandler('tapActivityPlace')
            })

            self.$container.delegate('.show-access', 'click', function () {
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.tap-sign', 'click', function () {
                bridge.callHandler('tapAppliedUserList')
            })

            self.$container.delegate('.edit-btn', 'click', function () {
                bridge.callHandler('edit')
            })

            self.$container.delegate('.sign-btn','click',function(){
                bridge.callHandler('doApply')
            })

            self.$container.delegate('.communicate-btn','click',function(){
                bridge.callHandler('doChat')
            })

            self.$container.delegate('.in24-address','click',function(){
                bridge.callHandler('tapAddress')
            })

            self.$container.delegate('.tap-location','click',function(){
                bridge.callHandler('tapPlace')
            })

        })


    }
})

new IN24H();
