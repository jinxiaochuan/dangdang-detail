require('page/common/common.js');

require('lib/third/jquery.validate.js');

require('lib/third/layer/mobile/need/layer.css');
require('lib/third/layer/mobile/layer.js');

require('./feedback.less');

var versionComp = require('lib/self/versionComp.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_SUCCESS = require('./tmpls/success.tpl');

var HREF_ORIGIN = window.location.href;

var PARAMS = jsmod.util.url.getParamMap(HREF_ORIGIN);

if(PARAMS.ddtoken){
    PARAMS.ddtoken = decodeURIComponent(PARAMS.ddtoken);
}

var Feedback = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.$form = this.$container.find('form');
        this.validate();
        this.initEvents();
    },

    validate: function(){
        var timer;
        this.$form.validate({
            onkeyup:false,
            rules:{
                'problemDesc':{
                    required:true,
                    minlength: 10,
                    maxlength:200
                }
            },
            messages:{
                'problemDesc':{
                    required:'请填写问题和意见',
                    minlength:'请填写不低于10个字的问题和意见',
                    maxlength:'请填写不超过200个字的问题和意见'
                }
            },
            errorPlacement:function(error,element){
                error.appendTo($('.feedback-error-wrap').empty().addClass('show'));

                timer = setTimeout(function(){
                    $('.feedback-error-wrap').removeClass('show');
                },1500)

            }
        })
    },

    initEvents: function(){
        var self = this;

        this.$container.delegate('textarea','input propertychange',function(){
            var len = $(this).val().length;
            var maxLen = 200;
            if(len - maxLen > 0){
                $('.opinion').addClass('limit');
            }else {
                $('.opinion').removeClass('limit');
            }
            self.$container.find('.num').text(len);
        })

        this.$container.delegate('.done:not(".disable")','click',function(){
            var me = this;

            if(!self.$form.valid()){
                return;
            }

            $(this).addClass('disable');

            var data = self.$form.serializeArray();

            var postData = {};

            data.forEach(function(item){
                postData[item.name] = item.value;
            })

            postData = $.extend(postData, PARAMS);

            $.ajax({
                url: '/ddweb/v1/feedback',
                type: 'POST',
                data: postData,
                dataType: 'json',
                success: function(json){
                    $(me).removeClass('disable');
                    if(json.status == 1){
                        self.$container.html(TPL_SUCCESS);
                        return;
                    }

                    layer.open({
                        content: json.msg,
                        skin: 'msg',
                        time: 2
                     });
                }

            })
        })

        this.$container.delegate('.close','click',function(){
            window.history.back();
        })
    }
})

new Feedback();
