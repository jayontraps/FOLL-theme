if(!function(j){var _={},F={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",nextIcon:'<svg class="icon-slides icon-keyboard-arrow-right"><use xlink:href="#icon-keyboard-arrow-right"></use>',prevText:"Prev",prevIcon:'<svg class="icon-slides icon-keyboard_arrow_left"><use xlink:href="#icon-keyboard_arrow_left"></use></svg>',nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};j.fn.bxSlider=function(e){if(0==this.length)return this;if(1<this.length)return this.each(function(){j(this).bxSlider(e)}),this;var d={},c=this;_.el=this;function n(){d.settings=j.extend({},F,e),d.settings.slideWidth=parseInt(d.settings.slideWidth),d.children=c.children(d.settings.slideSelector),d.children.length<d.settings.minSlides&&(d.settings.minSlides=d.children.length),d.children.length<d.settings.maxSlides&&(d.settings.maxSlides=d.children.length),d.settings.randomStart&&(d.settings.startSlide=Math.floor(Math.random()*d.children.length)),d.active={index:d.settings.startSlide},d.carousel=1<d.settings.minSlides||1<d.settings.maxSlides,d.carousel&&(d.settings.preloadImages="all"),d.minThreshold=d.settings.minSlides*d.settings.slideWidth+(d.settings.minSlides-1)*d.settings.slideMargin,d.maxThreshold=d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin,d.working=!1,d.controls={},d.interval=null,d.animProp="vertical"==d.settings.mode?"top":"left",d.usingCSS=d.settings.useCSS&&"fade"!=d.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return d.cssPrefix=e[i].replace("Perspective","").toLowerCase(),d.animProp="-"+d.cssPrefix+"-transform",!0;return!1}(),"vertical"==d.settings.mode&&(d.settings.maxSlides=d.settings.minSlides),c.data("origStyle",c.attr("style")),c.children(d.settings.slideSelector).each(function(){j(this).data("origStyle",j(this).attr("style"))}),r()}function t(){for(var t="",e=f(),i=0;i<e;i++){var n="";d.settings.buildPager&&j.isFunction(d.settings.buildPager)?(n=d.settings.buildPager(i),d.pagerEl.addClass("bx-custom-pager")):(n=i+1,d.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+i+'" class="bx-pager-link">'+n+"</a></div>"}d.pagerEl.html(t)}var s=j(window).width(),o=j(window).height(),r=function(){c.wrap('<div class="'+d.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),d.viewport=c.parent(),d.loader=j('<div class="bx-loading" />'),d.viewport.prepend(d.loader),c.css({width:"horizontal"==d.settings.mode?100*d.children.length+215+"%":"auto",position:"relative"}),d.usingCSS&&d.settings.easing?c.css("-"+d.cssPrefix+"-transition-timing-function",d.settings.easing):d.settings.easing||(d.settings.easing="swing");u();d.viewport.css({width:"100%",position:"relative"}),d.viewport.parent().css({maxWidth:h()}),d.settings.pager||d.viewport.parent().css({margin:"0 auto 0px"}),d.children.css({float:"horizontal"==d.settings.mode?"left":"none",listStyle:"none",position:"relative"}),d.children.css("width",g()),"horizontal"==d.settings.mode&&0<d.settings.slideMargin&&d.children.css("marginRight",d.settings.slideMargin),"vertical"==d.settings.mode&&0<d.settings.slideMargin&&d.children.css("marginBottom",d.settings.slideMargin),"fade"==d.settings.mode&&(d.children.css({position:"absolute",zIndex:0,display:"none"}),d.children.eq(d.settings.startSlide).css({zIndex:d.settings.slideZIndex,display:"block"})),d.controls.el=j('<div class="bx-controls" />'),d.settings.captions&&y(),d.active.last=d.settings.startSlide==f()-1,d.settings.video&&c.fitVids();var t=d.children.eq(d.settings.startSlide);"all"==d.settings.preloadImages&&(t=d.children),d.settings.ticker?d.settings.pager=!1:(d.settings.pager&&S(),d.settings.controls&&w(),d.settings.auto&&d.settings.autoControls&&b(),(d.settings.controls||d.settings.autoControls||d.settings.pager)&&d.viewport.after(d.controls.el)),a(t,l)},a=function(t,e){var i=t.find("img, iframe").length;if(0!=i){var n=0;t.find("img, iframe").each(function(){j(this).one("load",function(){++n==i&&e()}).each(function(){this.complete&&j(this).load()})})}else e()},l=function(){if(d.settings.infiniteLoop&&"fade"!=d.settings.mode&&!d.settings.ticker){var t="vertical"==d.settings.mode?d.settings.minSlides:d.settings.maxSlides,e=d.children.slice(0,t).clone().addClass("bx-clone"),i=d.children.slice(-t).clone().addClass("bx-clone");c.append(e).prepend(i)}d.loader.remove(),m(),"vertical"==d.settings.mode&&(d.settings.adaptiveHeight=!0),d.viewport.height(p()),c.redrawSlider(),d.settings.onSliderLoad(d.active.index),d.initialized=!0,d.settings.responsive&&j(window).bind("resize",H),d.settings.auto&&d.settings.autoStart&&(1<f()||d.settings.autoSlideForOnePage)&&M(),d.settings.ticker&&A(),d.settings.pager&&P(d.settings.startSlide),d.settings.controls&&z(),d.settings.touchEnabled&&!d.settings.ticker&&O()},p=function(){var e=0,t=j();if("vertical"==d.settings.mode||d.settings.adaptiveHeight)if(d.carousel){var n=1==d.settings.moveSlides?d.active.index:d.active.index*v();for(t=d.children.eq(n),i=1;i<=d.settings.maxSlides-1;i++)t=n+i>=d.children.length?t.add(d.children.eq(i-1)):t.add(d.children.eq(n+i))}else t=d.children.eq(d.active.index);else t=d.children;return"vertical"==d.settings.mode?(t.each(function(t){e+=j(this).outerHeight()}),0<d.settings.slideMargin&&(e+=d.settings.slideMargin*(d.settings.minSlides-1))):e=Math.max.apply(Math,t.map(function(){return j(this).outerHeight(!1)}).get()),"border-box"==d.viewport.css("box-sizing")?e+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))+parseFloat(d.viewport.css("border-top-width"))+parseFloat(d.viewport.css("border-bottom-width")):"padding-box"==d.viewport.css("box-sizing")&&(e+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))),e},h=function(){var t="100%";return 0<d.settings.slideWidth&&(t="horizontal"==d.settings.mode?d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin:d.settings.slideWidth),t},g=function(){var t=d.settings.slideWidth,e=d.viewport.width();return 0==d.settings.slideWidth||d.settings.slideWidth>e&&!d.carousel||"vertical"==d.settings.mode?t=e:1<d.settings.maxSlides&&"horizontal"==d.settings.mode&&(e>d.maxThreshold||e<d.minThreshold&&(t=(e-d.settings.slideMargin*(d.settings.minSlides-1))/d.settings.minSlides)),t},u=function(){var t=1;if("horizontal"==d.settings.mode&&0<d.settings.slideWidth)if(d.viewport.width()<d.minThreshold)t=d.settings.minSlides;else if(d.viewport.width()>d.maxThreshold)t=d.settings.maxSlides;else{var e=d.children.first().width()+d.settings.slideMargin;t=Math.floor((d.viewport.width()+d.settings.slideMargin)/e)}else"vertical"==d.settings.mode&&(t=d.settings.minSlides);return t},f=function(){var t=0;if(0<d.settings.moveSlides)if(d.settings.infiniteLoop)t=Math.ceil(d.children.length/v());else for(var e=0,i=0;e<d.children.length;)++t,e=i+u(),i+=d.settings.moveSlides<=u()?d.settings.moveSlides:u();else t=Math.ceil(d.children.length/u());return t},v=function(){return 0<d.settings.moveSlides&&d.settings.moveSlides<=u()?d.settings.moveSlides:u()},m=function(){if(d.children.length>d.settings.maxSlides&&d.active.last&&!d.settings.infiniteLoop){if("horizontal"==d.settings.mode){var t=d.children.last(),e=t.position();x(-(e.left-(d.viewport.width()-t.outerWidth())),"reset",0)}else if("vertical"==d.settings.mode){var i=d.children.length-d.settings.minSlides;e=d.children.eq(i).position();x(-e.top,"reset",0)}}else{e=d.children.eq(d.active.index*v()).position();d.active.index==f()-1&&(d.active.last=!0),null!=e&&("horizontal"==d.settings.mode?x(-e.left,"reset",0):"vertical"==d.settings.mode&&x(-e.top,"reset",0))}},x=function(t,e,i,n){if(d.usingCSS){var s="vertical"==d.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";c.css("-"+d.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(c.css(d.animProp,s),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?c.css(d.animProp,s):"ticker"==e&&(c.css("-"+d.cssPrefix+"-transition-timing-function","linear"),c.css(d.animProp,s),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),x(n.resetValue,"reset",0),q()}))}else{var o={};o[d.animProp]=t,"slide"==e?c.animate(o,i,d.settings.easing,function(){D()}):"reset"==e?c.css(d.animProp,t):"ticker"==e&&c.animate(o,speed,"linear",function(){x(n.resetValue,"reset",0),q()})}},S=function(){d.settings.pagerCustom?d.pagerEl=j(d.settings.pagerCustom):(d.pagerEl=j('<div class="bx-pager" />'),d.settings.pagerSelector?j(d.settings.pagerSelector).html(d.pagerEl):d.controls.el.addClass("bx-has-pager").append(d.pagerEl),t()),d.pagerEl.on("click","a",I)},w=function(){d.controls.next=j('<a class="bx-next" href="">'+d.settings.nextIcon+"</a>"),d.controls.prev=j('<a class="bx-prev" href="">'+d.settings.prevIcon+"</a>"),d.controls.next.bind("click",T),d.controls.prev.bind("click",C),d.settings.nextSelector&&j(d.settings.nextSelector).append(d.controls.next),d.settings.prevSelector&&j(d.settings.prevSelector).append(d.controls.prev),d.settings.nextSelector||d.settings.prevSelector||(d.controls.directionEl=j('<div class="bx-controls-direction" />'),d.controls.directionEl.append(d.controls.prev).append(d.controls.next),d.controls.el.addClass("bx-has-controls-direction").append(d.controls.directionEl))},b=function(){d.controls.start=j('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+d.settings.startText+"</a></div>"),d.controls.stop=j('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+d.settings.stopText+"</a></div>"),d.controls.autoEl=j('<div class="bx-controls-auto" />'),d.controls.autoEl.on("click",".bx-start",E),d.controls.autoEl.on("click",".bx-stop",k),d.settings.autoControlsCombine?d.controls.autoEl.append(d.controls.start):d.controls.autoEl.append(d.controls.start).append(d.controls.stop),d.settings.autoControlsSelector?j(d.settings.autoControlsSelector).html(d.controls.autoEl):d.controls.el.addClass("bx-has-controls-auto").append(d.controls.autoEl),$(d.settings.autoStart?"stop":"start")},y=function(){d.children.each(function(t){var e=j(this).find("img:first").attr("title");null!=e&&(""+e).length&&j(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},T=function(t){d.settings.auto&&c.stopAuto(),c.goToNextSlide(),t.preventDefault()},C=function(t){d.settings.auto&&c.stopAuto(),c.goToPrevSlide(),t.preventDefault()},E=function(t){c.startAuto(),t.preventDefault()},k=function(t){c.stopAuto(),t.preventDefault()},I=function(t){d.settings.auto&&c.stopAuto();var e=j(t.currentTarget);if(void 0!==e.attr("data-slide-index")){var i=parseInt(e.attr("data-slide-index"));i!=d.active.index&&c.goToSlide(i),t.preventDefault()}},P=function(i){var t=d.children.length;if("short"==d.settings.pagerType)return 1<d.settings.maxSlides&&(t=Math.ceil(d.children.length/d.settings.maxSlides)),void d.pagerEl.html(i+1+d.settings.pagerShortSeparator+t);d.pagerEl.find("a").removeClass("active"),d.pagerEl.each(function(t,e){j(e).find("a").eq(i).addClass("active")})},D=function(){if(d.settings.infiniteLoop){var t="";0==d.active.index?t=d.children.eq(0).position():d.active.index==f()-1&&d.carousel?t=d.children.eq((f()-1)*v()).position():d.active.index==d.children.length-1&&(t=d.children.eq(d.children.length-1).position()),t&&("horizontal"==d.settings.mode?x(-t.left,"reset",0):"vertical"==d.settings.mode&&x(-t.top,"reset",0))}d.working=!1,d.settings.onSlideAfter(d.children.eq(d.active.index),d.oldIndex,d.active.index)},$=function(t){d.settings.autoControlsCombine?d.controls.autoEl.html(d.controls[t]):(d.controls.autoEl.find("a").removeClass("active"),d.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},z=function(){1==f()?(d.controls.prev.addClass("disabled"),d.controls.next.addClass("disabled")):!d.settings.infiniteLoop&&d.settings.hideControlOnEnd&&(0==d.active.index?(d.controls.prev.addClass("disabled"),d.controls.next.removeClass("disabled")):d.active.index==f()-1?(d.controls.next.addClass("disabled"),d.controls.prev.removeClass("disabled")):(d.controls.prev.removeClass("disabled"),d.controls.next.removeClass("disabled")))},M=function(){if(0<d.settings.autoDelay)setTimeout(c.startAuto,d.settings.autoDelay);else c.startAuto();d.settings.autoHover&&c.hover(function(){d.interval&&(c.stopAuto(!0),d.autoPaused=!0)},function(){d.autoPaused&&(c.startAuto(!0),d.autoPaused=null)})},A=function(){var t=0;if("next"==d.settings.autoDirection)c.append(d.children.clone().addClass("bx-clone"));else{c.prepend(d.children.clone().addClass("bx-clone"));var e=d.children.first().position();t="horizontal"==d.settings.mode?-e.left:-e.top}x(t,"reset",0),d.settings.pager=!1,d.settings.controls=!1,d.settings.autoControls=!1,d.settings.tickerHover&&!d.usingCSS&&d.viewport.hover(function(){c.stop()},function(){var e=0;d.children.each(function(t){e+="horizontal"==d.settings.mode?j(this).outerWidth(!0):j(this).outerHeight(!0)});var t=d.settings.speed/e,i="horizontal"==d.settings.mode?"left":"top",n=t*(e-Math.abs(parseInt(c.css(i))));q(n)}),q()},q=function(t){speed=t||d.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==d.settings.autoDirection?e=c.find(".bx-clone").first().position():i=d.children.first().position();var n="horizontal"==d.settings.mode?-e.left:-e.top,s="horizontal"==d.settings.mode?-i.left:-i.top;x(n,"ticker",speed,{resetValue:s})},O=function(){d.touch={start:{x:0,y:0},end:{x:0,y:0}},d.viewport.bind("touchstart",N)},N=function(t){if(d.working)t.preventDefault();else{d.touch.originalPos=c.position();var e=t.originalEvent;d.touch.start.x=e.changedTouches[0].pageX,d.touch.start.y=e.changedTouches[0].pageY,d.viewport.bind("touchmove",W),d.viewport.bind("touchend",L)}},W=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-d.touch.start.x),n=Math.abs(e.changedTouches[0].pageY-d.touch.start.y);if((n<3*i&&d.settings.preventDefaultSwipeX||i<3*n&&d.settings.preventDefaultSwipeY)&&t.preventDefault(),"fade"!=d.settings.mode&&d.settings.oneToOneTouch){var s=0;if("horizontal"==d.settings.mode){var o=e.changedTouches[0].pageX-d.touch.start.x;s=d.touch.originalPos.left+o}else{o=e.changedTouches[0].pageY-d.touch.start.y;s=d.touch.originalPos.top+o}x(s,"reset",0)}},L=function(t){d.viewport.unbind("touchmove",W);var e=t.originalEvent,i=0;if(d.touch.end.x=e.changedTouches[0].pageX,d.touch.end.y=e.changedTouches[0].pageY,"fade"==d.settings.mode){(n=Math.abs(d.touch.start.x-d.touch.end.x))>=d.settings.swipeThreshold&&(d.touch.start.x>d.touch.end.x?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto())}else{var n=0;i="horizontal"==d.settings.mode?(n=d.touch.end.x-d.touch.start.x,d.touch.originalPos.left):(n=d.touch.end.y-d.touch.start.y,d.touch.originalPos.top),(d.settings.infiniteLoop||!(0==d.active.index&&0<n||d.active.last&&n<0))&&Math.abs(n)>=d.settings.swipeThreshold?(n<0?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto()):x(i,"reset",200)}d.viewport.unbind("touchend",L)},H=function(t){if(d.initialized){var e=j(window).width(),i=j(window).height();s==e&&o==i||(s=e,o=i,c.redrawSlider(),d.settings.onSliderResize.call(c,d.active.index))}};return c.goToSlide=function(t,e){if(!d.working&&d.active.index!=t)if(d.working=!0,d.oldIndex=d.active.index,t<0?d.active.index=f()-1:t>=f()?d.active.index=0:d.active.index=t,d.settings.onSlideBefore(d.children.eq(d.active.index),d.oldIndex,d.active.index),"next"==e?d.settings.onSlideNext(d.children.eq(d.active.index),d.oldIndex,d.active.index):"prev"==e&&d.settings.onSlidePrev(d.children.eq(d.active.index),d.oldIndex,d.active.index),d.active.last=d.active.index>=f()-1,d.settings.pager&&P(d.active.index),d.settings.controls&&z(),"fade"==d.settings.mode)d.settings.adaptiveHeight&&d.viewport.height()!=p()&&d.viewport.animate({height:p()},d.settings.adaptiveHeightSpeed),d.children.filter(":visible").fadeOut(d.settings.speed).css({zIndex:0}),d.children.eq(d.active.index).css("zIndex",d.settings.slideZIndex+1).fadeIn(d.settings.speed,function(){j(this).css("zIndex",d.settings.slideZIndex),D()});else{d.settings.adaptiveHeight&&d.viewport.height()!=p()&&d.viewport.animate({height:p()},d.settings.adaptiveHeightSpeed);var i=0,n={left:0,top:0};if(!d.settings.infiniteLoop&&d.carousel&&d.active.last)if("horizontal"==d.settings.mode){n=(o=d.children.eq(d.children.length-1)).position(),i=d.viewport.width()-o.outerWidth()}else{var s=d.children.length-d.settings.minSlides;n=d.children.eq(s).position()}else if(d.carousel&&d.active.last&&"prev"==e){var o,r=1==d.settings.moveSlides?d.settings.maxSlides-v():(f()-1)*v()-(d.children.length-d.settings.maxSlides);n=(o=c.children(".bx-clone").eq(r)).position()}else if("next"==e&&0==d.active.index)n=c.find("> .bx-clone").eq(d.settings.maxSlides).position(),d.active.last=!1;else if(0<=t){var a=t*v();n=d.children.eq(a).position()}if(void 0!==n){var l="horizontal"==d.settings.mode?-(n.left-i):-n.top;x(l,"slide",d.settings.speed)}}},c.goToNextSlide=function(){if(d.settings.infiniteLoop||!d.active.last){var t=parseInt(d.active.index)+1;c.goToSlide(t,"next")}},c.goToPrevSlide=function(){if(d.settings.infiniteLoop||0!=d.active.index){var t=parseInt(d.active.index)-1;c.goToSlide(t,"prev")}},c.startAuto=function(t){d.interval||(d.interval=setInterval(function(){"next"==d.settings.autoDirection?c.goToNextSlide():c.goToPrevSlide()},d.settings.pause),d.settings.autoControls&&1!=t&&$("stop"))},c.stopAuto=function(t){d.interval&&(clearInterval(d.interval),d.interval=null,d.settings.autoControls&&1!=t&&$("start"))},c.getCurrentSlide=function(){return d.active.index},c.getCurrentSlideElement=function(){return d.children.eq(d.active.index)},c.getSlideCount=function(){return d.children.length},c.redrawSlider=function(){d.children.add(c.find(".bx-clone")).width(g()),d.viewport.css("height",p()),d.settings.ticker||m(),d.active.last&&(d.active.index=f()-1),d.active.index>=f()&&(d.active.last=!0),d.settings.pager&&!d.settings.pagerCustom&&(t(),P(d.active.index))},c.destroySlider=function(){d.initialized&&(d.initialized=!1,j(".bx-clone",this).remove(),d.children.each(function(){null!=j(this).data("origStyle")?j(this).attr("style",j(this).data("origStyle")):j(this).removeAttr("style")}),null!=j(this).data("origStyle")?this.attr("style",j(this).data("origStyle")):j(this).removeAttr("style"),j(this).unwrap().unwrap(),d.controls.el&&d.controls.el.remove(),d.controls.next&&d.controls.next.remove(),d.controls.prev&&d.controls.prev.remove(),d.pagerEl&&d.settings.controls&&d.pagerEl.remove(),j(".bx-caption",this).remove(),d.controls.autoEl&&d.controls.autoEl.remove(),clearInterval(d.interval),d.settings.responsive&&j(window).unbind("resize",H))},c.reloadSlider=function(t){null!=t&&(e=t),c.destroySlider(),n()},n(),this}}(jQuery),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");function on_resize(t,e){return onresize=function(){clearTimeout(e),e=setTimeout(t,100)},t}!function(){"use strict";var t=jQuery.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1==t[0]&&9==t[1]&&t[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(),function(f){"use strict";function v(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)}v.VERSION="3.3.5",v.TRANSITION_DURATION=150,v.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},v.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=f(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&f(f.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var o=n[s];if("click"==o)this.$element.on("click."+this.type,this.options.selector,f.proxy(this.toggle,this));else if("manual"!=o){var r="hover"==o?"mouseenter":"focusin",a="hover"==o?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,f.proxy(this.enter,this)),this.$element.on(a+"."+this.type,this.options.selector,f.proxy(this.leave,this))}}this.options.selector?this._options=f.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},v.prototype.getDefaults=function(){return v.DEFAULTS},v.prototype.getOptions=function(t){return(t=f.extend({},this.getDefaults(),this.$element.data(),t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},v.prototype.getDelegateOptions=function(){var i={},n=this.getDefaults();return this._options&&f.each(this._options,function(t,e){n[t]!=e&&(i[t]=e)}),i},v.prototype.enter=function(t){var e=t instanceof this.constructor?t:f(t.currentTarget).data("bs."+this.type);return e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e)),t instanceof f.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState?void(e.hoverState="in"):(clearTimeout(e.timeout),e.hoverState="in",e.options.delay&&e.options.delay.show?void(e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)):e.show())},v.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},v.prototype.leave=function(t){var e=t instanceof this.constructor?t:f(t.currentTarget).data("bs."+this.type);return e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e)),t instanceof f.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),e.isInStateTrue()?void 0:(clearTimeout(e.timeout),e.hoverState="out",e.options.delay&&e.options.delay.hide?void(e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)):e.hide())},v.prototype.show=function(){var t=f.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=f.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,n=this.tip(),s=this.getUID(this.type);this.setContent(),n.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&n.addClass("fade");var o="function"==typeof this.options.placement?this.options.placement.call(this,n[0],this.$element[0]):this.options.placement,r=/\s?auto?\s?/i,a=r.test(o);a&&(o=o.replace(r,"")||"top"),n.detach().css({top:0,left:0,display:"block"}).addClass(o).data("bs."+this.type,this),this.options.container?n.appendTo(this.options.container):n.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),d=n[0].offsetWidth,c=n[0].offsetHeight;if(a){var p=o,h=this.getPosition(this.$viewport);o="bottom"==o&&l.bottom+c>h.bottom?"top":"top"==o&&l.top-c<h.top?"bottom":"right"==o&&l.right+d>h.width?"left":"left"==o&&l.left-d<h.left?"right":o,n.removeClass(p).addClass(o)}var g=this.getCalculatedOffset(o,l,d,c);this.applyPlacement(g,o);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};f.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",u).emulateTransitionEnd(v.TRANSITION_DURATION):u()}},v.prototype.applyPlacement=function(t,e){var i=this.tip(),n=i[0].offsetWidth,s=i[0].offsetHeight,o=parseInt(i.css("margin-top"),10),r=parseInt(i.css("margin-left"),10);isNaN(o)&&(o=0),isNaN(r)&&(r=0),t.top+=o,t.left+=r,f.offset.setOffset(i[0],f.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var a=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=s&&(t.top=t.top+s-l);var d=this.getViewportAdjustedDelta(e,t,a,l);d.left?t.left+=d.left:t.top+=d.top;var c=/top|bottom/.test(e),p=c?2*d.left-n+a:2*d.top-s+l,h=c?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][h],c)},v.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},v.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},v.prototype.hide=function(t){function e(){"in"!=i.hoverState&&n.detach(),i.$element.removeAttr("aria-describedby").trigger("hidden.bs."+i.type),t&&t()}var i=this,n=f(this.$tip),s=f.Event("hide.bs."+this.type);return this.$element.trigger(s),s.isDefaultPrevented()?void 0:(n.removeClass("in"),f.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",e).emulateTransitionEnd(v.TRANSITION_DURATION):e(),this.hoverState=null,this)},v.prototype.fixTitle=function(){var t=this.$element;!t.attr("title")&&"string"==typeof t.attr("data-original-title")||t.attr("data-original-title",t.attr("title")||"").attr("title","")},v.prototype.hasContent=function(){return this.getTitle()},v.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,n=e.getBoundingClientRect();null==n.width&&(n=f.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=i?{top:0,left:0}:t.offset(),o={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:f(window).width(),height:f(window).height()}:null;return f.extend({},n,o,r,s)},v.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},v.prototype.getViewportAdjustedDelta=function(t,e,i,n){var s={top:0,left:0};if(!this.$viewport)return s;var o=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-o-r.scroll,l=e.top+o-r.scroll+n;a<r.top?s.top=r.top-a:l>r.top+r.height&&(s.top=r.top+r.height-l)}else{var d=e.left-o,c=e.left+o+i;d<r.left?s.left=r.left-d:c>r.right&&(s.left=r.left+r.width-c)}return s},v.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},v.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},v.prototype.tip=function(){if(!this.$tip&&(this.$tip=f(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},v.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},v.prototype.enable=function(){this.enabled=!0},v.prototype.disable=function(){this.enabled=!1},v.prototype.toggleEnabled=function(){this.enabled=!this.enabled},v.prototype.toggle=function(t){var e=this;t&&((e=f(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},v.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null})};var t=f.fn.tooltip;f.fn.tooltip=function(n){return this.each(function(){var t=f(this),e=t.data("bs.tooltip"),i="object"==typeof n&&n;!e&&/destroy|hide/.test(n)||(e||t.data("bs.tooltip",e=new v(this,i)),"string"==typeof n&&e[n]())})},f.fn.tooltip.Constructor=v,f.fn.tooltip.noConflict=function(){return f.fn.tooltip=t,this}}(jQuery),function(s){"use strict";function o(t,e){this.init("popover",t,e)}if(!s.fn.tooltip)throw new Error("Popover requires tooltip.js");o.VERSION="3.3.5",o.DEFAULTS=s.extend({},s.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((o.prototype=s.extend({},s.fn.tooltip.Constructor.prototype)).constructor=o).prototype.getDefaults=function(){return o.DEFAULTS},o.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},o.prototype.hasContent=function(){return this.getTitle()||this.getContent()},o.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},o.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=s.fn.popover;s.fn.popover=function(n){return this.each(function(){var t=s(this),e=t.data("bs.popover"),i="object"==typeof n&&n;!e&&/destroy|hide/.test(n)||(e||t.data("bs.popover",e=new o(this,i)),"string"==typeof n&&e[n]())})},s.fn.popover.Constructor=o,s.fn.popover.noConflict=function(){return s.fn.popover=t,this}}(jQuery),function(t){t(document).ready(function(){t(".bxslider-home").bxSlider({pager:!1,mode:"fade",auto:!0,pause:6e3,speed:1e3,onSliderLoad:function(){t(".foll-slider").addClass("loaded")}}),t(function(){t('[data-toggle="popover"]').popover()})})}(jQuery),function(l){l(document).ready(function(){var t={refreshValue:function(){this.value=window.getComputedStyle(document.querySelector("body"),":before").getPropertyValue("content").replace(/'/g,"")}};l(window).resize(function(){t.refreshValue()}).resize();function e(){"tablet-portrait"===t.value||"tablet"===t.value?l(i).addClass("tablet-layout"):l(i).removeClass("tablet-layout")}var i=l(".panel");e(),on_resize(function(){e()});l(".menu-button-mb").on("click",function(){var t=l(this);t.find(".menu-top").toggleClass("menu-top-click"),t.find(".menu-middle").toggleClass("menu-middle-click"),t.find(".menu-bottom").toggleClass("menu-bottom-click"),l("body").removeClass("active-nav").toggleClass("active-sidebar"),l(".menu-button").removeClass("active-button")});var n=window.matchMedia("(min-width: 736px)");function s(){var t=l(".menu-top"),e=l(".menu-middle"),i=l(".menu-bottom");l("body").removeClass("active-sidebar"),t.removeClass("menu-top-click"),e.removeClass("menu-middle-click"),i.removeClass("menu-bottom-click")}function o(t){t.matches,s()}n.addListener(o),o(n);l(".interest-options").on("click",function(){var i=l(this).val()+", ";rcp_interests=l("#rcp_interests"),l(rcp_interests).val(function(t,e){return e.match(i)?e.replace(i,""):e+i})});var r=document.getElementById("giftaid-checkbox"),a=document.getElementById("rcp_giftaid");l(r).on("change",function(t){l(this).is(":checked")?l(a).val("Yes"):l(a).val("No")}),l(".app-icon").on("click",function(){"on"===l(this).attr("data-tip")?l(this).attr("data-tip","off"):l(this).attr("data-tip","on")})})}(jQuery),jQuery(document).ready(function(){});