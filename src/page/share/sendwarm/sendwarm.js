require('page/common/common.js');
require('./sendwarm.less');
var jsmod = require('lib/self/jsmod/jsmod_extend.js');
var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');
var share = require('lib/self/share.js');

var HREF_ORIGIN = window.location.href;
var PATH_ORIGIN = window.location.origin;
var PATH_NAME = '/ddweb/v1/tg/qr/num';
var COUNT_URL = PATH_ORIGIN + PATH_NAME;
var source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
var share_button =  $('.share_button');
var count = $('.warm_count');


if(source && source == 1){
	share_button.hide();
	count.hide();
}

var SendWarm = jsmod.util.klass({
	initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjaxCount();
        this.initBridge();
        this.initShare();
    },
    getAjaxCount:function(){
        var num = $('.warm_count .num');
		// COUNT_URL = 'http://dev.im-dangdang.com/' + PATH_NAME;
        $.ajax({
            url: COUNT_URL,
			data: {'userId':userId},
            dataType: 'jsonp',
            jsonp: 'callback',
            success:function(data){
                if(data.status == 1) {
                    var share_count = data.data.userTotalNum;
                    num.html(share_count);
                }
            }

        })
    },
    initBridge: function(){
        var self = this;

        self.$container.delegate('.share_button','click',function(){
        	$(this).addClass('clicked');
        })
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            self.$container.delegate('.share_button','click',function(){
                bridge.callHandler('tapShare')
            })
        })
    },
    initShare: function(){
        share();
    },
})
new SendWarm()
