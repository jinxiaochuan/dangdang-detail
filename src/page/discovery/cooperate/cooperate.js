require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

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

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/discovery/cooperation/detail?userId=1000063&coopId=18&viewUserId=1000063';
        // URL_COOPERATION = 'http://app.im-dangdang.com/ddweb/v1/discovery/cooperation/detail';
        var data={};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        data.coopId = jsmod.util.url.getParam(HREF_ORIGIN, 'coopId');
        data.viewUserId = jsmod.util.url.getParam(HREF_ORIGIN, 'viewUserId');

        $.ajax({
            url:URL_COOPERATION,
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
            "applyStatus": this.data.applyStatus,
            "showAccess": this.data.showAccess,
            "userShowName": this.data.userShowName,
            "userId": this.data.userId,
            "headImage": this.data.headImage,
            "isFinished": this.data.isFinished,
            "coopId": this.data.webInfo.coopId,
            "isCanSignUp": this.data.isCanSignUp,
            "location": this.data.location,
            "longitude": this.data.longitude,
            "latitude": this.data.latitude,
            "userImage": this.data.userImage,
            "title": this.data.title,
            "detailImageList": this.data.detailImageList,
            "detailContent": this.data.detailContent,
            "imgList": imgList
        }
    },

    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge) {

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

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

new Cooperate();
