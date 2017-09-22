require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

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

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/discovery/activity/detail?userId=200110&activityId=1376318';
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
                    self.initBase(json.data);
                    self.render(self.data);
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

        this.initBridge();

    },

    initBase: function(data){
        this.baseInfo = {
            "endTime": data.activityInfo.endTime,
            "applyStatus": data.activityInfo.applyStatus,
            "showAccess":data.activityInfo.showAccess,
            "showName":data.activityInfo.userInfo.showName,
            "viewUserId":data.activityInfo.webInfo.viewedUserId,
            "headImage":data.activityInfo.userInfo.headImage,
            "isOver":data.activityInfo.isOver,
            "activityId":data.activityInfo.webInfo.activityId,
            "isCanSignUp":data.activityInfo.isCanSignUp,
            "location":data.activityInfo.location,
            "longitude":data.activityInfo.longitude,
            "latitude":data.activityInfo.latitude,
            "userImage":data.activityInfo.userInfo.userImage,
            "title":data.activityInfo.title,
            "detailImages":data.activityInfo.detailImages,
            "detailContent":data.activityInfo.detailContent,
            "auditType":data.activityInfo.auditType
        }
    },

  initBridge: function(){
      var self = this;

      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      setupWebViewJavascriptBridge(function(bridge) {

          bridge.callHandler('baseInfo',self.baseInfo,function(){});

          bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
              self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
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
      })
  }
})


new Activity();
