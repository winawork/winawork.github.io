


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
		floatInterval();
		interSet = setInterval(floatInterval(),1000);
	}

	setInterval(function() {

		const chk = $('.float_p').hasClass('op5');
		if(chk){
			$('.float_p').removeClass('op5');
		}else{
			$('.float_p').addClass('op5');
		}
	  }, 400);

	

	$.scrollEvent = function(){
		var saTriggerMargin = 200;
        var saElementList = $('.sa');
		const scr_top = $(window).scrollTop();
		const win_h = window.innerHeight;

		const idx_01 = $('.page');
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
			const idx_01 = $('.form_box');
			const land_h = $(idx_01).offset().top;

			const form_move = land_h-100;

			$('body, html').animate({scrollTop : form_move}, 400);

		})
	}

	function countUp(targetElement, targetValue) {
		let currentValue = 0; // Start from 0
		const increment = Math.ceil(targetValue / 100); // Increment value for smoother animation
		const interval = setInterval(function () {
		  currentValue += increment; // Increment the current value
		  if (currentValue >= targetValue) {
			currentValue = targetValue; // Ensure it ends exactly at the target value
			clearInterval(interval); // Stop the animation
		  }
		  targetElement.text(currentValue.toLocaleString()); // Update the element with formatted value
		}, 10); // Adjust speed (10ms interval)
	}

	const pensionData = [
		{
		  join_age: 10,
		  str_age: {
			60: { mm_money: 10360305, tot_money: 414412200 },
			65: { mm_money: 12937523, tot_money: 452813305 },
			70: { mm_money: 15490248, tot_money: 464707440 },
			75: { mm_money: 18795140, tot_money: 469878500 },
		  },
		},
		{
		  join_age: 20,
		  str_age: {
			60: { mm_money: 8902305, tot_money: 356092200 },
			65: { mm_money: 10835218, tot_money: 379232630 },
			70: { mm_money: 13094274, tot_money: 392828220 },
			75: { mm_money: 16611140, tot_money: 415278500 },
		  },
		},
		{
		  join_age: 30,
		  str_age: {
			60: { mm_money: 7168590, tot_money: 286743600 },
			65: { mm_money: 8854414, tot_money: 309904490 },
			70: { mm_money: 11251524, tot_money: 337545720 },
			75: { mm_money: 13911885, tot_money: 347797125 },
		  },
		},
		{
		  join_age: 40,
		  str_age: {
			60: { mm_money: 4434300, tot_money: 177372000 },
			65: { mm_money: 7274914, tot_money: 254621990 },
			70: { mm_money: 9060301, tot_money: 271809030 },
			75: { mm_money: 11368630, tot_money: 284215750 },
		  },
		},
		{
		  join_age: 50,
		  str_age: {
			65: { mm_money: 4138088, tot_money: 144833080 },
			70: { mm_money: 5604463, tot_money: 168133890 },
			75: { mm_money: 9340630, tot_money: 233515750 },
		  },
		},
	  ];

	$.select_chk = function(){
		$('.simul_select').on('change',function(){

			var age = parseInt($('.age_select').val());
			var start_age = parseInt($('.start_select').val());

			const result = $.grep(pensionData, function (item) {
				return item.join_age === age;
			  });

			if (result.length > 0 && result[0].str_age[start_age]) {
				const data = result[0].str_age[start_age];
			
				console.log('연금액 : '+data.mm_money);

				countUp($('.mm_money'),data.mm_money);
				countUp($('.tot_money'),data.tot_money);
			}else{
				$('.mm_money').html('-');
				$('.tot_money').html('-');
			}

			


		})
	}

	$.pop_close = function(){
		$('.pop_close').on('click',function(){
			$('.agree_pop').hide();
		})
	}

	$.pop_open = function(){
		$('.pop_open').on('click',function(){
			$('.agree_pop').css('display','flex')
		})
	}

	$.all_btn = function(){
		$('.all_btn').on('click',function(){
			$('.agree_stat').attr('checked',true)
			$('.chk_true').prop('checked',true)
		})
	}

	$.agree_chk = function(){
		$('.agree_chk').on('change',function(){
			var chks = $('.agree_chk:checked');
			var chk_true = 0;
			
			if(chks.length<2){
				$('.agree_stat').attr('checked',false)
			}else{
				$(chks).each(function(idx,item){
					if(item.value == 'Y'){
						chk_true++
					}
				})
				console.log(chk_true);
				if(chk_true == 2){
					$('.agree_stat').attr('checked',true);
				}else{
					$('.agree_stat').attr('checked',false);
				}
			}

		})
	}

	$.formMove = function(){
		$('.form').addClass('del');
		var formClone = $('.form').clone();
		formClone.removeClass('del');
		console.log('formClone = '+formClone);
		$('.form_in').append(formClone);
		$('.del').remove();

		$.pop_open();
		$.pop_close();
		$.all_btn();
		$.agree_chk();
	}
	

	$.initView = function () {
		$.float_btn();
		$.select_chk();
		$.pop_close();
		$.pop_open();
		$.all_btn();
		$.agree_chk();
		$.formMove();
	};
	$.initView();

})


