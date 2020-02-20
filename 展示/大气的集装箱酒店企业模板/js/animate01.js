$(function(){
   $('.head').hover(function() {
       $('.head .anniu').fadeIn(500);
   }, function() {
       $('.head .anniu').fadeOut(500);
   }); 
    // 鼠标移上盒子的时候才触发事件
     $('.head .box_big li').eq(0).css({'zIndex':3});
     $('.head .box_big li').each(function(index, el) {
         $(this).mousemove(function(e) {
        $('.head .box_big li .handle,.head .box_big li .boxG').show();
        // 注意这里的数学关系
        var myX = e.pageX - $(this).offset().left - $('.head .box_big li .handle').width()/2;
        var myY = e.pageY - $(this).offset().top - $('.head .box_big li .handle').height()/2;
        
        // 约束左上
        // if(myX<0){myX=0;}
        // if(myY<0){myY=0;}
        // 约束右下
        // if( myX > $(this).width()-$('.head .box_big li .handle').width() ){
        //     myX = $(this).width()-$('.head .box_big li .handle').width()    
        // }
        // if( myY > $(this).height()-$('.head .box_big li .handle').height() ){
        //     myY = $(this).height()-$('.head .box_big li .handle').height()  
        // }
        // 打印测试数据
        //console.log(myX,myY)
        // 小盒子移动
        $('.head .box_big li .handle').css({ left:myX , top:myY });
        // 大图移动
        // 大图和小图的倍数关系
        var beishu = 1400/350;       
        $('.head .box_big li .boxG img').css({ 
            marginLeft: -myX * beishu ,
            marginTop: -myY *  beishu 
        })
    }).mouseleave(function(){
        $('.head .box_big li .handle,.head .box_big li .boxG').hide();
    })
     });
    
    
    
    
})
var data="";
//data={'time':'20000'};
function datas(ss){
    data=ss;
    //alert(data['time']);
}

$(function(){
            //alert(data['time']);
            if(!data['time']){
              data['time']=5000;  
            }
            var showNum= 3;
            var smallNum = 2;
            var Nums = 1;
            var speed = data['time'];
            //复制对应的
            var  clineU=$('.pic_box').clone();
            $('.head .box_litle').append(clineU);
            //给第一个on
           $('.head .box_litle li').eq(0).addClass('on');
            var num=0;
            var time=null;
            var bigL= $('.head .box_big li').length;

            // 定义大图切换
            var bigSlect=function(index){
                $('.head .box_big li').eq(index).fadeIn(500)
                 .siblings().fadeOut(500);                
            };
            function litleSlect(numS){
               $('.head .box_litle li').eq(numS).addClass('on')
                .siblings().removeClass('on');
            }

            //点击缩略图
            $('.head .box_litle').on('click', 'li',function(){
                    var index=$(this).index();
                    $(this).addClass('on')
                           .siblings().removeClass('on');
                    bigSlect(index);
                    num=index;
                }
            )

            //定时器
            var timeF=function(){
                if( 0 <= num){
                    num++;
                    litleSlect(num);
                    bigSlect(num);
                }
                if( num >= bigL){
                     num=0;
                    litleSlect(num);
                    bigSlect(num); 
                    $('.head .box_litle ul').css({ 'left': 0})              
                }
                if( num >=showNum ){
                    var num1=num-smallNum;
                    var leftN=num1*(-100);
                    $('.head .box_litle ul').css({ 'left': leftN})
                }
            }
            time=setInterval(timeF,speed);

            //鼠标进入离开
            $('.head .box').mouseenter(function() {
                clearInterval(time)
            }).mouseleave(function(){
                clearInterval(time)
                time = setInterval(timeF,speed);            
            });

            /*left*/
            $('.head .prev').click(function(event) {                        
                num--;
                if(num <= -1){
                    num=bigL-1;

                    litleSlect(num);
                    bigSlect(num); 

                } else{

                    litleSlect(num);
                    bigSlect(num); 
                }
                if(num >=smallNum){
                     var leftM = ((num-Nums)-1)*(-100);                   
                     $('.head .box_litle ul').css({ 'left':leftM })
                }
            });

            /*right*/
            $('.head .next').click(function(event) {
                num++;              
                if(num >= bigL ){
                    num=0;
                    $('.head .box_litle ul').css({ 'left': 0})
                    litleSlect(num);
                    bigSlect(num);
                } else{
                    litleSlect(num);
                    bigSlect(num); 
                } 
                if( num >=showNum ){
                    var leftR=(num-smallNum)*(-100);
                    $('.head .box_litle ul').css({ 'left': leftR})
                } 
            });
})