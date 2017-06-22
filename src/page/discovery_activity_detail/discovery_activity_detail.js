require('page/common/common.js');

require('./discovery_activity_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/activity/detail';

var TPL_DISCOVERY_ACTIVITY = require('./tmpls/discovery_activity_detail_tpl.tpl');

var URL_DISCOVERY_ACTIVITY = PATH_ORIGIN + PATH_NAME;

var discoveryActivityDetail = jsmod.util.klass({
  initialize:function(option){
    var self = this;
    self.option = option;
    self.$container = $('.container');
    self.getAjaxDiscoveryActivity();
  },

  initBridge:function(){
    var self = this;

    self.baseInfo = {
        "endTime": self.data.activityInfo.endTime,
        "applyStatus": self.data.activityInfo.applyStatus,
        "showAccess":self.data.activityInfo.showAccess,
        "showName":self.data.activityInfo.userInfo.showName,
        "viewUserId":self.data.activityInfo.webInfo.viewedUserId,
        "headImage":self.data.activityInfo.userInfo.headImage,
        "isOver":self.data.activityInfo.isOver,
        "activityId":self.data.activityInfo.webInfo.activityId,
        "isCanSignUp":self.data.activityInfo.isCanSignUp
    }


    self.addressInfo = {
      "activityLocation":self.data.activityInfo.location,
      "activityLongitude":self.data.activityInfo.longitude,
      "activityLatitude":self.data.activityInfo.latitude
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
            self.$container.find('.discovery-activity-send').removeClass('discovery-activity-send').addClass('discovery-activity-communicate').text('沟通');
        })

        self.$container.delegate('.activity-avatar','click',function(){
            bridge.callHandler('tapUserImage')
        })

        self.$container.delegate('.activity-name','click',function(){
            bridge.callHandler('tapUserName')
        })

        self.$container.delegate('.activity-address','click',function(){
            bridge.callHandler('tapActivityPlace',self.addressInfo,function(){})
        })

        self.$container.delegate('.activity-show-access','click',function(){
            bridge.callHandler('tapShowAccess')
        })

        self.$container.delegate('.activity-inten','click',function(){
            bridge.callHandler('tapAppliedUserList')
        })

        self.$container.delegate('.discovery-activity-edit','click',function(){
            bridge.callHandler('edit')
        })

        self.$container.delegate('.discovery-activity-send','click',function(){
            bridge.callHandler('doApply')
        })

        self.$container.delegate('.discovery-activity-communicate','click',function(){
            bridge.callHandler('doChat')
        })

     })
  },

  getAjaxDiscoveryActivity:function(){
    var self = this;

    //HREF_ORIGIN = 'http://dev.im-dangdang.com/discovery/v1/activity/detail?userId=200180&activityId=498';
    //URL_DISCOVERY_ACTIVITY = 'http://dev.im-dangdang.com/discovery/v1/activity/detail';
    var data={};

    data.userId=jsmod.util.url.getParam(HREF_ORIGIN,'userId');
    data.activityId=jsmod.util.url.getParam(HREF_ORIGIN,'activityId');
    $.ajax({
        url:URL_DISCOVERY_ACTIVITY,
        dataType:'jsonp',
        data:data,
        jsonp:'callback',
        success:function(json){
            if(json.data){
                console.log(json.data);
                self.data=json.data;
                self.data['date_now'] = Date.parse(new Date())/1000;
                self.discoveryActivityRender(self.data);
            }
        }
    })
  },

  discoveryActivityRender:function(data){
    var self = this;

    var tpl = swig.render(TPL_DISCOVERY_ACTIVITY,{
        locals:{
            data:data
        }
    });

    self.$container.html(tpl);

    self.deviceDetect();

    self.initBridge();

    self.initFlex();

    var width_avatar = this.$container.find('.activity-avatar').width();
    jsmod.util.stretchImg($('.avatar')[0],width_avatar,width_avatar,true,false);

  },

  initFlex: function () {
      var $content = this.$container.find('.content');
      var $time = this.$container.find('.content .time');
      var $address = this.$container.find('.content .address');
      var limit = $content.width() - $time.width();
      var tem_width = $('.address-tem').width();
      if((tem_width+12) < limit){
          $content.addClass('flex-space');
      }
       $address.show();
  },

  deviceDetect: function () {
    var self = this;

    var u = window.navigator.userAgent;

    window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  }
});

new discoveryActivityDetail();
