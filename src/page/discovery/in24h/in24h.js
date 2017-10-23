require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/discovery/in24h/detail';

var TPL_DISCOVERY_IN24 = require('./tmpls/in24h.tpl');

var URL_DISCOVERY_IN24 = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');

var IN24H = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/discovery/in24h/detail?userId=200119&in24hId=164&longitude=116.488580&latitude=39.915222';
        // URL_DISCOVERY_IN24 = 'http://dev.im-dangdang.com/ddweb/v1/discovery/in24h/detail';
        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        data.in24hId = jsmod.util.url.getParam(HREF_ORIGIN, 'in24hId');
        data.longitude = jsmod.util.url.getParam(HREF_ORIGIN, 'longitude');
        data.latitude = jsmod.util.url.getParam(HREF_ORIGIN, 'latitude');
        $.ajax({
            url: URL_DISCOVERY_IN24,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function (json) {
                if (json.status == 1) {
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
        data.in24hInfo.detailContent = trans(data.in24hInfo.detailContent);
        if(data.in24hInfo.review || data.in24hInfo.reviewImages){
            data.in24hInfo.review = trans(data.in24hInfo.review);
        }
        var html = swig.render(TPL_DISCOVERY_IN24, {
            locals: {
                data: data
            }
        });

        this.$container.html(html);

        this.$container.find('.detail-content').delegate('a','click',function(e){
            e.preventDefault();
        })

        this.initFlex();

        this.initEnlarge();

        this.initBridge();
    },

    initFlex: function(){
        var w = $('.label-detail.label-detail-in24h').width();
        var w_a = $('.in24-address').width();
        var w_d = $('.distance').width() + 20;

        if(w_a + w_d > w){
            $('.in24-address').css({
                'float': 'left',
                'width': w - w_d + 'px'
            })
        }
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
            "viewedUserId": this.data.in24hInfo.webInfo.viewedUserId,
            "activityLongitude": this.data.in24hInfo.activityLongitude,
            "activityLatitude": this.data.in24hInfo.activityLatitude,
            "activityLocation": this.data.in24hInfo.activityLocation,
            "longitude": this.data.in24hInfo.longitude,
            "latitude": this.data.in24hInfo.latitude,
            "location": this.data.in24hInfo.location,
            "in24hId": this.data.in24hInfo.webInfo.in24hId,
            "showAccess": this.data.in24hInfo.showAccess,
            "applyStatus": this.data.in24hInfo.applyStatus,
            "headImage": this.data.in24hInfo.userInfo.headImage,
            "showName": this.data.in24hInfo.userInfo.showName,
            "isCanSeePersonFile": this.data.in24hInfo.isCanSeePersonFile,
            "isFollow": this.data.in24hInfo.isFollow,
            "isCanSignUp": this.data.in24hInfo.isCanSignUp,
            "userImage": this.data.in24hInfo.userInfo.userImage,
            "title": this.data.in24hInfo.title,
            "detailImages": this.data.in24hInfo.detailImages,
            "detailContent": this.data.in24hInfo.detailContent,
            "auditType": this.data.in24hInfo.auditType,
            "imgList": imgList
        }
    },

    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function (bridge) {

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            bridge.registerHandler('doChangeStatus',function(data, responseCallback){
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('留言');
            })

            self.$container.delegate('.tap-avatar', 'click', function () {
                bridge.callHandler('tapUserImage')
            })

            self.$container.delegate('.tap-name', 'click', function () {
                bridge.callHandler('tapUserName')
            })

            self.$container.delegate('.in24-address', 'click', function () {
                bridge.callHandler('tapActivityPlace')
            })

            self.$container.delegate('.show-access', 'click', function () {
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.tap-sign', 'click', function () {
                bridge.callHandler('tapAppliedUserList')
            })

            self.$container.delegate('.edit-btn', 'click', function () {
                bridge.callHandler('edit')
            })

            self.$container.delegate('.sign-btn','click',function(){
                bridge.callHandler('doApply')
            })

            self.$container.delegate('.communicate-btn','click',function(){
                bridge.callHandler('doChat')
            })

            self.$container.delegate('.in24-address','click',function(){
                bridge.callHandler('tapAddress')
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

new IN24H();
