require('page/common/common.js');

require('./invite.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var TPL_INVITE = require('./tmpls/invite.tpl');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/user/info';

var URL_INVITE = PATH_ORIGIN + PATH_NAME;

var Invite = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },
    getAjax: function(){
        var self = this;

        var data = {};

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/user/invite?userId=200119&withCode=1';
        // URL_INVITE = 'http://dev.im-dangdang.com/ddweb/v1/user/info';


        data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        data.viewedUserId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
        var withCode = jsmod.util.url.getParam(HREF_ORIGIN, 'withCode');

        if(withCode){
            data.withCode = withCode
        }

        if(!data.userId){
            return;
        }

        $.ajax({
            url: URL_INVITE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    if(json.data.friendCode && json.data.userBonus){
                        self.$container.find('.download-banner').addClass('friend');
                    }
                    var html = swig.render(TPL_INVITE,{
                        locals: {
                            data: json.data
                        }
                    })
                    self.$container.find('.download-invite').html(html);
                    self.initShare();

                }
            }
        })
    },

    initShare: function(){
        share();
    }
})

new Invite();
