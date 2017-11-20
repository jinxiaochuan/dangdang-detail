
var getParamStr = function(url) {
    if (!url) {
        return;
    }
    var urlParts = url.split("?");
    var pathname = urlParts[0];
    var urlParamString = url.substring(pathname.length + 1, url.length);
    return urlParamString;
}

var getParams = function(url) {
    var params = [];
    var urlParamString = getParamStr(url);
    if (!urlParamString) {
        return params;
    }
    params = urlParamString.split("&");
    return params;
}

var getParamMap = function(url) {
    var map = {};
    var params = getParams(url);
    $.each(params, function(index, val) {
        var kvs = val.split("=");
        var paramName = kvs[0];
        var value = val.substring(paramName.length + 1, val.length);
        map[paramName] = value;
    });
    return map;
}

var getParam = function(url, key) {
    var map = getParamMap(url);
    return map[key];
}

var delParam = function(url, key){
    var map = getParamMap(url);
    if(!map.hasOwnProperty(key)) return;
    delete map[key];
    return map;
}

var getSplitValue = function (index) {
    var pathname = window.location.pathname;

    var splits = pathname.split("/");

    return splits[index + 1];
}

var addParam = function(url, paramStr) {
    if (getParamStr(url)) {
        url = url + "&" + paramStr;
    } else {
        url = url + "?" + paramStr;
    }
    return url;
}

var deleParam = function(url, key) {
    var map = delParam(url, key);
    if(!map) return url;

    var urlParts = url.split("?");
    var pathname = urlParts[0];

    var mapLen = Object.getOwnPropertyNames(map).length;
    if(!mapLen) return pathname;

    var arr = [];
    $.each(map, function(key, val){
        arr.push(key + '=' + val)
    })
    return pathname + '?' + arr.join('&')
}

module.exports = {
    getParamMap: getParamMap,
    addParam: addParam,
    delParam: delParam,
    deleParam: deleParam,
    getParam: getParam,
    getParamStr:getParamStr,
    getSplitValue: getSplitValue
}
