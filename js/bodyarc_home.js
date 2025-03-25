


$(function () {
	

	$.scrollEvent = function(){
		const scr_top = $('html,body').scrollTop();
		var saTriggerMargin = 200;
        var saElementList = $('.sa');

		console.log(scr_top);
		if(scr_top>0){
			$('header').addClass('act');
		}else{
			$('header').removeClass('act');
		}
		

		$(saElementList).each(function(index,item){
            if(!$(item).hasClass('show')){
                var margin = saTriggerMargin;
                if($(item).data('type') == 'main'){
                    margin = 0;
                }
                if(window.innerHeight > item.getBoundingClientRect().top+margin){
                    $(item).addClass('show_02');
                }
            }
        })


	}
	$.scrollEvent();

	// 전체 스크롤 이벤트
    $(window).scroll(function(){
        $.scrollEvent();
    })


	$.moIcon = function(){
		$('.moIcon').on('click',function(){
			$('.header_in').toggleClass('moAct')
			$('.menu_con').slideToggle(200,function () {
				$('.menu_con').toggleClass('head_motion_mo');
			});
		})
	}
	




	

	$.initView = function () {
		$.moIcon();

	};
	$.initView();

})


