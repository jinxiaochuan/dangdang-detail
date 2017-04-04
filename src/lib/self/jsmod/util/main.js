
var script = $("script[src*='jsmod.js']"),
    config, template, reg;

if (script.length > 0) {
    reg = /(^|&|\\?|#)config=([^&#]*)/

    // 两个可以进行设置config的的地方，希望后续删除此逻辑
    try {
        config = reg.exec(script.prop("src"))[2];
    } catch(e) {
        config = undefined;
    }
}

if (window.__jsmodConfig) {
    config = window.__jsmodConfig;
}

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
var cache = {};

template = function (str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };


module.exports = {
    version: "1.0.0",
    config: config,
    template: template,
    ie6: /msie 6/i.test(navigator.userAgent)
}
