require('page/common/common.js');

require('./list.less');

var versionComp = require('lib/self/versionComp.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_LIST = require('./tmpls/list.tpl');

var HREF_ORIGIN = window.location.href;
// var HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/help/list?channelId=100000&os=11.2&ddtoken=5%2B9XQOpxoFZDDDrC/NyUrXucjVHamnflYNAihZc4MKkfgQbWHIhNzvowZnE7NgRiyZrgy5yj9YE4q2W0OJgmbL6fCb/SPfuv83rAJCxNCtM=&appVersion=1.3.12&userId=200255&platform=ios';
var ddtoken = jsmod.util.url.getParam(HREF_ORIGIN,'ddtoken');
var PARAMS = jsmod.util.url.getParamMap(HREF_ORIGIN);

var IOS_VERSION = '1.3.12'; // 该版本及以上ios端最ddtoken统一已进行encodeURIComponent转码
var platform = jsmod.util.url.getParam(HREF_ORIGIN,'platform');
var appVersion = jsmod.util.url.getParam(HREF_ORIGIN,'appVersion');
if(platform == 'ios' && (versionComp(appVersion, IOS_VERSION) >= 0)){
    PARAMS = $.extend(PARAMS,{'ddtoken':ddtoken})
}else {
    PARAMS = $.extend(PARAMS,{'ddtoken':encodeURIComponent(ddtoken)})
}
var PARAMSMAP = [];
$.each(PARAMS,function(key,value){
    PARAMSMAP.push(key + '=' + value)
})
var PARAMSTRING = PARAMSMAP.join('&');

var List = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.render();
    },

    render: function(){
        var self = this;
        $.ajax({
            url: '/ddweb/v1/feedback/help/list?' + PARAMSTRING,
            dataType :'jsonp',
            jsonp:'callback',
            cache:true,
            success:function(data){
                var html = swig.render(TPL_LIST,{
                    locals: {
                        data: data,
                        paramUrl: PARAMSTRING
                    }
                });
                self.$container.html(html);

            }
        });
    }
})

new List();
