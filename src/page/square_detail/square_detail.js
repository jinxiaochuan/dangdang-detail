require('page/common/common.js');

require('./square_detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_SQUARE = require('./tmpls/square.tpl');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/square/detail';

var URL_SQUARE = PATH_ORIGIN + PATH_NAME;

var SquareDetail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/square/detail?userId=200119&squareId=1317';
        // URL_SQUARE = 'http://dev.im-dangdang.com/ddweb/v1/square/detail';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.squareId = jsmod.util.url.getParam(HREF_ORIGIN,'squareId');

        $.ajax({
            url: URL_SQUARE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    console.log(json.data);
                    var html = swig.render(TPL_SQUARE,{
                        locals: json.data
                    })
                    self.$container.html(html);
                }
            }
        })
    }


})

new SquareDetail();

var $squareContainer=$('.container');

$squareContainer.delegate('.slide-down-btn','click',function(){
    $(this).removeClass('slide-down-btn').addClass('slide-up-btn').text('收起').prev().removeClass('content-outline');
});

$squareContainer.delegate('.slide-up-btn','click',function(){
    $(this).removeClass('slide-up-btn').addClass('slide-down-btn').text('全文').prev().addClass('content-outline');
});
