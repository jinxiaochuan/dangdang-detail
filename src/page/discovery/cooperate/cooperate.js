require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/cooperation/detail';

var TPL_COOPERATION = require('./tmpls/cooperate.tpl');

var URL_COOPERATION = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');

var Cooperate = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/discovery/cooperation/detail?userId=200110&coopId=1376357&viewUserId=200110';
        // URL_COOPERATION = 'http://app.im-dangdang.com/ddweb/v1/discovery/cooperation/detail';
        var data={};

        data.userId=jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.coopId=jsmod.util.url.getParam(HREF_ORIGIN,'coopId');
        data.viewUserId=jsmod.util.url.getParam(HREF_ORIGIN,'viewUserId');

        $.ajax({
            url:URL_COOPERATION,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.initBase(json.data);
                    self.render(json.data);
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
        data.detailContent = trans(data.detailContent);
        if(data.review || data.reviewImageList){
            data.review = trans(data.review);
        }
        var html = swig.render(TPL_COOPERATION,{
            locals:{
                data:data
            }
        })

        this.$container.html(html);

        this.initBridge();
    },

    initBase: function(data){
        this.baseInfo = {
            "applyStatus":data.applyStatus,
            "showAccess":data.showAccess,
            "userShowName":data.userShowName,
            "userId":data.userId,
            "headImage":data.headImage,
            "isFinished":data.isFinished,
            "coopId":data.webInfo.coopId,
            "isCanSignUp":data.isCanSignUp,
            "location":data.location,
            "longitude":data.longitude,
            "latitude":data.latitude,
            "userImage":data.userImage,
            "title":data.title,
            "detailImageList":data.detailImageList,
            "detailContent":data.detailContent
        }
    },

    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge) {

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
            })

            self.$container.delegate('.tap-avatar','click',function(){
                bridge.callHandler('tapUserImage')
            })

            self.$container.delegate('.tap-name','click',function(){
                bridge.callHandler('tapUserName')
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

             self.$container.delegate('.tap-location','click',function(){
                 bridge.callHandler('tapPlace')
             })
       })
    }
})

new Cooperate();
