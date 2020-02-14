/* 中文UTF-8 */

/*
框架效果，初始化绑定元素事件，不需要显式调用。
*/

$(document).ready(function(){
	$(".select-dropkick").dropkick();

	/***************************
	        顶部下拉菜单 
	***************************/
	$(".div-header:eq(0)").on("mouseover","li.dropdown",function(){
		$(this).addClass("open");
	});
	$(".div-header:eq(0)").on("mouseout","li.dropdown",function(){
		$(this).removeClass("open");
	});

	/***************************
	      左侧菜单收起|展开 
	***************************/
	$(".left-nav:eq(0)").on("click","h2",function(){
		var $group = $(this).parent();
		if ($group.hasClass("left-nav-group-closed"))
		{
			$group.removeClass("left-nav-group-closed");
			$group.find("ul").slideDown();
		}else{
			$group.addClass("left-nav-group-closed");
			$group.find("ul").slideUp();
		}
		setTimeout(leftNavOnScroll,210);
		setTimeout(leftNavOnScroll,500);
	});

	/***************************
	     左侧菜单悬浮判断 
	***************************/
	var $leftNav = $(".left-nav:eq(0)");
	var $leftSide = $(".div-leftside:eq(0)");
	var $rightSide = $(".div-rightside:eq(0)");
	var $window = $(window);
	var scollOffsetTop = $(".div-header").height() + $(".div-catalog").height();
	var divHeaderHeight = $(".div-header").height();
	$(document).on("scroll",leftNavOnScroll);

	function leftNavOnScroll(){

		if ($window.scrollTop() > divHeaderHeight){
			$leftSide.css("top",divHeaderHeight);
		}else{
			$leftSide.css("top",scollOffsetTop + 1 - $window.scrollTop());
		}

	}
	/*
	function leftNavOnScroll(){
		if ($leftNav.height() > $rightSide.height())
		{
			return;//左侧大于右侧，则什么都不做
		}else{
			if ($leftNav.height() < $window.height())
			{
				//左侧栏短于窗口，则固定
				if ($window.scrollTop() > 50)
				{
					$leftNav.addClass("left-nav-fixed-top");
				}else{
					$leftNav.removeClass("left-nav-fixed-top");
				}
				$leftNav.removeClass("left-nav-fixed-bottom");
			}else{
				//左侧栏高于窗口，则允许拖到底部，但底部固定
				console.log($leftNav.height() + ";" + $window.height());
				//console.log(($window.scrollTop()-scollOffsetTop) + ";" + $leftNav.height() + ";" + $window.height() + ";" + Math.abs($leftNav.height() - $window.height()));
				if (($window.scrollTop()-scollOffsetTop) > Math.abs($leftNav.height() - $window.height()))
				{
					$leftNav.addClass("left-nav-fixed-bottom");
				}else{
					$leftNav.removeClass("left-nav-fixed-bottom");
				}
				$leftNav.removeClass("left-nav-fixed-top");
			}
		}
	}
	 */

	$(window).on("resize",function(){
		//窗口大小改变，左侧栏重置
		$leftNav.removeClass("left-nav-fixed-top left-nav-fixed-bottom");
		leftNavOnScroll();
	});

	
	/***************************
	     tooltips 自动调用 
	***************************/
	$(".main-frame").on("mouseover",".toggle-tooltip",function(){
		var $this = $(this);
		$this.removeClass("toggle-tooltip");
		$this.tooltip({position: 'top'});
		$this.mouseover();
	});


	
	/***************************
	     tree-frame 布局调整
	***************************/
	var divCatalogHeight = $(".div-catalog:eq(0)").height(); //栏目头的高度
	var divHeaderHeight = $(".div-header:eq(0)").height(); //栏目头的高度
	$treeFrame = $(".tree-frame:eq(0)");
	if (1 == $treeFrame.length)
	{
		$(window).on("scroll",function(){
			var $window = $(window);
			var $scrollTop = $window.scrollTop();
			if ($window.scrollTop() < divCatalogHeight)
			{
				$treeFrame.css({top:(scollOffsetTop - $scrollTop) + "px"});
			}else{
				$treeFrame.css({top:(divHeaderHeight) + "px"});
			}
		});
	}
	
	/***************************
	         主题切换 
	***************************/

	$(".select-themes:eq(0)").on("click","ul li a",function(){
		var $body = $("body:eq(0)");
		var $this = $(this);
		$body.removeClass("body-theme-1 body-theme-2 body-theme-3 body-theme-4 body-theme-5 body-theme-6 body-theme-7 body-theme-8 body-theme-9 body-theme-10");
		$body.addClass($this.data("theme"));
		$(".select-themes:eq(0)").find("a").removeClass("active");
		$this.addClass("active");
	});
/*
	var $body = $("body:eq(0)");
	$body.removeClass("body-theme-1 body-theme-2 body-theme-3 body-theme-4 body-theme-5 body-theme-6 body-theme-7 body-theme-8 body-theme-9 body-theme-10");
	$body.addClass("body-theme-2");
	$(".select-themes:eq(0)").find("a").removeClass("active");
	$(".select-themes:eq(0)").find("a:eq(1)").addClass("active");*/



	/***************************
	 header-menu 滚动效果
	 ***************************/
	var $headerMenu = $(".header-menu:eq(0)");			//菜单 DIV 对象
	var $headerMenuUL = $headerMenu.find("ul:eq(0)");	//菜单 列表 对象
	var $headerMenuLeft = $headerMenu.find(".hm-left:eq(0)");	//左按钮
	var $headerMenuRight = $headerMenu.find(".hm-right:eq(0)");	//左按钮

	// 菜单总个数
	var headerMenu_LiCount = $headerMenuUL.find("li").length;
	// 每个菜单占宽
	var headerMenu_LiWidth = $headerMenuUL.find("li:eq(0)").width() + parseInt($headerMenuUL.find("li:eq(0)").css("margin-left"));
	// 整条菜单总宽
	var headerMenu_ULWidth = headerMenu_LiCount * headerMenu_LiWidth;
	// 菜单可见宽
	var headerWidth = 0;

	//初始计算状态
	function headerMenuInit(){
		//根据当前窗口大小，调整菜单可见宽度
		var winWidth = $(window).width();
		var maxWidth = winWidth - 300;
		for (var n = 1; n <= headerMenu_LiCount && headerWidth < maxWidth; n++){
			headerWidth = 10 + n * headerMenu_LiWidth;
		}
		if ((n > headerMenu_LiCount + 1) || (headerWidth > maxWidth)){
			headerWidth -= headerMenu_LiWidth;
		}

		$headerMenu.css("maxWidth",headerWidth + "px");

		$headerMenuUL.css("margin-left",0);

		//把当前选中项目移到第一个
		var $activeLink = $headerMenuUL.find("li a.active:eq(0)");
		var $activeLi = $activeLink.parent();
		var $activePos = $activeLi.index();

		for (var i = 0; i <= $activePos; i++){
			headerMenuNext();
		}

		/*

		$headerMenuLeft.hide();
		if (headerMenu_ULWidth > maxWidth){
			//$headerMenuLeft.show();
			$headerMenuRight.show();
		}else{
			//$headerMenuLeft.hide();
			$headerMenuRight.hide();
		}*/
	}

	function headerMenuCheckBtn(){
		var mLeft = parseInt($headerMenuUL.css("margin-left"));
		if ((headerMenu_ULWidth + mLeft) <= headerWidth){
			$headerMenuRight.hide();
		}else{
			$headerMenuRight.show();
		}
		if (mLeft < 0){
			$headerMenuLeft.show();
		}else{
			$headerMenuLeft.hide();
		}
	}

	function headerMenuNext(){
		var mLeft = parseInt($headerMenuUL.css("margin-left"));
		var ulW = headerMenu_ULWidth + mLeft;
		if (ulW > headerWidth){
			mLeft -= headerMenu_LiWidth;
			$headerMenuUL.css("margin-left",mLeft);
			$headerMenuLeft.show();
		}
		headerMenuCheckBtn();
	}

	function headerMenuPrev(){
		var mLeft = parseInt($headerMenuUL.css("margin-left"));
		if (mLeft < 0){
			mLeft += headerMenu_LiWidth;
			$headerMenuUL.css("margin-left",mLeft);
			$headerMenuRight.show();
		}
		headerMenuCheckBtn();
	}

	$headerMenuLeft.on("click",headerMenuPrev);
	$headerMenuRight.on("click",headerMenuNext);

	$(window).resize(headerMenuInit);
	headerMenuInit();

});






