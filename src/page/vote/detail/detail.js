import Vue from 'vue';

import vueTips from 'vue-tips'

Vue.use(vueTips)

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

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
            voteOptions: '',
            multiOptions: [],
            bridge: '',
            voteFrequency: "",
            sortType:"",
            res:[],
            source:'',
            screenHeight: document.body.clientHeight,
            originHeight: document.body.clientHeight,
            isOriginHei: true
        }
    },
    watch: {
        keyword: function(val, oldVal){
            this.lastRowId = 0,
            this.options = [];
            this.bottom = 0;
            this.getPage()
        },

        screenHeight: function(val, oldVal){
            this.isOriginHei = this.originHeight == val
        }
    },

    methods: {
        init () {
            var data = {};

            var queryStr = jsmod.util.url.getParam;
            this.userId = queryStr(HREF_ORIGIN, 'userId');
            this.voteId = queryStr(HREF_ORIGIN, 'voteId');
            this.isAdmin = queryStr(HREF_ORIGIN, 'isAdmin') || 0;
            this.source = queryStr(HREF_ORIGIN, 'source');
            this.initTitle();
            this.getPage()
        },

        initTitle () {
            document.title = this.isAdmin == 1 ? '投票详情' : '投票'
        },

        clear () {
            this.keyword = '';
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

                    self.selectType = json.data.voteInfo.selectType;
                    self.maxSelNum = json.data.voteInfo.maxSelNum;
                    self.isFinished = json.data.voteInfo.isFinished;
                    self.isVoted = json.data.resultInfo.isVoted;
                    self.voteOptions = json.data.resultInfo.voteOptions || '';
                    self.title = json.data.voteInfo.title;
                    self.voteFrequency = json.data.voteInfo.voteFrequency;
                    self.sortType = json.data.voteInfo.sortType;

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


                    //如果选择降序排列 排序判断投票数的多少 并且把值付给self.options
                    // if (self.sortType == "1") {
                    //     self.res = json.data.options;
                    //     for (var i = 0; i < self.res.length-1; i++) {
                    //         for (var j = 0; j < self.res.length-i-1; j++) {
                    //             if (self.res[j].userNum < self.res[j + 1].userNum) {
                    //                 var temp = self.res[j]
                    //                 self.res[j] = self.res[j + 1]
                    //                 self.res[j + 1] = temp
                    //             }
                    //         }
                    //     }
                    //     // self.options = self.res;
                    //     var options = self.res;
                    //     self.lastRowId = options[options.length - 1].rowId;
                    //     self.options = self.options.concat(options);
                    //     self.loading = 0;
                    // }

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

        },

        multiOptionAdd (index) {
            this.multiOptions.unshift(this.options[index])
        },

        isActive (id) {
            var filter = this.multiOptions.filter(function(item){
                return item.id == id
            })

            return filter.length != 0
        },

        multiOptionDel (id) {
            var self = this;

            this.multiOptions = this.multiOptions.filter(function(item){
            //选取multiOption中item.id和要被删的id不同的项存入multiOption，也就是删除指定项
                return item.id != id
            })

            //删除多选项的同时 把下面枚举排列选项的active样式去除
            this.options.forEach(function(item, index){
                if(item.id == id){
                    $(self.$refs.voteItem[index]).removeClass('active')
                    return false
                }
            })

        },

        active (index, id) {
            if(this.isAdmin == 1 || this.isFinished == 1 || this.isVoted == 1 || this.source == 1) return

            var $list = $(this.$refs.voteItem);
            var $item = $(this.$refs.voteItem[index]);

            switch (this.selectType) {
                // 单选
                case '1':
                // 如果点击的项没有被选中的样式，那么清空所有项的样式，然后再toggle样式
                    if(!$item.hasClass('active')){
                        $list.removeClass('active')
                    }
                    $item.toggleClass('active')
                    break;
                case '2':
                    if($item.hasClass('active')){
                        //为什么删除的时候用的是id 而不是index?
                        this.multiOptionDel(id);
                    }else {
                        if(this.multiOptions.length == this.maxSelNum){
                            this.$tips.show('最多可选'+ this.maxSelNum +'项', {
                                delay: 1000
                            })
                            return
                        }
                        this.multiOptionAdd(index);
                    }
                default:

            }

        },

        search (e) {
            this.keyword = e.target.value
        },

        hightlight (html) {
            var keyword = this.keyword;
            if(!keyword) return html
            var keywordRg = new RegExp(this.keyword, 'ig');
            return html.replace(keywordRg, `<span class='filter-hightlight'>${keyword}</span>`)
        },

        isHasVoted (id) {
            //如果是还未投票状态 直接返回false
            if(!this.voteOptions) return false
            //parseInt() 函数可解析一个字符串，并返回一个整数
            //$.inArray() 函数用于在数组中查找指定值，并返回它的索引值（如果没有找到，则返回-1）
            //判断该项是不是被投票的项
            var idx = $.inArray(parseInt(id), this.voteOptions);
            //如果不是直接返回false
            if(idx == -1) return false
            return true
        },

        pictureZoom (index) {
            var pictures = this.options[index].pictures;
            this.bridge && this.bridge.callHandler('pictureZoom', pictures, function(){})
        },

        videoZoom (index) {
            var video = this.options[index].video;
            this.bridge && this.bridge.callHandler('videoZoom', video, function(){})
        },

        vote () {
            if(this.isFinished == 1){
                this.$tips.show('投票已结束', {
                    delay: 1000
                });
                return
            }

            if(this.isVoted == 1){
                this.$tips.show('你已投票', {
                    delay: 1000
                });
                return
            }


            var optionIds;

            if(this.selectType == 1){
                var $listActive = $('.vote-options-item.active');

                if(!$listActive.length){
                    this.$tips.show('至少选择一项', {
                        delay: 1000
                    });
                    return
                }

                optionIds = $listActive.map(function(item){
                    return $(this).data('id')
                })
            }

            if(this.selectType == 2){
                if(!this.multiOptions.length){
                    this.$tips.show('至少选择一项', {
                        delay: 1000
                    });
                    return
                }

                //js的map方法，做映射
                optionIds = this.multiOptions.map(function(item){
                    return parseInt(item.id)
                })

            }

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

                    if(this.isFinished == 1){
                        this.$tips.show('投票已结束', {
                            delay: 1000
                        });
                        return
                    }

                }
            })
        },

        initBridge () {
            var vm = this;
            setupWebViewJavascriptBridge(function(bridge){
                vm.bridge = bridge;
                if(!window.isIOS){
                    bridge.init(function(message, responseCallback) {});
                }
                bridge.callHandler('baseInfo',baseInfo,function(){})
            })
        },

        initResizeListener () {
            var vm = this;
            window.onresize = function(){
                window.screenHeight= document.body.clientHeight
                vm.screenHeight= window.screenHeight
            }
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
            this.initResizeListener();
            this.initBridge()
        })
    }

})
