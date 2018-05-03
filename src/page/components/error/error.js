var TPL_ERROR = require('./error.tpl');

require('./error.less');

var Vue = require('vue');

module.exports = Vue.extend({
    name: 'errorComponent',

    template: TPL_ERROR,

    props: ['msg'],

    data: function () {
        return {

        }
    },

    methods: {

    },

    mounted: function () {
        this.$nextTick(() => {
            
        })
    }
})
