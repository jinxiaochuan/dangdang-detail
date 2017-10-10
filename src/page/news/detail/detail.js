require('page/common/common.js');

require('./detail.less');
// require('lib/third/swiper.min.css');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/news/detail';

var TPL_NESWS = require('./tmpls/detail.tpl');

var URL_NEWS = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');
// var Swiper = require('swiper');

var News = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.isOpenFromInternalApp = true;
        this.$container = $('.container');
        this.getAjax();
    },

    // initSwiper: function(){

    //     var mySwiper = new swiper('.swiper-container', {
            
    //     });

    //     console.log('initSwiper');
    //     console.log(mySwiper);
    // },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/news/detail?userId=1000034&newsId=1376619';
        // URL_NEWS = 'http://app.im-dangdang.com/ddweb/v1/news/detail';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.newsId = jsmod.util.url.getParam(HREF_ORIGIN,'newsId');

        $.ajax({
            url:URL_NEWS,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.commentAmount = self.data.newsDetail.commentAmount;
                    self.render(self.data);
                    // self.initSwiper();
                    return;
                }
                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);
                

                self.$container.find('.common-detail-wrap').delegate('a','click',function(e){
                    e.preventDefault();
                })

            },
            error: function(error,errorType,errorMsg){
                var html = new Empty({
                    word: errorMsg,
                }).render();

                self.$container.html(html);
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

        this.initAvatar();

        this.initBridge();

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

      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      setupWebViewJavascriptBridge(function(bridge){

          if(!window.isIOS){
              bridge.init(function(message, responseCallback) {

              });
          }

          bridge.registerHandler('increaseCommment', function(data, responseCallback) {
              self.$container.find('.comment-num').text(++self.commentAmount);
          })

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

          self.$container.delegate('.comment-wrap','click',function(){
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
