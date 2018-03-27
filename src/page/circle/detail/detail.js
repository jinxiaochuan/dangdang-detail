// require('lib/third/photoswipe/dist/photoswipe.css');
// require('lib/third/photoswipe/dist/default-skin/default-skin.css');
// var PhotoSwipe = require('lib/third/photoswipe/dist/photoswipe.js');
// var PhotoSwipeUI_Default = require('lib/third/photoswipe/dist/photoswipe-ui-default.js');
require('page/common/common.js');

require('./detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var AudioHandler = require('lib/self/audioHandler.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS = require('./tmpls/news.tpl');

var TPL_ACTIVITY = require('./tmpls/activity.tpl');

var TPL_COOPERATE = require('./tmpls/cooperate.tpl');

var TPL_LIVE = require('./tmpls/live.tpl');

var Empty = require('page/components/empty/empty.js');

var TPL_MAP = {
    '1': TPL_NEWS,
    '2': TPL_ACTIVITY,
    '3': TPL_COOPERATE,
    '4': TPL_LIVE
}

var CircleDetail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circleArticleDetail?articleId=3357&userId=200072&shareType=17&shareId=3307&shareUserId=200072&isAdminIdentity=1';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circleArticleDetail?articleId=3496&userId=200073&shareType=17&shareId=3307&shareUserId=200073';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';

        var data = {}, isAdminIdentity, supportHb, source;

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');
        isAdminIdentity  = jsmod.util.url.getParam(HREF_ORIGIN,'isAdminIdentity');
        supportHb = jsmod.util.url.getParam(HREF_ORIGIN,'supportHb');
        source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
        if(supportHb){
            data.supportHb = supportHb
        }
        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.initTitle();
                    self.commentCount = json.data.webShowInfo.commentCount;
                    self.render(json.data, isAdminIdentity, supportHb, source);
                    var MonitorRQT = +new Date; //数据请求到服务器数据时间点
                    var MonitorFST = MonitorRQT - MonitorST; //首屏时间（页面出现可见元素内容）
                    console.log('头部资源加载时间: ' + MonitorHT + 'ms');
                    console.log('首屏时间: ' + MonitorFST + 'ms');
                    return;
                }

                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);

            },
            error: function(error,errorType,errorMsg){
                var html = new Empty({
                    word: errorMsg,
                }).render();

                self.$container.html(html);
            }

        })


    },

    initTitle: function(){
        document.title = this.data.circleInfo.circleName;
    },

    render: function(data, isAdminIdentity, supportHb, source){

        data.articleInfo.detail = trans(data.articleInfo.detail);
        if((data.articleInfo.articleType == '2') && (data.articleInfo.activityInfo.review)){
            data.articleInfo.activityInfo.review = trans(data.articleInfo.activityInfo.review);
        }
        if((data.articleInfo.articleType == '3') && (data.articleInfo.coopInfo.review)){
            data.articleInfo.coopInfo.review = trans(data.articleInfo.coopInfo.review);
        }
        var html = swig.render(TPL_MAP[data.articleInfo.articleType],{
            locals:{
                data: $.extend(data, {'isAdminIdentity': isAdminIdentity, 'supportHb': supportHb, 'source': source})
            }
        });

        this.$container.html(html);

        this.$container.find('.detail-content').delegate('a','click',function(e){
            e.preventDefault();
        })

        this.initEnlarge();

        this.initShare();

        this.initBridge();

        this.initAudioHandler();

    },

    initAudioHandler: function(){
        var self = this;
        new AudioHandler({
            playcallback: function(){
                self.bridge.callHandler('beginAudio');
                var $video = $('body').find('video');
                $video.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            },
            pausecallback: function(){
                self.bridge.callHandler('pauseAudio');
            },
            endedcallback: function(){
                self.bridge.callHandler('completeAudio')
            }
        });
    },

    initShare: function(){
        share();
    },

    initEnlarge: function(){
        var self = this;

        this.$imgList = this.$container.find('.common-detail-wrap .detail-content img,.circle-news-detail .detail-content img');
        var imgList = $.map($.makeArray(self.$imgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        this.$reviewImgList = this.$container.find('.common-review-wrap .review-content img');
        var reviewImgList = $.map($.makeArray(self.$reviewImgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        imgList = imgList.concat(reviewImgList);

        this.baseInfo = {
            "userId": this.data.webShowInfo.userId,
            "adminId" : this.data.circleInfo.userId,
            "adminName" : this.data.circleInfo.userName,
            "adminPictureUrl" : this.data.circleInfo.userImage && this.data.circleInfo.userImage.pictureUrl,
            "targetId": this.data.articleInfo.articleId,
            "articleId": this.data.articleInfo.articleId,
            "type": this.data.articleInfo.articleType,
            "circleId": this.data.circleInfo.circleId,
            "circleName": this.data.circleInfo.circleName,
            "pictureUrl": this.data.circleInfo.circleLogo.pictureUrl,
            "memberType": this.data.circleInfo.memberType,
            "showAccess": this.data.articleInfo.showAccess,
            "closeComment": this.data.articleInfo.closeComment,
            "isCanComment": this.data.articleInfo.isCanComment,
            "activityIsCanSignUp": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.isCanSignUp : null,
            "coopIsCanSignUp": this.data.articleInfo.coopInfo ? this.data.articleInfo.coopInfo.isCanSignUp : null,
            "location": this.data.articleInfo.location,
            "latitude": this.data.articleInfo.latitude,
            "longitude": this.data.articleInfo.longitude,
            "articleTitle": this.data.articleInfo.articleTitle,
            "auditType": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.auditType : null,
            "needCharge": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.needCharge : null,
            "chargeName": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeName : null,
            "chargeAmount": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeAmount : null,
            "chargeDesc": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeDesc : null,
            "needInfo": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.needInfo : null,
            "signupRule": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.signupRule : null,
            "imgList": imgList,
            "hbInfo": this.data.articleInfo.hbInfo,
            "liveInfo": this.data.articleInfo.liveInfo
        }

        this.logoInfo = {
            "imgUrl": this.data.circleInfo.circleLogo
        }
    },

    initBridge: function(){
        var self = this;

        setupWebViewJavascriptBridge(function(bridge){

            if(!bridge) return

            self.bridge = bridge;

            bridge.callHandler('baseInfo', self.baseInfo, function() {})

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {});
            }

            bridge.registerHandler('increaseCommment', function(data, responseCallback) {
                self.$container.find('.comment-num').text(++self.commentCount);
            })

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('留言');
            })

            bridge.registerHandler('redEnvelopeStatus', function(data, responseCallback) {
                window.location.reload()
            })

            bridge.registerHandler('videoPause', function(data, responseCallback){
                var $video = $('body').find('video');
                $video.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            })

            bridge.registerHandler('audioPause', function(data, responseCallback){
                var $audio = $('body').find('audio');
                $audio.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            })

            bridge.registerHandler('liveStatusChange', function(data, responseCallback){
                switch (data) {
                    case '1':

                        break;
                    case '2':
                        $('.live-cellphone-wrap').removeClass('init finish').addClass('suspend')
                        break;
                    case '3':
                        $('.live-cellphone-wrap').removeClass('init suspend').addClass('finish')
                        break;
                    default:

                }
            })

            self.$container.delegate('.tap-avatar','click',function(){
                bridge.callHandler('tapUserImage',self.logoInfo,function(){})
            })

            self.$container.delegate('.tap-sign','click',function(){
                bridge.callHandler('tapAppliedUserList')
            })

            self.$container.delegate('.tap-donate','click',function(){
                bridge.callHandler('tapDonateList')
            })

            self.$container.delegate('.donate-btn','click',function(){
                bridge.callHandler('donate')
            })

            self.$container.delegate('.sign-btn','click',function(){
                bridge.callHandler('apply')
            })

            self.$container.delegate('.edit-btn','click',function(){
                bridge.callHandler('edit')
            })

            self.$container.delegate('.communicate-btn','click',function(){
                bridge.callHandler('doChat')
            })

            self.$container.delegate('.show-access','click',function(){
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.comment-wrap','click',function(){
                bridge.callHandler('doComment')
            })

            self.$container.delegate('.tap-location','click',function(){
                bridge.callHandler('tapPlace')
            })

            self.$container.delegate('.common-detail-wrap .detail-content img,.circle-news-detail .detail-content img', 'click', function(){
                var index = $.makeArray(self.$imgList).indexOf($(this).get(0));
                bridge.callHandler('tapEnlarge', index, function(){})
            })

            self.$container.delegate('.common-review-wrap .review-content img', 'click', function(){
                var index = $.makeArray(self.$reviewImgList).indexOf($(this).get(0)) + self.$imgList.length;
                bridge.callHandler('tapEnlarge', index, function(){})
            })

            self.$container.find('.detail-content video,.review-content video').on('play',function(e){
                bridge.callHandler('beginVideo');
                var $audio = $('body').find('audio');
                $audio.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            })

            self.$container.find('.detail-content video,.review-content video').on('pause',function(e){
                bridge.callHandler('pauseVideo')
            })

            self.$container.find('.detail-content video,.review-content video').on('ended',function(e){
                bridge.callHandler('completeVideo')
            })

            self.$container.find('.detail-content audio,.review-content audio').on('play',function(e){
                bridge.callHandler('beginAudio');
                var $video = $('body').find('video');
                $video.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            })

            self.$container.find('.detail-content audio,.review-content audio').on('pause',function(e){
                bridge.callHandler('pauseAudio')
            })

            self.$container.find('.detail-content audio,.review-content audio').on('ended',function(e){
                bridge.callHandler('completeAudio')
            })

            self.$container.delegate('.circle-red-envelope', 'click', function(){
                bridge.callHandler('redEnvelope')
            })

            self.$container.delegate('.live-btn', 'click', function(){
                bridge.callHandler('liveEnter')
            })

            self.$container.delegate('.continue-live-btn', 'click', function(){
                bridge.callHandler('liveContinue')
            })

            self.$container.delegate('.circle-live-wrapper', 'click', function(){
                bridge.callHandler('goLive')
            })

            self.$container.delegate('.live-agree', ' click', function(){
                bridge.callHandler('liveAgree')
            })

        })

    },

    initPhotoSwipe: function(){

        var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes
                if(figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if(figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if(!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) {
                    continue;
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }



            if(index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if(pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {
                // isClickableElement: function(){
                //     return true
                // },
                tapToClose:true,
                tapToToggleControls:true,
                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }

            };

            // PhotoSwipe opened from URL
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll( gallerySelector );

        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
        };

        // execute above function
        initPhotoSwipeFromDOM('.my-gallery');

    }

})

new CircleDetail();
