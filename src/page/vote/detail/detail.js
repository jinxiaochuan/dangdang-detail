import Vue from 'vue';

import queryString from 'query-string';

require('page/common/common.js');

require('./detail.less');

var TPL_VOTE = require('./tmpls/detail.tpl');

var scrollComponent = require('page/components/scroll/scroll.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/vote/detail';

var URL_VOTE = PATH_ORIGIN + PATH_NAME;

var URL_VOTE_HANDLE = PATH_ORIGIN + '/ddweb/v1/vote';

new Vue({
    el: '#vote-wrap',

    template: TPL_VOTE,

    components: {
        Scroll: scrollComponent
    },

    data: function () {
        return {
            loading: 1,
            userId: '',
            voteId: '',
            keyword: '',
            isAdmin: 0,
            options: [],
            title: '',
            lastRowId: 0,
            pageRows: 20,
            bottom: 0,
            selectType: '',
            maxSelNum: '1',
            isFinished: '',
            isVoted: '',
            voteOptions: ''
        }
    },

    watch: {
        keyword: function(val, oldVal){
            this.lastRowId = 0,
            this.options = [];
            this.bottom = 0;
            this.getPage()
        }
    },

    methods: {
        init () {
            var parsed = queryString.parse(location.search);
            this.userId = parsed.userId;
            this.voteId = parsed.voteId;
            this.isAdmin = parsed.isAdmin || 0;
            this.getPage()
        },

        getPage () {
            var self = this;

            this.loading = 1;

            // URL_VOTE = 'http://dev.im-dangdang.com/ddweb/v1/vote/detail';

            var params = {
                userId: this.userId,
                voteId: this.voteId,
                pageRows: this.pageRows,
                lastRowId: this.lastRowId,
                isAdmin: this.isAdmin,
                keyword: this.keyword
            }

            $.ajax({
                url: URL_VOTE,
                dataType: 'jsonp',
                data: params,
                jsonp: 'callback',
                success: function(json){
                    if(json.status != 1) return

                    console.log(json);

                    self.selectType = json.data.voteInfo.selectType;
                    self.maxSelNum = json.data.voteInfo.maxSelNum;
                    self.isFinished = json.data.voteInfo.isFinished;
                    self.isVoted = json.data.resultInfo.isVoted;
                    self.voteOptions = json.data.resultInfo.voteOptions || '';
                    self.title = json.data.voteInfo.title;

                    //数据加载完成
                    if(!json.data.options.length){
                        self.loading = 0;
                        self.bottom = 1;
                        return
                    }

                    var options = json.data.options;
                    self.lastRowId = options[options.length - 1].rowId;
                    self.options = self.options.concat(options);
                    self.loading = 0;

                    //数据加载的条数少于一页，表示数据加载完成
                    if(options.length < self.pageRows){
                        self.bottom = 1;
                    }

                }
            })
        },

        onBottom () {
            //第一页都不够的话，直接不去加载
            if(this.options.length < this.pageRows || this.bottom){
                this.bottom = 1;
                return
            }

            if(!this.loading){
                this.getPage()
            }

            console.log('onBottom');
        },

        active (index) {
            if(this.isAdmin == 1) return

            var $list = $(this.$refs.voteItem);
            var $listActive = $('.vote-options-item.active');
            var $item = $(this.$refs.voteItem[index]);

            switch (this.selectType) {
                case '1':
                    if(!$item.hasClass('active')){
                        $list.removeClass('active')
                    }
                    $item.toggleClass('active')
                    break;
                case '2':
                    if($item.hasClass('active')){
                        $item.removeClass('active')
                    }else {
                        if($listActive.length == this.maxSelNum){
                            alert('最多可选'+ this.maxSelNum +'项')
                            return
                        }
                        $item.addClass('active')
                    }
                default:

            }

        },

        search (e) {
            this.keyword = e.target.value
        },

        hightlight (html) {
            var keyword = this.keyword
            var keywordRg = new RegExp(this.keyword, 'ig')
            return html.replace(keywordRg, `<span class='filter-hightlight'>${keyword}</span>`)
        },

        isHasVoted (id) {
            if(!this.voteOptions) return false
            var idx = $.inArray(parseInt(id), this.voteOptions);
            if(idx == -1) return false
            return true
        },

        vote () {
            if(this.isFinished == 1 || this.isVoted == 1) return

            var $listActive = $('.vote-options-item.active');

            if(!$listActive.length) return

            var optionIds = $listActive.map(function(item){
                return $(this).data('id')
            })

            optionIds = $.makeArray(optionIds);

            // URL_VOTE_HANDLE = 'http://dev.im-dangdang.com/ddweb/v1/vote';

            var params = {
                userId: this.userId,
                voteId: this.voteId,
                optionIds: JSON.stringify(optionIds)
            }

            $.ajax({
                url: URL_VOTE_HANDLE,
                dataType: 'jsonp',
                data: params,
                jsonp: 'callback',
                success: function(json){
                    if(json.status != 1) return
                    window.location.reload()
                }
            })
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
