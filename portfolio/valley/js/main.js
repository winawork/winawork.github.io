$(function () {

	$(window).scroll(function(){
        $.scrollEvent();
    })

	$.scrollEvent = function(){
        var saTriggerMargin = 200;
        var saElementList = $('.sa');
        var scrollTop = $('html,body').scrollTop();

		// 스크롤시 헤더 css변경
        if(scrollTop>0){
            $('.header').addClass('headerAct');
        }else{
            $('.header').removeClass('headerAct');
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

	// 헤더 메뉴 클릭
	$.menuClick = function(){
		$('.header .menu p').on('click',function(){
			var target = $(this).data('scroll');
			var offset = $('.'+target+'').offset().top;

			$('body, html').animate({scrollTop : offset}, 400);
			$('.header').removeClass('moAct');
		})
	}

	// 스크롤 탑 이벤트
	$.scrollMoveTop = function(){
		$('.scrollTop').on('click',function(){
			$('body, html').animate({scrollTop : 0}, 400);
		})
	}

	// 모바일 햄버거 버튼 클릭
	$.moIconClick = function(){
		$('.moIcon').on('click',function(){
			$('header').toggleClass('moAct');
		})
	}

	$.path_evt =  function(){
		$('.path .unit').on('mouseenter',function(){
			$(this).addClass('path_act');
		})
		$('.path .unit').on('mouseleave',function(){
			$(this).removeClass('path_act');
		})
	}


	$.initView = function () {
		$.menuClick();
		$.scrollMoveTop();
		$.moIconClick();
		$.path_evt();
	};
	$.initView();

})
// 포트폴리오 미리보기: 실제 등록/외부 이동 없이 화면만 확인합니다.
$(function () {
    $('form').on('submit', function (event) { event.preventDefault(); });
    $('[data-preview-unavailable]').on('click', function (event) {
        event.preventDefault();
        window.alert('원본에 제공된 외부 링크가 없습니다.');
    });
    $('.do_btn').on('click', function () {
        window.location.href = 'complete.html';
    });
    $('.reset_btn').on('click', function () {
        $('.contact input').val('').prop('checked', false);
        $('.contact select').prop('selectedIndex', 0);
    });
});
