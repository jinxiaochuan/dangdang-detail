require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/activity/detail';

var TPL_DISCOVERY_ACTIVITY = require('./tmpls/activity.tpl');

var URL_DISCOVERY_ACTIVITY = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');

var Activity = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/discovery/activity/detail?userId=1000011&activityId=61';
        // URL_DISCOVERY_ACTIVITY = 'http://app.im-dangdang.com/ddweb/v1/discovery/activity/detail';
        var data={};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.activityId = jsmod.util.url.getParam(HREF_ORIGIN,'activityId');

        $.ajax({
            url:URL_DISCOVERY_ACTIVITY,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.render(json.data);
                    return;
                }

                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);
            },
            error: function(error,errorType,errorMsg){
                var html = new Empty({
                    word: errorMsg,
                }).render();

                self.$container.html(html);
            }
        })
    },

    render: function(data){
        data.activityInfo.detailContent = trans(data.activityInfo.detailContent);
        if(data.activityInfo.review || data.activityInfo.reviewImages){
            data.activityInfo.review = trans(data.activityInfo.review);
        }
        var html = swig.render(TPL_DISCOVERY_ACTIVITY,{
            locals:{
                data:data
            }
        });

        this.$container.html(html);

        this.$container.find('.detail-content').delegate('a','click',function(e){
            e.preventDefault();
        })

        this.initEnlarge();

        this.initShare();

        this.initBridge();

    },

    initShare: function(){
        share();
    },

    initEnlarge: function(){
        var self = this;

        this.$imgList = this.$container.find('.common-detail-wrap .detail-content img');
        var imgList = $.map($.makeArray(self.$imgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        this.$reviewImgList = this.$container.find('.common-review-wrap .review-content img');
        var reviewImgList = $.map($.makeArray(self.$reviewImgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        imgList = imgList.concat(reviewImgList);

        this.baseInfo = {
            "endTime": this.data.activityInfo.endTime,
            "applyStatus": this.data.activityInfo.applyStatus,
            "showAccess": this.data.activityInfo.showAccess,
            "showName": this.data.activityInfo.userInfo.showName,
            "viewUserId": this.data.activityInfo.webInfo.viewedUserId,
            "headImage": this.data.activityInfo.userInfo.headImage,
            "isOver": this.data.activityInfo.isOver,
            "activityId": this.data.activityInfo.webInfo.activityId,
            "isCanSignUp": this.data.activityInfo.isCanSignUp,
            "location": this.data.activityInfo.location,
            "longitude": this.data.activityInfo.longitude,
            "latitude": this.data.activityInfo.latitude,
            "userImage": this.data.activityInfo.userInfo.userImage,
            "title": this.data.activityInfo.title,
            "detailImages": this.data.activityInfo.detailImages,
            "detailContent": this.data.activityInfo.detailContent,
            "auditType": this.data.activityInfo.auditType,
            "imgList": imgList
        }

    },

  initBridge: function(){
      var self = this;

      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      setupWebViewJavascriptBridge(function(bridge) {

          bridge.callHandler('baseInfo',self.baseInfo,function(){});

          if(!window.isIOS){
              bridge.init(function(message, responseCallback) {

              });
          }

          bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
              self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('留言');
          })

          bridge.registerHandler('videoPause', function(data, responseCallback){
              var $video = self.$container.find('video');
              $video.each(function(index, item){
                  if(!item.paused){
                      item.pause();
                  }
              })
          })

          self.$container.delegate('.tap-avatar','click',function(){
              bridge.callHandler('tapUserImage')
          })

          self.$container.delegate('.tap-name','click',function(){
              bridge.callHandler('tapUserName')
          })

          self.$container.delegate('.tap-location','click',function(){
              bridge.callHandler('tapPlace')
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

          self.$container.delegate('.common-detail-wrap .detail-content img', 'click', function(){
              var index = $.makeArray(self.$imgList).indexOf($(this).get(0));
              bridge.callHandler('tapEnlarge', index, function(){})
          })

          self.$container.delegate('.common-review-wrap .review-content img', 'click', function(){
              var index = $.makeArray(self.$reviewImgList).indexOf($(this).get(0)) + self.$imgList.length;
              bridge.callHandler('tapEnlarge', index, function(){})
          })

      })
  }
})


new Activity();
