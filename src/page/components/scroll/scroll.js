var TPL_SCROLL = require('./scroll.tpl');

require('./scroll.less');

var Vue = require('vue');

module.exports = Vue.extend({
    name: 'scrollComponent',

    template: TPL_SCROLL,

    created: function(){
        var self = this;
        window.onscroll = function () {
            if (self.getScrollTop() + self.getClientHeight() == self.getScrollHeight()) {
                self.$emit('onBottom');
            }
        }
    },

    methods: {
        getScrollHeight: function(){
            var scrollHeight = 0;

            if(document.body.scrollHeight && document.documentElement.scrollHeight){
                scrollHeight = Math.min(document.body.scrollHeight, document.documentElement.scrollHeight)
            }else {
                scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }

            return scrollHeight
        },

        //获取当前可视范围的高度
        getClientHeight: function(){
            var clientHeight = 0;

            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }

            return clientHeight;
        },

        //获取滚动条当前的位置
        getScrollTop: function(){
            var scrollTop = 0;

            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }else if (document.body) {
                scrollTop = document.body.scrollTop;
            }

            return scrollTop;
        }
    }
})
