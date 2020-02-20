/*
*	by dong
*	http://www.dydong.com 
*/
function change(){
	
	var o={};
	return o={
		data:{
			"lastindex":0, //上一个序号，默认为0
			"index":0, //当前序号，默认为0
			"mun":0, //数量总数
			"todo_bool":false, //是否正在切换
			
			"autoplay":false, //是否开启自动切换
			"autoplay_time":3000, //自动切换时间差
			"autoplay_interval":"", //自动切换计时器
			"autoplay_settimeout":null,//暂停计时器
			"autoplay_settimeout_time":3000,//暂停时间

			"btn_function":"",//切换事件方法
			"btn_parent":"", //切换按钮父类对象
			"btn_select":"on", //切换按钮选中按钮的CLASS
			"btn_html":'<div class="child"></div>', //切换按钮HTML
			
			"element_move":"", //移动的父类框
			"element_parent":"", //最大父类框
			"element":"", //最小的对象
			
			"position_style":"order", //order 顺序 loop 循环  no 不定位只隐藏
			"position_width":null, //定位的宽度
			
			"touch":false

		},
		init:function(data){
			//赛选初始化数据
			$.each(data,function(i,n){
				o.data[i]=data[i];
			});
			//确定数量
			if(!this.data["mun"])this.data["mun"]=$(this.data["element"]).length-1;
	
			//确定宽度
			if(!this.data["position_width"])this.data["position_width"]=$(this.data["element"]).width();
			//判读是否启动切换
			if(this.data["autoplay"])this.autoplay();
			//定点
			this.position();
			
			if(this.data["touch"])if(!!this.touch) this.events.slider.addEventListener('touchstart',this.events,false);
			
		},
		//清除切换
		remove:function(){
			$(this.data["element_move"]).css({
				"position":"relative","height":"auto"
			});
			$(this.data["element"]).css({
				"position":"relative","height":"auto","left":"inherit","right":"inherit","top":"inherit","bottom":"inherit"
			}).show();
			clearInterval(this.data["autoplay_interval"]);
			clearTimeout(this.data["autoplay_settimeout"]);
		},
		//定点
		position:function(){
			//移动内容定点
			if(this.data["position_style"]=="no"){
				$(this.data["element"]).hide().css({"z-index":'1'});;
				$(this.data["element"]+":eq("+this.data["index"]+")").show().css({"z-index":'2'});
			}else if(this.data["position_style"]=="loop"){
				var h=$(this.data["element"]+":eq("+this.data["index"]+")").height();
				$(this.data["element_move"]).css({"height":h+"px"});
				$(this.data["element"]).css({"left":-this.data["position_width"]+"px"});
				$(this.data["element"]+":eq("+this.data["index"]+")").css({"left":"0px"});
			}else if(this.data["position_style"]=="order"){
				$.each($(this.data["element"]),function(i,n){
					$(n).css({"left":i*o.data["position_width"]+"px"});
				});
				$(this.data["element_move"]).css({"left":this.data["index"]*this.data["position_width"]+"px"});
			}
			//按钮定位
			if(this.data["btn_function"]){this.btn_position();}
			
		},
		//按钮初始化
		btn_position:function(){
			for(var i=0;i<=this.data["mun"];i++){
				$(this.data["btn_parent"]).append(this.data["btn_html"]);
				$(this.data["btn_parent"]).children().eq(i).attr("onclick",this.data["btn_function"]+".todo({'index':"+i+"})");
			}
			$(this.data["btn_parent"]).children().eq(this.data["index"]).addClass(this.data["btn_select"]);
		},
		//按钮切换
		btn_todo:function(data){
			var index=!isNaN(data["index"])?data["index"]:this.data["index"];
			
			$(this.data["btn_parent"]).children().removeClass(this.data["btn_select"]);
			$(this.data["btn_parent"]).children().eq(index).addClass(this.data["btn_select"]);
		},
		//重置定时器
		autoplay:function(){
			clearInterval(this.data["autoplay_interval"]);
			clearTimeout(this.data["autoplay_settimeout"]);
			
			this.data["autoplay_settimeout"]=setTimeout(function(o){
				o.data["autoplay_interval"]=setInterval(function(o){o.todo(o);},o.data["autoplay_time"],o);
			},this.data["autoplay_settimeout_time"],this);
		},

		//切换
		todo:function(data){
			//如果序号相似则不执行
			if(!isNaN(data["index"]))if(this.data["index"]==data["index"])return false;
			//判断是否传入配置
			if(data["data"])this.data=data["data"];
			//判断是否正在切换
			if(this.data["todo_bool"]){return false;}else{this.data["todo_bool"]=true;}
			//设置上一个切换的序号
			if((!isNaN(data["index"])||data["direc"])&&this.data["autoplay"])this.autoplay();
			
			this.data["lastindex"]=this.data["index"];
			
			//判断当前序号
			if(!isNaN(data["index"])){this.data["index"]=data["index"]}else{
				if(data["direc"]=="-"){
					if(this.data["autoplay"])this.autoplay();
					this.data["index"]==0?this.data["index"]=this.data["mun"]:this.data["index"]--;
				}else if(data["direc"]=="+"){
					if(this.data["autoplay"])this.autoplay();
					this.data["index"]==this.data["mun"]?this.data["index"]=0:this.data["index"]++;
				}else{
					this.data["index"]==this.data["mun"]?this.data["index"]=0:this.data["index"]++;
				}
			}
			if(this.data["position_style"]=="no"){
				$(this.data["element"]+":eq("+this.data["lastindex"]+")").stop(false,true).delay(3000).fadeOut(6000).css({"z-index":'1'});
				$(this.data["element"]+":eq("+this.data["index"]+")").stop(false,true).css({"z-index":'2'}).fadeIn(6000,function(){o.data["todo_bool"]=false;});
			}else if(this.data["position_style"]=="loop"){
				var direc=-1;
				if(data["direc"]=="-")direc=1;
				
				var h=$(this.data["element"]+":eq("+this.data["index"]+")").height();
				$(this.data["element_move"]).css({"height":h+"px"});
				
				$(this.data["element"]+":eq("+this.data["lastindex"]+")").stop(false,true).animate({"left":direc*this.data["position_width"]+"px"},500);
				$(this.data["element"]+":eq("+this.data["index"]+")").stop(false,true).css({"left":-direc*this.data["position_width"]+"px"}).animate({"left":"0px"},500,function(){o.data["todo_bool"]=false;});
			}else if(this.data["position_style"]=="order"){
				$(this.data["element_move"]).stop(false,true).animate({"left":-this.data["index"]*this.data["position_width"]+"px"},500,function(){o.data["todo_bool"]=false;});
			}

			//按钮选中切换
			if(this.data["btn_function"]){ this.btn_todo({});}
			return true;
		},
		
		
		
		
		//判断设备是否支持touch事件
 		touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
 
	 	//事件
	 	events:{
	  		slider:document,
	  		handleEvent:function(event){
	   			if(event.type == 'touchstart'){
					this.start(event);
				}else if(event.type == 'touchmove'){
					this.move(event);
				}else if(event.type == 'touchend'){
					this.end(event);
				}
			},
	  
			//滑动开始
			start:function(event){
				//touches数组对象获得屏幕上所有的touch，取第一个touch
				var touch = event.targetTouches[0];
				//取第一个touch的坐标值
				startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};
				
				//这个参数判断是垂直滚动还是水平滚动		
				isScrolling = 0;
				this.slider.addEventListener('touchmove',this,false);
				this.slider.addEventListener('touchend',this,false);
			},
	  
			//移动
			move:function(event){
				//当屏幕有多个touch或者页面被缩放过，就不执行move操作
				if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
				var touch = event.targetTouches[0];
				endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
				
				//isScrolling为1时，表示纵向滑动，0为横向滑动
				isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
				if(isScrolling === 1){
				//阻止触摸事件的默认行为，即阻止滚屏
				
				//event.preventDefault();
				}else{
					event.preventDefault();
				}
			},
	  
			//滑动释放
			end:function(event){
				//滑动的持续时间
				
				var duration = +new Date - startPos.time;
				var i = 0;
				if(Number(duration) > 0){
				if(isScrolling === 1){
					//判断是上移还是下移，当偏移量大于10时执行
					if(endPos.y < -10){
						i = 1;
					}else if(endPos.y > 10){
						i = 3;
					}
				}else if(isScrolling === 0){
					//判断是左移还是右移，当偏移量大于10时执行
					if(endPos.x > 10){
						i = 2;
					}else if(endPos.x < -10){
						i = 4;
					}
				}
				this.callback(i);
				startPos = endPos = null;
				return false;
				}
	   			
				//解绑事件
				this.slider.removeEventListener('touchmove',this,false);
				this.slider.removeEventListener('touchend',this,false);
			},
	  
			//要执行函数
			callback:function(direction){
			   //上右下左1234
			   switch(direction){
					//case 1:o.scrollFunc({wheelDelta:-1});break;
					case 2:o.todo({"direc":"-"});break;
					//case 2:alert(123);break;
					//case 3:o.scrollFunc({wheelDelta:1});break;
					case 4:o.todo({"direc":"+"});break;
					default:break;
			   };
			}
		},
		
	}
	
}