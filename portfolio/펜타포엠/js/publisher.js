$.comMenuUnit = function(){
    $('.comMenuUnit').on('click',function(){
        $(this).next('.comMenuList').slideToggle(200);
    })
}
$.comMenuUnit();

// 모바일 햄버거 버튼 클릭
$.moIconClick = function(){
    $('.moIcon').on('click',function(){
        $('.header').toggleClass('moAct',function(){
            $('.header_menu_mom').slideToggle('200');
        });

        if($('.header').hasClass('moAct')){
            $('body').addClass('scrollDisable')
        }else{
            $('body').removeClass('scrollDisable')
        }

    })
}
$.moIconClick();

//메뉴 클릭
$.subMenuPickClick = function(){
    $('.sub_menu_pick').on('click',function(){
        var _this = $(this).parents('.sub_menu_box').find('.sub_menu_list');
        $(_this).slideToggle(200);
    })
}
$.subMenuPickClick();


