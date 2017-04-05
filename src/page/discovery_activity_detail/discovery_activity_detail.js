require('page/common/common.js');

require('./discovery_activity_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_DISCOVERY_ACTIVITY=require('./tmpls/discovery_activity_detail_tpl.tpl');

var URL_DISCOVERY_ACTIVITY='http://test.im-dangdang.com/ddweb/v1/discovery/activity/detail';

var discoveryActivityDetail = jsmod.util.klass({
  initialize:function(option){
    var self = this;
    self.option = option;
    self.$container = $('.container');
    self.getAjaxDiscoveryActivity(page_url);
  },

  initBrige:function(){
    var self = this;

    self.avatarInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "viewUserId":self.data.activityInfo.webInfo.viewedUserId
    }

    self.nameInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "viewUserId":self.data.activityInfo.webInfo.viewedUserId
    }

    self.addressInfo = {
      "activityLocation":self.data.activityInfo.location,
      "activityLongitude":self.data.activityInfo.longitude,
      "activityLatitude":self.data.activityInfo.latitude
    }

    self.showAccessInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "activityId":self.data.activityInfo.webInfo.activityId,
      "showAccess":self.data.activityInfo.showAccess
    }

    self.intentionInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "activityId":self.data.activityInfo.webInfo.activityId
    }

    self.editInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "activityId":self.data.activityInfo.webInfo.activityId
    }

    self.sendInfo = {
      "userId":self.data.activityInfo.webInfo.userId,
      "activityId":self.data.activityInfo.webInfo.activityId,
      "replyUserId":self.data.activityInfo.webInfo.replyUserId
    }

    /*这段代码是固定的，必须要放到js中*/
      function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
      }

      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      setupWebViewJavascriptBridge(function(bridge) {
        self.$container.delegate('.activity-avatar','click',function(){

          bridge.callHandler('tapUserImage',self.avatarInfo,function(){

          })
        })

        self.$container.delegate('.activity-name','click',function(){

          bridge.callHandler('tapUserName',self.nameInfo,function(){

          })
        })

        self.$container.delegate('.activity-address','click',function(){

          bridge.callHandler('tapActivityPlace',self.addressInfo,function(){

          })
        })

        self.$container.delegate('.activity-show-access','click',function(){

          bridge.callHandler('tapShowAccess',self.showAccessInfo,function(){

          })
        })

        self.$container.delegate('.activity-inten','click',function(){

          bridge.callHandler('tapShowAccess',self.showAccessInfo,function(){

          })
        })

        self.$container.delegate('.discovery-activity-edit','click',function(){

          bridge.callHandler('edit',self.editInfo,function(){

          })
        })

        self.$container.delegate('.discovery-activity-send','click',function(){

          bridge.callHandler('apply',self.sendInfo,function(){

          })
        })

     })
  },

  getAjaxDiscoveryActivity:function(url){
    var self = this;

    //url='http://test.im-dangdang.com/ddweb/v1/discovery/activity/detail?userId=200119&activityId=3';

    var data={};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.activityId=jsmod.util.url.getParam(url,'activityId');

    $.ajax({
        url:URL_DISCOVERY_ACTIVITY,
        dataType:'jsonp',
        data:data,
        jsonp:'callback',
        success:function(json){
            if(json.data){
                self.data=json.data;
                self.discoveryActivityRender(json.data);
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

    self.initBrige();

  }
});

new discoveryActivityDetail();