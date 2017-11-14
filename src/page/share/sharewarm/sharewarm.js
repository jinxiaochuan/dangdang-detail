require('page/common/common.js');
require('./sharewarm.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');
var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var ShareWarm = jsmod.util.klass({
	initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.initBridge();
    },
    initBridge: function(){
        var self = this;
        self.$container.delegate('.share_finish','click',function(){
            $(this).addClass('clicked');
        })
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            self.$container.delegate('.share_finish','click',function(){
                bridge.callHandler('tapComplete');
            })
        })


    }
})

new ShareWarm()