require('page/common/common.js');

require('./feedback.less');

require('lib/third/jquery.validate.js');
require('lib/third/layer/mobile/need/layer.css');
require('lib/third/layer/mobile/layer.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');

var ddtoken = jsmod.util.url.getParam(HREF_ORIGIN,'ddtoken');

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

        this.$container.delegate('textarea','keyup',function(){
            var len = $(this).val().length;
            var maxLen = 200;
            if(len - maxLen > 0){
                $('.opinion-calculation').addClass('limit');
            }else {
                $('.opinion-calculation').removeClass('limit');
            }
            self.$container.find('.num').text(len);
        })

        this.$container.delegate('.done:not(".disable")','click',function(){

            if(!self.$form.valid()){
                return;
            }

            $(this).addClass('.disable');

            var data = self.$form.serializeArray();

            var postData = {};

            data.forEach(function(item){
                postData[item.name] = item.value;
            })

            postData = $.extend(postData, {'userId':userId,'ddtoken':ddtoken});

            $.ajax({
                url: '/ddweb/v1/feedback',
                type: 'POST',
                data: postData,
                success: function(json){
                    if(json.status == 1){
                        layer.open({
                            content: '反馈成功',
                            skin: 'msg',
                            time: 2,
                            success: function(){
                                setTimeout(function(){
                                    window.history.back();
                                },2000)
                            }
                         });
                    }
                }

            })
        })
    }
})

new Feedback();
