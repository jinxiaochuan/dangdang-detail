require('page/common/common.js');

require('./discovery_cooperate_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_COOPERATION=require('./tmpls/discovery_cooperate_detail_tpl.tpl');

var URL_COOPERATION='http://test.im-dangdang.com/ddweb/v1/discovery/cooperation/detail';

var cooperationDetail = jsmod.util.klass({
  initialize:function(option){
    var self = this;
    self.option = option;
    self.$container = $('.container');
    self.getAjaxCooperation(page_url);
  },

  initBridge:function(){
    var self = this;

    self.avatarInfo = {
      "userId":self.data.webInfo.userId,
      "viewUserId":self.data.webInfo.viewUserId,
      "imgUrl": self.data.userImage
    }
    self.nameInfo = {
      "userId":self.data.webInfo.userId,
      "viewUserId":self.data.webInfo.viewUserId,
      "imgUrl": self.data.userImage
    }
    self.addressInfo = {
      "activityLocation":self.data.location,
      "activityLongitude":self.data.longitude,
      "activityLatitude":self.data.latitude
    }
    self.showAccessInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId,
      "tagId":self.data.webInfo.coopId,
      "showAccess":self.data.showAccess
    }
    self.intentionInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId,
      "tagId":self.data.webInfo.coopId
    }
    self.editInfo = {
      "userId":self.data.webInfo.userId,
      "tagId":self.data.webInfo.coopId,
      "coopId":self.data.webInfo.coopId
    }
    self.sendInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId,
      "tagId":self.data.webInfo.coopId,
      "replyUserId":self.data.webInfo.replyUserId
    }

    self.communicateInfo = {
        "userId":self.data.webInfo.userId,
        "coopId":self.data.webInfo.coopId
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

      self.$container.delegate('.cooperation-avatar','click',function(){

        bridge.callHandler('tapUserImage',self.avatarInfo,function(){

        })
      })

      self.$container.delegate('.cooperation-name','click',function(){

        bridge.callHandler('tapUserName',self.nameInfo,function(){

        })
      })

      self.$container.delegate('.cooperation-address','click',function(){

        bridge.callHandler('tapActivityPlace',self.addressInfo,function(){

        })
      })

      self.$container.delegate('.cooperation-show-access','click',function(){

        bridge.callHandler('tapShowAccess',self.showAccessInfo,function(){

        })
      })

      self.$container.delegate('.cooperation-inten','click',function(){

        bridge.callHandler('tapAppliedUserList',self.intentionInfo,function(){

        })
      })

       self.$container.delegate('.cooperation-edit','click',function(){

         bridge.callHandler('edit',self.editInfo,function(){

         })
       })

       self.$container.delegate('.cooperation-send','click',function(){

         bridge.callHandler('apply',self.sendInfo,function(){

         })
       })

       self.$container.delegate('.cooperation-communicate','click',function(){

         bridge.callHandler('communicate',self.communicateInfo,function(){

         })
       })

     })
  },

  deviceDetect: function () {
    var self = this;

    var u = window.navigator.userAgent;

    window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  },

  getAjaxCooperation:function(url){
    var self = this;

    //url = 'http://test.im-dangdang.com/ddweb/v1/discovery/cooperation/detail?userId=200114&coopId=12&viewUserId=200119';

    var data={};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.coopId=jsmod.util.url.getParam(url,'coopId');
    data.viewUserId=jsmod.util.url.getParam(url,'viewUserId');

    $.ajax({
        url:URL_COOPERATION,
        dataType:'jsonp',
        data:data,
        jsonp:'callback',
        success:function(json){
            if(json.data){
                console.log(json.data);
              self.data = json.data;
              self.cooperationRender(json.data);
            }
        }
    })

  },

  cooperationRender:function(data){
    var self = this;

    var tpl = swig.render(TPL_COOPERATION,{
        locals:{
            data:data
        }
    });

    self.$container.html(tpl);

    self.deviceDetect();

    self.initBridge();

  }
})
new cooperationDetail();
