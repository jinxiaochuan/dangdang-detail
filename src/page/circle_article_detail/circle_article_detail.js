require('page/common/common.js');

require('./circle_article_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_COOPERATE=require('./tmpls/cooperate_detail_tpl.tpl');

var TPL_ACTIVITY=require('./tmpls/activity_detail_tpl.tpl');

var TPL_NEWS=require('./tmpls/news_detail.tpl');

var URL_ARTICLE = 'http://test.im-dangdang.com/ddweb/v1/article/detail';

var TPL_MAP = {
    '1':TPL_NEWS,
    '2':TPL_ACTIVITY,
    "3":TPL_COOPERATE
}

var CircleArticleDetail = jsmod.util.klass({
    initialize:function(option){
        var self = this;
        self.option = option;
        self.$container = $('.container');
        self.getAjax(page_url);
    },

    initBridge:function(){

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

            self.$container.delegate('.avatar-wrap','click',function(){

                bridge.callHandler('tapUserImage',self.logoInfo,function(){})

            })

            self.$container.delegate('.name-wrap','click',function(){

                bridge.callHandler('tapUserName',self.logoInfo,function(){})

            })

            self.$container.delegate('.apply-list-wrap','click',function(){

                bridge.callHandler('tapAppliedUserList')

            })

            self.$container.delegate('.apply-list-wrap','click',function(){

                bridge.callHandler('tapAppliedUserList')

            })

            self.$container.delegate('.apply-wrap','click',function(){

                bridge.callHandler('apply',self.applyInfo,function(){})

            })

            self.$container.delegate('.show-access-wrap','click',function(){

                bridge.callHandler('tapShowAccess')

            })


        })

    },

    initInfo:function(){
        var self = this;

        self.baseInfo = {
            "userId":self.data.webShowInfo.userId,
            "targetId":self.data.articleInfo.articleId,
            "type":self.data.articleInfo.articleType,
            "circleId":self.data.circleInfo.circleId,
            "circleName":self.data.circleInfo.circleName,
            "memberType":self.data.circleInfo.memberType
        }

        self.logoInfo = {
            "imgUrl":self.data.circleInfo.circleLogo
        }

        self.applyInfo = {
            "needPhone":self.data.articleInfo.activityInfo && self.data.articleInfo.activityInfo.needPhone
        }

    },

    getAjax:function(url){
        var self = this;

        //url='http://test.im-dangdang.com/ddweb/v1/article/detail?userId=200119&articleId=916';
        var data={};

        data.userId=jsmod.util.url.getParam(url,'userId');
        data.articleId=jsmod.util.url.getParam(url,'articleId');

        $.ajax({
            url:URL_ARTICLE,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.data){
                    console.log(json.data);
                    self.data = json.data;
                    var tpl = swig.render(TPL_MAP[json.data.articleInfo.articleType],{locals:{data:json.data}});
                    self.$container.html(tpl);
                    self.deviceDetect();
                    self.initBridge();
                }
            }
        })
    },


      deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      }
})

new CircleArticleDetail();
