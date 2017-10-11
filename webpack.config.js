require('shelljs/global')

var webpack=require('webpack');

var path=require('path');

var SmartyScript = require('./build/smarty.js');

var ExtractTextPlugin=require('extract-text-webpack-plugin');

var CommonsChunkPlugin=require('webpack/lib/optimize/CommonsChunkPlugin');

var conf = require('./build/config.js');

var entry = require('./build/entry.js');

var html = require('./build/html.js');

var loader = require('./build/loader.js');

var NAMESPACE='web_detail';

// 设置配置数据
conf.setConf({
    ext: 'html',
    //env: option.env,
    templateRoot: 'ddweb/template/' + NAMESPACE,
    staticRoot: 'ddweb/static/' + NAMESPACE,
    serverLayoutName: 'common'
});

console.info('新的发布开始了！！！\n-----------------\n');

// 删除上次的构建
rm('-rf', conf.CONFIG_BUILD.path);

var entrys = entry();

var webpackPlugins = [];

var bannerPlugin = new webpack.BannerPlugin('This file is created by xiaochuan throught plugin-BannerPlugin !!!');

webpackPlugins.push(bannerPlugin);

var htmlPlugin = html();

webpackPlugins = webpackPlugins.concat(htmlPlugin);

webpackPlugins.push(
  new SmartyScript()
)

// 生成各种 loader
var cssExtract = new ExtractTextPlugin('[name]_[contenthash].css');
var loaders = loader(cssExtract);
webpackPlugins.push(cssExtract);

var webpackLoaders=[];

webpackLoaders=webpackLoaders.concat(loaders);

var AppLoaders=[{
    test:/swig\.min\.js/i,
    loader:'exports?window.swig'
}];

webpackLoaders = webpackLoaders.concat(AppLoaders);

// webpackPlugins.push(
//    new CommonsChunkPlugin({
//        name:conf.CONFIG_BUILD.staticRoot+'/common',
//        minChunks:5
//    })
// );

// webpackPlugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//             drop_console: true
//       }
//     })
// )

webpackPlugins.push(
    new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:'jquery',
        swig: path.join(conf.CONFIG_BUILD.src,'/lib/third/swig.min.js'),
        swiper: path.join(conf.CONFIG_BUILD.src, '/lib/third/swiper.jquery.min.js')
    })
);

console.info('plugins:', webpackPlugins);

module.exports={
    entry:entrys,
    output:{
        path:conf.CONFIG_BUILD.path,
        filename:'[name]_[chunkhash].js',
        publicPath:'/'
    },
    resolve:{
      alias:{
          assets:path.resolve(conf.CONFIG_BUILD.src,'assets'),
          lib:path.resolve(conf.CONFIG_BUILD.src,'lib'),
          page:path.resolve(conf.CONFIG_BUILD.src,'page')
      }
    },
    module:{
        loaders:webpackLoaders
    },
    plugins:webpackPlugins
}
