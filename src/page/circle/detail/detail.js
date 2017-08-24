// require('lib/third/photoswipe/dist/photoswipe.css');
// require('lib/third/photoswipe/dist/default-skin/default-skin.css');
// var PhotoSwipe = require('lib/third/photoswipe/dist/photoswipe.js');
// var PhotoSwipeUI_Default = require('lib/third/photoswipe/dist/photoswipe-ui-default.js');
require('page/common/common.js');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS = require('./tmpls/news.tpl');

var TPL_ACTIVITY = require('./tmpls/activity.tpl');

var TPL_COOPERATE = require('./tmpls/cooperate.tpl');

var Empty = require('page/components/empty/empty.js');

var TPL_MAP = {
    '1':TPL_NEWS,
    '2':TPL_ACTIVITY,
    "3":TPL_COOPERATE
}

var CircleDetail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    initBridge: function(){
        var self = this;

        self.initInfo();

        /*这段代码是固定的，必须要放到js中*/
        function setupWebViewJavascriptBridge(callback) {

          if(window.isIOS){
            if (window.WebViewJavascriptBridge) {
              return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
              return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
              document.documentElement.removeChild(WVJBIframe)
            }, 0)
          }else{
            if(window.WebViewJavascriptBridge){
              callback(WebViewJavascriptBridge);
            }else{
              document.addEventListener('WebViewJavascriptBridgeReady',function(){
                callback(WebViewJavascriptBridge);
              },false)
            }
          }

        }

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {

                });
            }

            bridge.registerHandler('increaseCommment', function(data, responseCallback) {
                self.$container.find('.comment-num').text(++self.commentCount);
            })

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').text('沟通');
            })

            self.$container.delegate('.tap-avatar','click',function(){

                bridge.callHandler('tapUserImage',self.logoInfo,function(){})

            })

            self.$container.delegate('.tap-sign','click',function(){

                bridge.callHandler('tapAppliedUserList')

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

        })


    },

    initInfo: function(){
        var self = this;

        self.baseInfo = {
            "userId":self.data.webShowInfo.userId,
            "targetId":self.data.articleInfo.articleId,
            "articleId":self.data.articleInfo.articleId,
            "type":self.data.articleInfo.articleType,
            "circleId":self.data.circleInfo.circleId,
            "circleName":self.data.circleInfo.circleName,
            "memberType":self.data.circleInfo.memberType,
            "showAccess":self.data.articleInfo.showAccess,
            "isCanComment":self.data.articleInfo.isCanComment,
            "activityIsCanSignUp":self.data.articleInfo.activityInfo?self.data.articleInfo.activityInfo.isCanSignUp:null,
            "coopIsCanSignUp":self.data.articleInfo.coopInfo?self.data.articleInfo.coopInfo.isCanSignUp:null,
            "location":self.data.articleInfo.location,
            "latitude":self.data.articleInfo.latitude,
            "longitude":self.data.articleInfo.longitude,
            "pictureUrl":self.data.circleInfo.circleLogo.pictureUrl,
            "articleTitle":self.data.articleInfo.articleTitle
        }

        self.logoInfo = {
            "imgUrl":self.data.circleInfo.circleLogo
        }


    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1130&isAdminIdentity=1';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1178&isAdminIdentity=1';
        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1265&isAdminIdentity=1';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';
        var data = {},isAdminIdentity;

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');
        isAdminIdentity  = jsmod.util.url.getParam(HREF_ORIGIN,'isAdminIdentity');
        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.commentCount = json.data.webShowInfo.commentCount;
                    var html = swig.render(TPL_MAP[json.data.articleInfo.articleType],{locals:{data:$.extend(json.data,{'isAdminIdentity':isAdminIdentity})}});
                    self.$container.html(html);
                    // self.initAvatar();
                    // self.initPhotoSwipe();
                    self.deviceDetect();
                    self.initBridge();
                    return;
                }

                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);

            }

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

    },

    initAvatar: function(){
        var width_avatar = this.$container.find('.tap-avatar').width();
        jsmod.util.stretchImg($('.avatar')[0],width_avatar,width_avatar,true,false);
    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    },


})

new CircleDetail();
