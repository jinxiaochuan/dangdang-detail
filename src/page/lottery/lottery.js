require('page/common/common.js');

require('./lottery.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var TPL_NOSTART = require('./tmpls/nostart.tpl');
var TPL_JOIN = require('./tmpls/join.tpl');
var TPL_NOJOIN = require('./tmpls/nojoin.tpl');
var TPL_ERROR = require('./tmpls/error.tpl');
var TPL_APPLY = require('./tmpls/apply.tpl');

var TPL_MAP = [TPL_NOSTART, TPL_JOIN, TPL_NOJOIN, TPL_ERROR, TPL_APPLY];

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/lottery/info';

var URL_LOTTERY = PATH_ORIGIN + PATH_NAME;

var Lottery = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },
    getAjax: function(){
        var self = this;

        var data = {};

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/circle/lottery/info?userId=200119&circleId=1623374988';
        // URL_LOTTERY = 'http://dev.im-dangdang.com/ddweb/v1/circle/lottery/info';

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        data.circleId = jsmod.util.url.getParam(HREF_ORIGIN, 'circleId');

        $.ajax({
            url: URL_LOTTERY,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status != 1){
                    self.$container.html(TPL_ERROR);
                    return
                }

                var html = swig.render(TPL_MAP[json.data.pageType-1],{
                    locals: json.data
                })

                self.$container.html(html);

                self.baseInfo = {
                    'circleId': json.data.circleInfo.circleId,
                    'circleName': json.data.circleInfo.circleName
                }

                self.circleInfo = json.data.circleInfo;

                self.initBridge();

            }
        })
    },

    initBridge: function(){
        var self = this;

        setupWebViewJavascriptBridge(function(bridge){

            if(!bridge) return

            self.bridge = bridge;

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            self.$container.delegate('.nojoin-action', 'click', function(){
                bridge.callHandler('joinCircle',self.circleInfo,function(){})
            })

            self.$container.delegate('.join-action, .nostart-action, .apply-action', 'click', function(){
                bridge.callHandler('goBack')
            })

        })
    }
})

new Lottery()
