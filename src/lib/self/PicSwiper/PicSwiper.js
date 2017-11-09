module.exports = function PicSwiper(options) {
  this.triggerClass = options.triggerClass || '';
  this.picArr = options.picArr || [];
  this.picCount = this.picArr.length;
  this.currentIndex = options.currentIndex || 1;
  this.isFirst = this.currentIndex == 0 ? true : false;
  this.isLast = this.currentIndex == (this.picCount - 1) ? true : false;

  this.$html = null;
  this.$body = null;
  this.$container = null;
  // create show template
  this.createTpl = function(){
    // this.removeTpl();
    var str = "<div class='pic-container'>";
         str += "<div class='pic-wrapper'>";
         str += "<ul class='pic-list'>";
         for(var i = 0; i < this.picCount; i++){
           str += "<li class='pic-item'>";
           str += "<img class='per-pic' src='" + this.picArr[i].pictureUrl + "'>";
           str += "</li>"
         }
         str += "</ul>";
         str += "</div><div class='pic-tip-container'>"+ this.currentIndex + "/" + this.picCount;
         str += "</div></div>";
         document.body.innerHTML = document.body.innerHTML + str;
  }

  this.addClass = function() {
    this.$html = document.getElementsByTagName('html')[0];
    this.$html.setAttribute('class','fixed-html');
    this.$body = document.body.setAttribute('class','fixed-body');
  }

  this.removeClass = function() {
    this.$html = document.getElementsByTagName('html')[0];
    this.$html.setAttribute('class',this.$html.getAttribute('class').replace('fixed-html',''));
    this.$body = document.body.setAttribute('class',document.body.getAttribute('class').replace('fixed-body',''));
  }

  this.itemShow = function (i) {
    var picItems = document.querySelectorAll('.pic-item');
    picItems.forEach(function(item, index){
      var cls = item.getAttribute('class');
      if(index == i){
        if(!cls.includes('active')){
          item.setAttribute('class', cls + ' active');
        }
      }else{
        item.setAttribute('class',cls.replace('active',''))
      }
    });
  }

  this.toggle = function () {
    var container = document.querySelector('.pic-container');
    var cls = container.getAttribute('class');
    this.addClass();
    if(!cls.includes('active')){
      container.setAttribute('class',cls + ' active');
    }else{
      container.setAttribute('class',cls.replace('active',''));
    }
  }

  // this.removeTpl = function() {
  //   var container = document.querySelectorAll('.pic-container');
  //   container.length && document.body.removeChild(container[0]);
  // }

  this.addEvents = function(){
    var self = this;
    var picItems = document.querySelectorAll('.pic-item');
    var triggerList = document.querySelectorAll(self.triggerClass);

    triggerList.forEach(function(item, index){
      item.addEventListener('click',function(e){
        self.currentIndex = index;
        self.itemShow(self.currentIndex);
        document.body.querySelector('.pic-tip-container').innerHTML = (self.currentIndex + 1) + '/' + self.picCount;
        self.toggle();
      })
    })

    picItems.forEach(function(item, index){
      item.addEventListener('click',function(e){
        self.toggle();
        self.removeClass();
      });
    });

  }

  this.init = function(){
    this.createTpl();
    this.addEvents();
  }

}
