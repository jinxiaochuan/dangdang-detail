import Vue from 'vue';

require('page/common/common.js');

require('./fans.less');

var TPL_DETAIL = require('./tmpls/fans.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/circle/v1/circleSignin/idolDangOnce/statics';

var URL_FANS = PATH_ORIGIN + PATH_NAME;

new Vue({
    el: '#fans-detail',

    template: TPL_DETAIL,

    data: function(){
        return {
            circleList: [],
            startTime: '',
            endTime: '',
            remainingTime: ''
        }
    },

    methods: {
        init () {
            var self = this;
            // URL_FANS = 'http://dev.im-dangdang.com/circle/v1/circleSignin/idolDangOnce/statics'
            $.ajax({
                url: URL_FANS,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(json){
                    console.log(json);
                    if(json.status == 1){
                        self.circleList = json.data.circleList;
                        self.startTime = json.data.startTime;
                        self.endTime = json.data.endTime;
                        self.remainingTime = json.data.remainingTime;
                    }
                }
            })
        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
        })
    }

})
