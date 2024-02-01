

$(function () {

	$.floatInterval = function(){
		const chk = $('.float_con').hasClass('op5');
		if(chk){
			$('.float_con').removeClass('op5');
		}else{
			$('.float_con').addClass('op5');
		}
	}

	const interSet = null;
	$.floatInterSet = function(){
		console.log('1');
		floatInterval();
		interSet = setInterval(floatInterval(),1000);
	}

	setInterval(function() {
		console.log("Hello, World!");
		const chk = $('.float_p').hasClass('op5');
		if(chk){
			$('.float_p').removeClass('op5');
		}else{
			$('.float_p').addClass('op5');
		}
	  }, 400);

	

	$.scrollEvent = function(){
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
	}

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
			console.log(land_h)

			$('html').animate({scrollTop : form_move}, 400);

		})
	}

	// for meta
	$.utm_set_meta = function(){
		const urlParams = new URL(location.href).searchParams;
		const mediaName = urlParams.get('media');
		const landId = urlParams.get('land_id');

		// 매체
		$('#input_txt_n3ME2O5307').val(mediaName);
		// 랜딩
		$('#input_txt_536O0J3D4Q').val(landId);
	}

	// for dg
	$.utm_set_dg = function(){
		const urlParams = new URL(location.href).searchParams;
		const mediaName = urlParams.get('media');
		const landId = urlParams.get('land_id');

		// 매체
		$('#input_txt_79VR363K46').val(mediaName);
		// 랜딩
		$('#input_txt_1h81i260IL').val(landId);
	}

	$.map_btn_click  = function(){
		$('.map_btn').on('click',function(){
			var idx = $(this).data('idx');
			$('.map_btn').removeClass('act');
			$(this).addClass('act');

			console.log(idx);
			$('.map_dtl').find('.map_unit').removeClass('act');
			$('.map_dtl').find('.map_unit:eq('+idx+')').addClass('act');

		})
	}
	

	$.initView = function () {
		$.map_btn_click();
		$.utm_set_meta();
		$.utm_set_dg();
		$.float_btn();

	};
	$.initView();

})