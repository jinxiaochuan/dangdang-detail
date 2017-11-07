require('page/common/common.js');

require('./test.less');
var jsmod = require('lib/self/jsmod/jsmod_extend.js');


const TPL_TEST = require('./tpl/test.tpl');
var url = "http://dev.im-dangdang.com/ddweb/v1/square/detail?userId=200119&squareId=1319";
var Test = jsmod.util.klass({
  initialize:function(){
    var self = this;
    $.ajax({
        url:url,
        dataType:'jsonp',
        jsonp:'callback',
        success: function(json){
            if(json.status == 1){
                console.log(json);
                self.data = json.data;
                self.render(json.data);
                return;
            }

        }
    })
  },
  render:function(data){
    var html = swig.render(TPL_TEST,{
      locals:{
        data:data
      }
    });

    $('.content-wrapper').html(html)
  }
});

new Test()
