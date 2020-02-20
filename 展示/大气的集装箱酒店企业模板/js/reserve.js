$(function(){
    function search(e){
        $(e).siblings().toggleClass('show');
        $(e).children('.area_cont').toggleClass('area_show');
    }
    function xiala(e){
        $(e).parent().find('.reserve').slideToggle(500);
        $(e).toggleClass('ss');
    }

    // $('.reserve .info .child dt').click(function(event) {
    //     var e = $(this)
    //     search(e);
    //     $('.bigBanner .xiala').toggleClass('hh');
    // });
    $('.bigBanner .xiala').click(function(event) {
        var e = $(this)
        xiala(e);
    });
    // 地址

    $('.reserve .info .area').click(function(event) {
        var e = $(this)
        search(e);
        $('.bigBanner .xiala').toggleClass('hhh');
    });
    $('.bigBanner .reserve .info .area .area_cont p').each(function(index, el) {
        $(this).click(function(event) {
            var h = $(this).html();
            $(this).removeClass('area_show');
            $('.bigBanner .reserve .info .area input').val(h);
        });
    });

    // 客房
    $('.reserve .info .child dt').click(function(event) {
        var e = $(this)
        search(e);
        $('.bigBanner .xiala').toggleClass('hh');
    });
    $('.bigBanner .reserve .info .child .person dd').each(function(index, el) {
        $(this).click(function(event) {
           var em = $(this).html();
           $('.bigBanner .reserve .info .child .person').removeClass('show');
           $('.bigBanner .reserve .info .child dt em').html(em);
           $('.bigBanner .xiala').removeClass('hh');
        });
    });
})