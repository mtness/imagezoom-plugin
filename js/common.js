/*
*　カラーミースライダー
*/
(function($){
	var defaults = {
	  count:5400,
	  speed:400,
	  easing:'swing',
	  slideIndex:true,
	  autoSlide:true,
	  prev:'<div class="glyphicon glyphicon-chevron-left slider-arrow slider-arrow-left" data-slider="preview"></div>',
	  next:'<div class="glyphicon glyphicon-chevron-right slider-arrow slider-arrow-right" data-slider="next"></div>',
	}

	var $this,$div,setting,width,length,firstClone,lastClone,basePosition,interval,sliderIndex = 0,index = 0,flag = true;
    var methods = {
      init:function(option){
      	$this = $(this),
      	$div = $this.children('div'),
      	setting = $.extend({},defaults,option),
      	width = $div.width(),
      	length = $div.length,
      	sliderWidth = $this.width(),
      	basePosition = ((sliderWidth-width)/2)-(width*length);
      	$this.wrap('<div class="slider-wrapper"></div>');
      	$this.css({'width':width*(length*3),'right':-basePosition});
      	$this.find('img').each(function(){
      	  var src = $(this).attr('src');
      	  var title = $(this).attr('title');
      	  $(this).parent('a').css({'background-image':'url('+src+')'});
      	  if(title != ''){
      	  	$(this).parent().append('<div class="slider-caption"><h1>'+title+'</h1></div>');
      	  }
      	});
      	
      	firstClone = $div.clone();
      	lastClone = $div.clone();
      	$this.append(firstClone);
      	$this.prepend(lastClone);

      	$this.parent().append(setting.prev+setting.next);

      	if(setting.slideIndex == true){
      		$this.parent().append('<div class="slider-index"><ul></ul></div>');
      	    for(var i = 0;i < length;i++){
      	      $('.slider-index').children('ul').append('<li></li>');
      	    }
      	    $('.slider-index').children('ul').children('li').eq(index).addClass('active');
      	}

      	$(document).on('click','[data-slider]',methods.slideCtrl);
      	$(document).on('click','.slider-index > ul > li',methods.slideJump);
      	if(setting.autoSlide == true){
      	    methods.autoSlide();
      	}
      },
      autoSlide:function(){
      	interval = setInterval(function(){
      	  index += 1;
      	  sliderIndex += 1;
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

      	  if(sliderIndex > length-1){
      	  	sliderIndex = 0;
      	    $this.css({right:-(basePosition+width)});
      	  }else if(sliderIndex < 0){
      	    sliderIndex = length-1;
      	    $this.css({right:-(basePosition-(width*length))});
      	  }

      	  if(setting.slideIndex == true){
      	    $('.slider-index').find('li').removeClass('active');
      	    $('.slider-index').find('li').eq(index).addClass('active');
      	  }
      	  methods.slidePosition();
      },
      slidePosition:function(){
      	  $this.stop().animate({'right':(width*sliderIndex)-basePosition},
      	  	setting.speed,
      	  	setting.easing,
      	  	function(){
      	  	  setTimeout(function(){
      		    flag = true;
      	  	  },500);
      	    }
      	  );
      },
      slideCtrl:function(){
      	if(flag){
      	  flag = false;
      	  clearInterval(interval);
      	  var action = $(this).data('slider');
      	  index = eval('methods.'+action+'();');
      	  methods.slide();
      	  if(setting.autoSlide == true){
      	    methods.autoSlide();
      	  }
        }else{
          return false;
        }
      },
      next:function(){
      	index += 1;
      	sliderIndex += 1;
      	return index;
      },
      preview:function(){
      	index -= 1;
      	sliderIndex -= 1;
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



$(function(){
	$('#loopslider').each(function(){
		var loopsliderWidth = $(this).width();
		var loopsliderHeight = $(this).height();
		$(this).children('ul').wrapAll('<div id="loopslider_wrap"></div>');

		var listWidth = $('#loopslider_wrap').children('ul').children('li').width();
		var listCount = $('#loopslider_wrap').children('ul').children('li').length;

		var loopWidth = (listWidth)*(listCount);

		$('#loopslider_wrap').css({
			top: '0',
			left: '0',
			width: ((loopWidth) * 2),
			height: (loopsliderHeight),
			overflow: 'hidden',
			position: 'absolute'
		});

		$('#loopslider_wrap ul').css({
			width: (loopWidth)
		});
		loopsliderPosition();

		function loopsliderPosition(){
			$('#loopslider_wrap').css({left:'0'});
			$('#loopslider_wrap').stop().animate({left:'-' + (loopWidth) + 'px'},25000,'linear');
			setTimeout(function(){
				loopsliderPosition();
			},25000);
		};

		$('#loopslider_wrap ul').clone().appendTo('#loopslider_wrap');
	});
});
