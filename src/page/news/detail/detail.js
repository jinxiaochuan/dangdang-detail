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
        this.isOpenFromInternalApp = true;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/news/detail?userId=200119&newsId=136';
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

    initAvatar: function(){
        var width_avatar = this.$container.find('.tap-source').width();
        jsmod.util.stretchImg($('.source-logo')[0],width_avatar,width_avatar,true,false);

        var width_cover = this.$container.find('.news-cover-wrap').width();
        var height_cover = this.$container.find('.news-cover-wrap').height();

        this.$container.find('.news-cover').each(function(index,item){
            jsmod.util.stretchImg($(item)[0],width_cover,height_cover,true,false);

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

        this.initAvatar();

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

      self.baseInfo = {
          mediaId: self.data.newsDetail.mediaId,
          title: self.data.newsDetail.title,
          mediaLogoUrl: self.data.newsDetail.mediaLogoUrl
      }

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

          bridge.callHandler('baseInfo',self.baseInfo,function(){})

          bridge.callHandler('isOpenFromInternalApp',null,function(data){
              if(!data){
                  //非app内部页面
                  self.isOpenFromInternalApp = false;
              }
          })

          self.$container.delegate('.tap-source','click',function(){
              bridge.callHandler('tapMediaName', self.avatarInfo, function () {

              })
          })

          self.$container.delegate('.source-name','click',function(){
              bridge.callHandler('tapMediaName', self.nameInfo, function () {

              })
          })

          self.$container.delegate('.comment-wrap .comment','click',function(){
              bridge.callHandler('tapComment')
          })

          self.$container.delegate('.news-list-wrap .news-link','click',function(){
              var userId = $(this).data('user');
              var newsId = $(this).data('news');
              var mediaId = $(this).data('media');
              if(self.isOpenFromInternalApp){
                  bridge.callHandler('tapOpenOtherArticle',{"userId":userId.toString(),"newsId":newsId.toString(),"mediaId":mediaId.toString()},function(){})
                  return;
              }
              window.location.href = '/ddweb/news/detail?userId='+ userId +'&newsId=' + newsId;
          })

      })
  }

})


new News();
