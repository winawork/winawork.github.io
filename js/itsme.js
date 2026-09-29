$(function () {

	$.setEventPeriod = function(){
		var startDate = new Date();
		var endDate = new Date(startDate);
		endDate.setDate(endDate.getDate() + 30);

		var formatDate = function(date){
			var year = date.getFullYear();
			var month = String(date.getMonth() + 1).padStart(2, '0');
			var day = String(date.getDate()).padStart(2, '0');

			return year + '.' + month + '.' + day;
		};

		$('#event-period').text(formatDate(startDate) + ' ~ ' + formatDate(endDate));
	}



	$.scrollEvent = function(){
		var saTriggerMargin = 200;
        var saElementList = $('.sa');
		const scr_top = $(window).scrollTop();
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

	$.utm_set_meta = function(){
		const urlParams = new URL(location.href).searchParams;
		const mediaName = urlParams.get('media');

		console.log('mediaName ='+mediaName);

		// 매체
		$('#input_txt_05gTv4E4U8').val(mediaName);
		// 랜딩
		// $('#input_txt_nNM51c74I6').val(landId);
	}


	

	$.initView = function () {
		$.setEventPeriod();
		$.float_btn();
		$.utm_set_meta();

	};
	$.initView();

})


