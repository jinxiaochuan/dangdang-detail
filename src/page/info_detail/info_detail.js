require('page/common/common.js');

require('./info_detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var page_url = window.location.href;

var TPL_INFO = require('./tmpls/info_detail_tpl.tpl');

var URL_INFO = 'http://test.im-dangdang.com/comment/v1/news/detail';

var infoDetail = jsmod.util.klass({
    initialize:function(option){
        var self = this;
        self.option = option;
        self.$container = $('.container');
        self.getAjaxInfo(page_url);

    },

    getAjaxInfo:function(url){
        var self = this;

        url = 'http://test.im-dangdang.com/comment/v1/news/detail?userId=200119&newsId=1';

        var data = {};

        data.userId = jsmod.util.url.getParam(url,'userId');
        data.newsId = jsmod.util.url.getParam(url,'newsId');

        $.ajax({
            url:URL_INFO,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.data){
                    console.log(json.data);
                    self.data = json.data;
                    self.infoRender(self.data);
                }
            }

        })
    },

    infoRender:function(data){
        var self = this;

        var tpl = swig.render(TPL_INFO, {
            locals: {
                data: data
            }
        });

        self.$container.html(tpl);

        self.deviceDetect();

        self.initBridge();

    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    },

    initBridge:function(){
        var self = this;

        self.avatarInfo = {

        }

        function setupWebViewJavascriptBridge(callback){

            if(window.isIOS){
                if(window.WebViewJavascriptBridge){
                    return callback(WebViewJavascriptBridge);
                }
                if(window.WVJBCallbacks){
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

            }else {
                if(window.WebViewJavascriptBridge){
                    callback(WebViewJavascriptBridge)
                }else {
                    document.addEventListener('WebViewJavascriptBridgeReady',function(){
                        callback(WebViewJavascriptBridge)
                    },false)
                }
            }

        }

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            self.$container.delegate('.info-avatar','click',function(){

            })

            self.$container.delegate('.info-avatar','click',function(){

            })

        })
    }
})

new infoDetail();
