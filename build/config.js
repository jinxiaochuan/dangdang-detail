var path = require('path');

var CONFIG_BUILD = {
    ext: 'ejs',
    path: 'dist',
    src: path.resolve(__dirname,'../src'),
    templateRoot: 'templates', // 定义模板的输出路径
    staticRoot: 'static', // 定义静态文件的输出路径
    serverLayoutName: 'base' //后台模板的layout名称，用于放置 common chunk
}

var setConf = function(option){
    Object.assign(CONFIG_BUILD,option)
};

module.exports = {
    CONFIG_BUILD:CONFIG_BUILD,
    setConf:setConf
}
