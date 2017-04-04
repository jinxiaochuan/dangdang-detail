require('page/common/common.js');

require('./cooperation_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_COOPERATION=require('./tmpls/cooperation_detail_tpl.tpl');

var URL_COOPERATION='http://test.im-dangdang.com/ddweb/v1/discovery/cooperation/detail';

var cooperationDetail = jsmod.util.klass({
  initialize:function(option){
    var self = this;
    self.option = option;
    self.$container = $('.container');
    self.getAjaxCooperation(page_url);
  },

  initBrige:function(){
    var self = this;

    self.avatarInfo = {
      "userId":self.data.webInfo.userId,
      "viewUserId":self.data.webInfo.viewUserId
    }
    self.nameInfo = {
      "userId":self.data.webInfo.userId,
      "viewUserId":self.data.webInfo.viewUserId
    }
    self.addressInfo = {
      "activityLocation":self.data.location,
      "activityLongitude":self.data.longitude,
      "activityLatitude":self.data.latitude
    }
    self.showAccessInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId,
      "showAccess":self.data.showAccess
    }
    self.intentionInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId
    }
    self.editInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId
    }
    self.sendInfo = {
      "userId":self.data.webInfo.userId,
      "coopId":self.data.webInfo.coopId,
      "replyUserId":self.data.webInfo.replyUserId
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
       var uniqueId = 1
      //  function log(message, data) {
      //    var log = document.getElementById('log')
      //    var el = document.createElement('div')
      //    el.className = 'logLine'
      //    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
      //    if (log.children.length) {
      //       log.insertBefore(el, log.children[0])
      //    } else {
      //      log.appendChild(el)
      //    }
      //  }
      //  /* Initialize your app here */
       //
      //  /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
      //  bridge.registerHandler('openWebviewBridgeArticle', function() {
      //     log("openWebviewBridgeArticle was called with by ObjC")
      //  })
      //  /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
      //  bridge.registerHandler('getUserInfos', function(data, responseCallback) {
      //    log("Get user information from ObjC: ", data)
      //    responseCallback({'userId': '123456', 'blog': '标哥的技术博客'})
      //  })
       //
      //  /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用*/
      //  bridge.callHandler('getUserIdFromObjC', function(responseData) {
      //    log("JS call ObjC's getUserIdFromObjC function, and js received response:", responseData)
      //  })
       //
      //  document.getElementById('blogId').onclick = function (e) {
      //    log('js call objc: getBlogNameFromObjC')
      //    bridge.callHandler('getBlogNameFromObjC', {'blogURL': 'http://www.henishuo.com'}, function(response) {
      //                     log('JS got response', response)
      //                     })
      //  }
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

     })
  },

  getAjaxCooperation:function(url){
    var self = this;

    //url = 'http://test.im-dangdang.com/ddweb/v1/discovery/cooperation/detail?userId=200119&coopId=12&viewUserId=200119';

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

    self.initBrige();
  }
})
new cooperationDetail();
