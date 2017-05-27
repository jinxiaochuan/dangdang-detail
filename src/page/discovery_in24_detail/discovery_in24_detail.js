require('page/common/common.js');

require('./discovery_in24_detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var page_url = window.location.href;

var TPL_DISCOVERY_IN24 = require('./tmpls/discovery_in24_detail_tpl.tpl');

var URL_DISCOVERY_IN24 = 'http://test.im-dangdang.com/ddweb/v1/discovery/in24h/detail';

var discoveryIn24Detail = jsmod.util.klass({
    initialize: function (option) {
        var self = this;
        self.option = option;
        self.$container = $('.container');
        jsmod.util.Dialog.setOpacity(1);
        self.getAjaxDiscoveryIn24(page_url);
    },

    initBridge: function () {
        var self = this;

        self.baseInfo = {
            "viewedUserId": self.data.in24hInfo.webInfo.viewedUserId,
            "activityLongitude": self.data.in24hInfo.webInfo.activityLongitude,
            "activityLatitude": self.data.in24hInfo.webInfo.activityLatitude,
            "in24hId": self.data.in24hInfo.webInfo.in24hId,
            "showAccess": self.data.in24hInfo.showAccess,
            "applyStatus": self.data.in24hInfo.applyStatus,
            "headImage":self.data.in24hInfo.userInfo.headImage,
            "showName":self.data.in24hInfo.userInfo.showName,
            "isCanSeePersonFile":self.data.in24hInfo.isCanSeePersonFile,
            "isFollow":self.data.in24hInfo.isFollow
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

            bridge.callHandler('tapUserImage',self.baseInfo,function(){})

            bridge.registerHandler('getDistance', function(data, responseCallback) {
                self.$container.find('.distance').html(data+'km');
            })

            self.$container.delegate('.in24-avatar', 'click', function () {
                bridge.callHandler('tapUserImage')
            })

            self.$container.delegate('.in24-name', 'click', function () {
                bridge.callHandler('tapUserName')
            })

            self.$container.delegate('.in24-address', 'click', function () {
                bridge.callHandler('tapActivityPlace')
            })

            self.$container.delegate('.in24-show-access', 'click', function () {
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.in24-inten', 'click', function () {
                bridge.callHandler('tapAppliedUserList')
            })

            self.$container.delegate('.discovery-in24-edit', 'click', function () {
                bridge.callHandler('edit')
            })

        })


    },

    getAjaxDiscoveryIn24: function (url) {
        var self = this;

        //url = 'http://test.im-dangdang.com/ddweb/v1/discovery/in24h/detail?userId=200119&in24hId=159';

        var data = {};

        data.userId = jsmod.util.url.getParam(url, 'userId');
        data.in24hId = jsmod.util.url.getParam(url, 'in24hId');

        $.ajax({
            url: URL_DISCOVERY_IN24,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function (json) {
                if (json.data) {
                    console.log(json.data);
                    self.data = json.data;
                    self.discoveryIn24Render(json.data);
                }
            }
        })

    },


    discoveryIn24Render: function (data) {
        var self = this;

        var tpl = swig.render(TPL_DISCOVERY_IN24, {
            locals: {
                data: data
            }
        });

        self.$container.html(tpl);

        //self.bindHandler();

        self.deviceDetect();

        self.initBridge();
    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    },

    bindHandler: function () {
        var self = this;

        self.$container.delegate('.avatar.scale', 'click', function () {

            var src = $(this).data('src');

            var dialog = new jsmod.util.Dialog({
                html: '<img src="' + src + '"/>',
            })

            dialog.show();
        })
    }

});

new discoveryIn24Detail();
