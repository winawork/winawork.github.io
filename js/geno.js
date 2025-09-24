$(function () {



	$.scrollEvent = function(){
		var saTriggerMargin = 200;
        var saElementList = $('.sa');
		const scr_top = $('html,body').scrollTop();
		const win_h = window.innerHeight;

		const idx_01 = $('.land_cont');
        const land_h = $(idx_01).height();
        const h_01 = idx_01.innerHeight();

		if(land_h<scr_top+win_h){
            $('.float_con').hide();
        }else{
			$('.float_con').css('display','flex');
		}

		$(saElementList).each(function(index,item){
            if(!$(item).hasClass('show')){
                var margin = saTriggerMargin;
                if($(item).data('type') == 'main'){
                    margin = 0;
                }
                if(window.innerHeight > item.getBoundingClientRect().top+margin){
                    $(item).addClass('show');
                }
            }
        })

	}
	$.scrollEvent();

	// 전체 스크롤 이벤트
    $(window).scroll(function(){
        $.scrollEvent();
    })

	$.float_btn = function(){
		$('.float_btn').on('click',function(){
			const win_h = window.innerHeight;
			const idx_01 = $('.land_cont');
			const land_h = $(idx_01).height();

			const form_move = land_h;
			console.log('form_move='+form_move)

			$('body, html').animate({scrollTop : form_move}, 400);

		})
	}


	

	$.initView = function () {
		$.float_btn();

	};
	$.initView();

})

$(window).on('load', function(){
	$('.review_slide').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true
	});
});

