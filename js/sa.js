(function($){
    $.fn.header = (function(){
    	$(document).on('scroll',function(){
    		var offset = $('main').offset();
    		var headerHeight = $('header').height();
    		var scrollTop = $(window).scrollTop();
    		if((offset.top-headerHeight) < scrollTop){
    			$('header').addClass('scroll-fixed');
    		}else{
    			$('header').removeClass('scroll-fixed');
    		}
    	});
    });

    $(document).ready(function(){
        $('main').header();
    });
})(jQuery);
/*
*　カルーセル
*/
(function($){
	var defaults = {
	  count:5400,
	  speed:400,
	  easing:'swing'
	}
	var setting,width,length,interval,index = 0,flag = true;
    var methods = {
      init:function(option){
      	setting = $.extend({},defaults,option);
      	var li = $(this).children('ul').children('li');
      	width = $(this).width();
      	length = li.length;
      	$(this).children('ul').css({'width':width*length});
      	li.css({'width':width});
      	for(var i = 0;i < length;i++){
      	  $('.carousel-index').children('ul').append('<li></li>');
      	}
      	$('.carousel-index').find('li').first().addClass('active')
      	$(document).on('click','[data-carousel]',methods.slideCtrl);
      	$(document).on('click','.carousel-index > ul > li',methods.slideJump);
      	methods.autoSlide();
      },
      autoSlide:function(){
      	interval = setInterval(function(){
      	  index += 1;
      	  methods.slide();
      	},setting.count);
      },
      slideJump:function(){
      	var num = $('.carousel-index').find('li').index(this);
      	if(flag){
      	  flag = false;
      	  clearInterval(interval);
      	  index = num;
      	  methods.slide();
      	  methods.autoSlide();
        }else{
          return false;
        }
      },
      slide:function(){
      	  if(index >= length){
      	    index = 0;
      	  }else if(index < 0){
      	    index = length-1;
      	  }
      	  $('.carousel-index').find('li').removeClass('active');
      	  $('.carousel-index').find('li').eq(index).addClass('active')
      	  $('.carousel').children('ul').stop().animate({'right':width*index},setting.speed,setting.easing,function(){
      	  	setTimeout(function(){
      		  flag = true;
      	  	},500);
      	  });
      },
      slideCtrl:function(){
      	if(flag){
      	  flag = false;
      	  clearInterval(interval);
      	  var action = $(this).data('carousel');
      	  index = eval('methods.'+action+'();');
      	  methods.slide();
      	  methods.autoSlide();
        }else{
          return false;
        }
      },
      next:function(){
      	index += 1;
      	return index;
      },
      preview:function(){
      	index -= 1;
      	return index;
      }
    };

    $.fn.carousel = function(method){
      if(methods[method]){
        return methods[method].apply( this, Array.prototype.slice.call(arguments,1));
      }else if( typeof method === 'object' || ! method ) {
        return methods.init.apply(this,arguments);
      }
  　};

    $(document).ready(function(){
      $('.carousel').carousel();
    });
})(jQuery);
/*
*　カラーミースライダー
*/
(function($){
	var defaults = {
	  count:5400,
	  speed:400,
	  easing:'swing'
	}
	var setting,width,length,interval,index = 0,flag = true;
    var methods = {
      init:function(option){
      	var $this = $(this);
      	setting = $.extend({},defaults,option);
      	width = $this.width();
      	length = $this.children('div').length;
      	$this.css({'width':width*length});
      	$this.children('div').css({'width':width});
      	$this.find('img').each(function(){
      	  var src = $(this).attr('src');
      	  var title = $(this).attr('title');
      	  $(this).parent('a').css({'background-image':'url('+src+')'});
      	  if(title != ''){
      	    $(this).parent('a').append('<div class="slider-caption"><h1>'+title+'</h1></div>');
      	  }
      	});
      	$this.parent('.slider-wrapper').append('<div class="glyphicon glyphicon-chevron-left slider-arrow slider-arrow-left" data-carousel="preview"></div><div class="glyphicon glyphicon-chevron-right slider-arrow slider-arrow-right" data-carousel="next"></div><div class="slider-index"><ul></ul></div>');
      	for(var i = 0;i < length;i++){
      	  $('.slider-index').children('ul').append('<li></li>');
      	}
      	$('.slider-index').children('ul').children('li').eq(index).addClass('active');
      	methods.autoSlide();
      	$(document).on('click','[data-carousel]',methods.slideCtrl);
      	$(document).on('click','.slider-index > ul > li',methods.slideJump);
      },
      autoSlide:function(){
      	interval = setInterval(function(){
      	  index += 1;
      	  methods.slide();
      	},setting.count);
      },
      slideJump:function(){
      	var num = $('.slider-index').find('li').index(this);
      	if(flag){
      	  flag = false;
      	  clearInterval(interval);
      	  index = num;
      	  methods.slide();
      	  methods.autoSlide();
        }else{
          return false;
        }
      },
      slide:function(){
      	  if(index >= length){
      	    index = 0;
      	  }else if(index < 0){
      	    index = length-1;
      	  }
      	  $('.slider-index').find('li').removeClass('active');
      	  $('.slider-index').find('li').eq(index).addClass('active')
      	  $('#slider').stop().animate({'right':width*index},setting.speed,setting.easing,function(){
      	  	setTimeout(function(){
      		  flag = true;
      	  	},500);
      	  });
      },
      slideCtrl:function(){
      	if(flag){
      	  flag = false;
      	  clearInterval(interval);
      	  var action = $(this).data('carousel');
      	  index = eval('methods.'+action+'();');
      	  methods.slide();
      	  methods.autoSlide();
        }else{
          return false;
        }
      },
      next:function(){
      	index += 1;
      	return index;
      },
      preview:function(){
      	index -= 1;
      	return index;
      }
    };

    $.fn.colormeSlider = function(method){
      if(methods[method]){
        return methods[method].apply( this, Array.prototype.slice.call(arguments,1));
      }else if( typeof method === 'object' || ! method ) {
        return methods.init.apply(this,arguments);
      }
  　};

    $(document).ready(function(){
      $('#slider').colormeSlider();
    });
})(jQuery);