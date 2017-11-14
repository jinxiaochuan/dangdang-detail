require('page/common/common.js');
require('./sendwarm.less');
var jsmod = require('lib/self/jsmod/jsmod_extend.js');
var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');
window.onload = function(){
	var HREF_ORIGIN = window.location.href;
	alert(HREF_ORIGIN);
	var source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
	var share_count  = jsmod.util.url.getParam(HREF_ORIGIN,'userTotalNum');
	var share_button =  $('.share_button');
	var count = $('.warm_count');
	var num = $('.warm_count .num');

	if(source && source == 1){
		share_button.hide();
		count.hide();
	}
	alert('share_count:'+share_count);
	num.html(share_count);
}
var SendWarm = jsmod.util.klass({
	initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.initBridge();
    },
    initBridge: function(){
        var self = this;

        self.$container.delegate('.share_button','click',function(){
        	$(this).addClass('clicked');
        })
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            self.$container.delegate('.share_button','click',function(){
            	$(this).addClass('clicked');
                bridge.callHandler('tapShare')
            })
        })


    }
})
new SendWarm()