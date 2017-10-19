require('page/common/common.js');

require('./index.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/base';

var TPL_CIRCLE_INDEX = require('./tmpls/index.tpl');

var URL_INDEX = PATH_ORIGIN + PATH_NAME;

var Empty = require('page/components/empty/empty.js');

var CircleIndex = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/circle/base?circleId=14865973&userId=200072';
        // URL_INDEX = 'http://dev.im-dangdang.com/ddweb/v1/circle/base';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.circleId = jsmod.util.url.getParam(HREF_ORIGIN,'circleId');

        $.ajax({
            url:URL_INDEX,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.render(self.data);
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

    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            self.$container.delegate('.tap-avatar','click',function(){
                bridge.callHandler('clickCircleLogo')
            })

            self.$container.delegate('.circle-handle-account','click',function(){
                bridge.callHandler('clickCircleAccount')
            })

            self.$container.delegate('.circle-handle-location','click',function(){
                bridge.callHandler('clickLocation')
            })

            self.$container.delegate('.circle-handle-look','click',function(){
                bridge.callHandler('clickPublicContent')
            })

            self.$container.delegate('.circle-home','click',function(){
                bridge.callHandler('enterCircle')
            })

            self.$container.delegate('.circle-intro img', 'click', function(){
                var index = $.makeArray(self.$imgList).indexOf($(this).get(0));
                bridge.callHandler('tapEnlarge', index, function(){})
            })

        })

    },

    render: function(data){
        var html = swig.render(TPL_CIRCLE_INDEX,{
            locals:{
                data:data
            }
        })

        this.$container.html(html);

        this.$container.find('.circle-intro').delegate('a','click',function(e){
            e.preventDefault();
        })

        this.initEnlarge();

        this.initBridge();

    },

    initEnlarge: function(){
        var self = this;
        this.$imgList = this.$container.find('.circle-intro img');
        var imgList = $.map($.makeArray(self.$imgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        this.baseInfo = {
            "circleId": this.data.baseInfo.circleId,
            "circleName": this.data.baseInfo.circleName,
            "circleLogo": this.data.baseInfo.circleLogo,
            "memberType": this.data.baseInfo.memberType,
            "latitude": this.data.baseInfo.latitude,
            "longitude": this.data.baseInfo.longitude,
            "location": this.data.baseInfo.location,
            "publicSchool": this.data.baseInfo.publicSchool,
            "publicWork": this.data.baseInfo.publicWork,
            "imgList": imgList
        }

    }

})

new CircleIndex();
