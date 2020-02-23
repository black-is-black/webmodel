$(document).ready(function(){
    autoClick();
    JudgeNone();
    fadeTop();
})
function autoClick(){
    var preTab = $(".nav-link").href;
    $(".nav-link").mouseover(function(){
        if(!$(preTab).hasClass("active")){
            $(this).trigger("click");
        }
    })
    $(".nav-link").mouseout(function(){
        $(this).removeClass("active");
    })
}
function JudgeNone(){
    $(".nav-link").mouseover(function(){
        $(".tab-content").attr("style","z-index:100");
        $(".tab-content").removeClass("d-none");
    })
    $(".nav-link").mouseout(function(){
        $(".tab-content").mouseover(function(){
            $(".tab-content").attr("style","z-index:100");
            $(".tab-content").removeClass("d-none");
            console.log("移进了.nav-content");
            $(".tab-content").mouseout(function(){
                $(".tab-content").attr("style","z-index:-1");
                $(".tab-content").addClass("d-none");
                console.log("移出了.nav-content");
            })
        })
        $(".tab-content").attr("style","z-index:-1");
        $(".tab-content").addClass("d-none");
        console.log("移出了.nav-link");
    })
}
function fadeTop(){
    var rt = $(".return-top");
   $(document).scroll(function(){
       var distance = $(document).scrollTop();
       // console.log(distance);
       if(distance > 0){
           rt.eq(0).fadeIn()
       }else{
           rt.eq(0).fadeOut();
       }
   })
}

