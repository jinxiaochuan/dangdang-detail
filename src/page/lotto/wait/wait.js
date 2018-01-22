var Vue = require('vue');

require('page/common/common.js');

require('./wait.less');

var TPL_WAIT = require('./tmpls/wait.tpl');

new Vue({
    el: '#lotto-wait',

    template: TPL_WAIT,

    data: function () {
        return {

        }
    },

    methods: {

        init () {

        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
