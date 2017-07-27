require('page/common/common.js');

require('./detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/news/detail';

var TPL_NESWS = require('./tmpls/detail.tpl');

var URL_NEWS = PATH_ORIGIN + PATH_NAME;

var News = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/news/detail?userId=200119&newsId=1';
        // URL_NEWS = 'http://dev.im-dangdang.com/ddweb/v1/news/detail';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.newsId = jsmod.util.url.getParam(HREF_ORIGIN,'newsId');

        $.ajax({
            url:URL_NEWS,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success: function(json){
                if(json.data){
                    console.log(json.data);
                    self.data = json.data;
                    self.render(self.data);
                }
            }
        })


    },

    render: function(data){
        var html = swig.render(TPL_NESWS,{
            locals:{
                data:data
            }
        })

        this.$container.html(html);

        this.deviceDetect();

        this.initBridge();

    },

    deviceDetect: function () {
      var self = this;

      var u = window.navigator.userAgent;

      window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

      window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  },

  initBridge: function(){
      var self = this;

      self.avatarInfo = {
          mediaId:self.data.newsDetail.mediaId
      }

      self.nameInfo = {
          mediaId:self.data.newsDetail.mediaId
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

          self.$container.delegate('.source-logo','click',function(){
              bridge.callHandler('tapMediaName', self.avatarInfo, function () {

              })
          })

          self.$container.delegate('.source-name','click',function(){
              bridge.callHandler('tapMediaName', self.nameInfo, function () {

              })
          })

          self.$container.delegate('.comment-wrap .read','click',function(){
              bridge.callHandler('tapComment')
          })

      })
  }

})


new News();
