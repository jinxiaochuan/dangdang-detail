function setupWebViewJavascriptBridge(callback) {
    var self = this;

    var u = window.navigator.userAgent;

    window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

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

module.exports = setupWebViewJavascriptBridge;
