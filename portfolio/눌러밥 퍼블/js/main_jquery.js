$(function () {


	// 모바일 햄버거 버튼 클릭
	$.moIconClick = function(){
		$('.mo_icon').on('click',function(){
			console.log(1);
			$('.navi_con').addClass('on')
		})
	}

	$.headerHover = function(){
		$('header').mouseenter(function(){
			console.log('mouse')
			$(this).addClass('act');
		})
		$('header').mouseleave(function(){
			$(this).removeClass('act');
		})
	}

	$.naviClose = function(){
		$('.navi_close').on('click',function(){
			$('.navi_con').removeClass('on')
		})
	}

	$.familyBtn = function(){
		$('.family_btn').on('click',function(){
			$('.f_menu_in').slideToggle(function(){
				$('.family_icon').toggleClass('on');
			});
		})
	}

	var slidePlay;
	var time = 5000;
	var isPause = 0;
	var realTime;
	var isStop = false;
	var slideTimer = (function(){
		if(!isStop){
			
			if(isPause == 1){
				var all_w = $('.slide_back').width();
				var now_w = $('.slide_act').width();
				var percent = (now_w/all_w).toFixed(2);
				realTime = time-(time*percent);
				isPause=0;
			}else{
				realTime = time;
			}
	
			$('.slide_act').animate({ width : "100%" },realTime-1);
			$('.slide_act').animate({ width : "0%" },1,function(){
				var idx = $('.slide_now').data('idx');
	
				var now_num;
				if(idx<3){
					now_num = idx+1
				}else{
					now_num = 1
				}
				console.log('now_num = '+now_num)
				$('.slide_now').data('idx',now_num)
				$('.slide_now').html('0'+now_num);
		
				$('.tit_unit').hide();
				$('.tit_unit').eq(now_num-1).show();

				$('.slide').find('.unit').removeClass('on');
				$('.slide').find('.unit').eq(now_num-1).addClass('on');
			});
	
			
		}else{
			clearInterval(slidePlay);
		}

	});
	slideTimer();
	slidePlay = setInterval(slideTimer,time);

	$.slide_btn = function(){
		$('.slide_btn').on('click',function(){

			if($(this).hasClass('pause')){
				$(this).toggleClass('on');
				if($(this).hasClass('on')){
					for (var i = 0 ; i < slidePlay ; i++) {
						clearInterval(i);
					  }
					var idx = $('.slide_now').data('idx');
					$(".slide_act").stop(true,false);
					isStop = true;

				}else{
					isStop = false;
					var all_w = $('.slide_back').width();
					var now_w = $('.slide_act').width();
					var percent = (now_w/all_w).toFixed(2);
					realTime = time-(time*percent);
					isPause=1;

					slideTimer();
					slidePlay = setInterval(slideTimer,realTime);
					clearInterval(slidePlay);
					setTimeout(function(){
						slideTimer();
						slidePlay = setInterval(slideTimer,time);
					},realTime-1)
					$('.slide_act').removeClass('pause');
				}
				
			}else{
				for (var i = 0 ; i < slidePlay ; i++) {
					clearInterval(i);
				  }
				var idx = $('.slide_now').data('idx');
				var now_num;
				$(".slide_act").stop(false,false);
				isStop = true;


				if($(this).hasClass('prev')){
					if(idx <= 1){
						now_num = 2;
					}else{
						now_num = idx-2;
					}
				}else if($(this).hasClass('next')){
					if(idx >= 3){
						now_num = 3;
					}else{
						now_num = idx;
					}
				}

				$('.slide_now').data('idx',now_num)
				$('.slide_now').html('0'+now_num);
		
				$('.tit_unit').hide();
				$('.tit_unit').eq(now_num-1).show();

				$('.slide').find('.unit').removeClass('on');
				$('.slide').find('.unit').eq(now_num-1).addClass('on');

				isStop = false;
				var all_w = $('.slide_back').width();
				var now_w = $('.slide_act').width();
				var percent = (now_w/all_w).toFixed(2);
				realTime = time-(time*percent);

				slideTimer();
				slidePlay = setInterval(slideTimer,realTime);
				// clearInterval(slidePlay);
				// setTimeout(function(){
				// 	slideTimer();
				// 	slidePlay = setInterval(slideTimer,time);
				// },realTime-1)


			}


		})
	}

	$.brandArrow = function(){
		$('.brand_img_con .arrow').on('click',function(){
			$('.brand_con').toggleClass('on');
		})
	}




	

	$.moIconClick();
	$.headerHover();
	$.naviClose();
	$.familyBtn();
	$.slide_btn();
	$.brandArrow();

})




// 원본 미제공 주소는 임의 외부 사이트로 이동하지 않습니다.
$(function () {
    $('[data-preview-unavailable]').on('click', function (event) {
        event.preventDefault();
        alert('퍼블리싱 미리보기: 원본에 연결 주소 또는 별도 화면이 제공되지 않았습니다.');
    });
    $('.submit_btn').on('click', function (event) {
        event.preventDefault();
        alert('퍼블리싱 미리보기입니다. 문의 내용은 전송되지 않습니다.');
    });
});
