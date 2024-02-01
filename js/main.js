$(function () {

	const counter = (_this, max) => {
		let now = max;
	  
		const handle = setInterval(() => {
			var num = Math.ceil(max - now);
			num = num.toLocaleString('ko-KR',4)
		  $(_this).html(num);
		
		  // 목표수치에 도달하면 정지
		  if (now < 1) {
			clearInterval(handle);
		  }
		  
		  // 증가되는 값이 계속하여 작아짐
		  const step = now / 10;
		  
		  // 값을 적용시키면서 다음 차례에 영향을 끼침
		  now -= step;
		}, 50);
	}

	$.clinicCount = function(){
		console.log(1);
		const _this = $('.count_target');

		// 목표 수치
		const max = $('.count_target').data('num');
		counter(_this, max)
	}


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
            if(!$(item).hasClass('shw')){
                var margin = saTriggerMargin;
                if($(item).data('type') == 'main'){
                    margin = 0;
                }
                if(window.innerHeight > item.getBoundingClientRect().top+margin){
                    $(item).addClass('shw');

					if($(item).hasClass('set_count')){
						$.clinicCount();
					}
                }
            }

			
        })

	}
	$.scrollEvent();

	

	$.floatClickEvent = function(){
		$('.fl_btn').on('click',function(e){
			e.preventDefault();
			var prot = $(location).attr('protocol');
			var host = $(location).attr('hostname');

			var _link = $(this).data('link');
			var target = '';
			var navi_h = $('#doz_header_wrap').height();

			if(_link == 'time' || _link == 'way'){
				window.location = prot+'//'+host+'#time_sec'
			}else if(_link == 'cost'){
				window.location = prot+'//'+host+'#price_sec'
			}

		})
	}

	

	$.initView = function () {
		$.floatClickEvent();

	};
	$.initView();

})