var glob = require('glob');
var path = require('path');
var entry = require('./entry');
var config = require('./config.js').CONFIG_BUILD;
var HtmlWebpackPlugin = require('html-webpack-plugin');


var createHTMLPlugin = function () {
    var htmls = [];

    var entrys = entry();

    // 获取所有的 html
    var files = glob.sync('src/**/*.' + config.ext);

    files.forEach(function (file) {
        var file = path.parse(file);

        var chunks = [];
        var chunkName = config.staticRoot + '/' + file.dir + '/' + file.name;

        // 判断是否有同名的 entry
        var c = entrys[chunkName];
        c && chunks.push(chunkName);

        // layout 模板需要把 common 放进去
        if (file.name == config.serverLayoutName) {
            console.log(config.staticRoot);
            chunks.push(config.staticRoot + '/common');
        }

        var plugin = new HtmlWebpackPlugin({
            filename: config.templateRoot + '/' + file.dir + '/' + file.base,
            template: path.resolve(file.dir, file.base),
            chunks: chunks,
            inject: true
        });

        htmls.push(plugin);
    });

    // console.info('htmls', htmls);

    return htmls;
}

module.exports = createHTMLPlugin;
