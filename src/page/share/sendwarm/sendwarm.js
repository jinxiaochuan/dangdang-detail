require('page/common/common.js');

require('./sendwarm.less');
var jsmod = require('lib/self/jsmod/jsmod_extend.js');
var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');
var share = require('lib/self/share.js');
var WARM_MODEL = require('./tmpls/warm_new.tpl');


var HREF_ORIGIN = window.location.href;
var PATH_ORIGIN = window.location.origin;
var PATH_NAME = '/ddweb/v1/tg/qr/num';
var COUNT_URL = PATH_ORIGIN + PATH_NAME;
// var COUNT_URL = 'http://app.im-dangdang.com/' + PATH_NAME;

var source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
var qrId = jsmod.util.url.getParam(HREF_ORIGIN,'qrId');
var openid = jsmod.util.url.getParam(HREF_ORIGIN,'openid');
var ddrelay = jsmod.util.url.getParam(HREF_ORIGIN,'ddrelay');

var SendWarm = jsmod.util.klass({
	initialize: function(option){
        this.option = option;
        this.$container = $('.container');
		this.initShare();
        this.getAjaxCount();
    },
	initView:function(){

		if(ddrelay){
			$('.container').after('<div class="pop-common-wrap"></div>');
		}

		$('body').delegate('.pop-common-wrap','click',function(){
			$(this).remove();
		})
	},
    getAjaxCount:function(){
        var self = this;

        $.ajax({
            url: COUNT_URL,
			data: {
				'userId': userId,
				'qrId': qrId,
				'openid': openid
			},
            dataType: 'jsonp',
            jsonp: 'callback',
            success:function(data){
                if(data.status == 1) {
                    var share_count = data.data.userTotalNum;
                    var html = swig.render(WARM_MODEL,{
                        locals: {
                            data: data.data,
                            source: source,
							ddrelay: ddrelay,
							link: '/ddweb/tg/relay?qrId='+ qrId +'&userId=' + userId
                        }
                    });
                    self.$container.html(html);
					self.initView();
					self.initBridge();
                }
            }

        })
    },
    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            self.$container.delegate('.share_button','click',function(){
                bridge.callHandler('tapShare')
            })

			self.$container.delegate('.done_button','click',function(){
                bridge.callHandler('tapMainPageComplete')
            })
        })
    },
    initShare: function(){
        share();
    },
})
new SendWarm()
