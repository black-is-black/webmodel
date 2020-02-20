
var base=new function(){
	var o={};
	return o={
		data:{
			"navBool":true,
			"navTimeout":null
		},
		/*wapBtn*/
		wapBtn:function(){;
			if(this.data.navBool){
				var h=parseInt($(document).height())-parseInt($("#header").css("height"));
				$(".navBg").show();
				$("#header .nav").css("height",h+"px").show();
				$("#header .nav").animate({
					"right":"0px"	
				},500);
				this.data.navBool=false;
			}else{
				$(".navBg").hide();
				$("#header .nav").animate({
					"right":"-200px"	
				},500);
				this.data.navBool=true;
			}
		},
		/*urlhref*/
		urlhref:function(data){
			data.time=data.time||500;
			var top=parseInt($(data.element).offset().top);
			var headerTop=parseInt($(".header").css("height"));
			top=top-headerTop;
			$('html,body').animate({scrollTop:top},data.time);		 
		},
		/*animateClassAdd  */
		anClasAdd:function(e,keyframes,stime,dtime,an,status){
			//animation:mContentIn .8s  ease-in-out 0s  both;
			var status=status||"both",
				an=an||"ease-in-out";
			$(e).css({
				"animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
				"-moz-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
				"-webkit-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
				"-o-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status
			});
		},
		/*cutString*/
		cutString:function(str, len) {
			if(str.length*2 <= len) {return str;}
			var strlen = 0;var s = "";
			for(var i = 0;i < str.length; i++) {
				s = s + str.charAt(i);
				if (str.charCodeAt(i) > 128) {
					strlen = strlen + 2;
					if(strlen >= len){
						return s.substring(0,s.length-1) + "...";
					}
				} else {
					strlen = strlen + 1;
					if(strlen >= len){
						return s.substring(0,s.length-2) + "...";
					}
				}
			}
			return s;
		},
		/*bool img status*/
		imgLoad:function(img, callback) {
			var timer = setInterval(function() {
				if (img.complete) {
					callback(img)
					clearInterval(timer)
				}
			}, 50)
		},
		/*auto height*/
		tableHeightBool:function(parent,child){
			$(parent).find(child).css("height","auto");
			$(parent).each(function(index, element) {
				var maxheight=$(parent+":eq("+index+")").find(child+":eq(0)").height();
				$(parent+":eq("+index+")").find(child).each(function(index1, element1) {
					if($(parent+":eq("+index+")").find(child+":eq("+index1+")").height()>maxheight)
						maxheight=$(parent+":eq("+index+")").find(child+":eq("+index1+")").height();
				});
				$(parent+":eq("+index+")").find(child).css("height",maxheight+"px");
			});
		},
		/*bg change*/
		bgFunc:function(e,style){
			var screenW=$(document).width();
			$(e).each(function(index, element) {
				if(screenW<1024){
					if($(element).attr("data-bg-wap")){
						var src=$(element).attr("data-bg-wap");
						if(style=="img")
							$(element).attr({"src":src});	
						else
							$(element).css({"background-image":"url("+src+")"});	
					}
				}else{
					if($(element).attr("data-bg-pc")){
						var src=$(element).attr("data-bg-pc");
						if(style=="img")
							$(element).attr({"src":src});	
						else
							$(element).css({"background-image":"url("+src+")"});	
					}
				}
				
			});
		}
	};	
}


$(function(){
	var navIndex=$("#header .nav li").index($("#header .nav li.on"));
	navTopAn(navIndex);
	$("#header .nav li").unbind("click").bind("mouseover",function(){
		navIndex=$("#header .nav li").index($(this));
		navTopAn(navIndex);
		
	}).bind("mouseleave",function(){
		var navIndex=$("#header .nav li").index($("#header .nav li.on"));
		navTopAn(navIndex);
	});
	
	/*生成loading效果*/
	var loadI=0;
	setInterval(function(){
		loadI++;
		if(loadI>=20)loadI=0
		var a=-loadI*64;
		$(".loading").css({
			"background-position":a+"px 0px"
		});
	},60);
});

/*nav top*/
function navTopAn(index){
	
	var navW=$(".nav li.on").width();
	$(".nav .navTop").css({
		"width":navW,
		"display":"block",
		"left":navW*index
	});
	 
	
}
var ssss =parseInt($(document).height())-parseInt($('#header').height()); 

// 导航
$('#header .wapBtn').click(function(event) {
	$(this).addClass('current');
	$('#header .nav').animate({"right":"0"}, 300);
	$('.bigBox00').stop().show();
	$('body').animate({"left":"-200px"},300);
	$('#header .nav').height(ssss);
});

$('.bigBox00').click(function(event) {
	$(this).stop().hide();
	$('#header .wapBtn').removeClass('current');
	$('#header .nav').animate({"right":"-210px"}, 300);
	$('body').animate({"left":"0"},300)
});
// 导航 结束

// logo
$('#header .nav .logo').hover(function() {
	$('.nav .navTop').addClass('hide');
}, function() {
	$('.nav .navTop').removeClass('hide');
});
// search

$('#header .nav .login .search .yuan').click(function(event) {
    $(this).parent().toggleClass('s');
});
