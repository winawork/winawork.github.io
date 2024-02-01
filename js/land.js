$(function () {

	var deadline = $('#w20231213e8e8cef1186a5').find('._widget_data ').find('.form-widget').find('.deadline-bar');

	console.log(deadline);
	if(deadline.length == 1){
		$('.duplicated').css('display','flex');
	}


	$.nextStep = function(){
		$('.next_btn').on('click',function(){
			$('.land_step').removeClass('act');
			$('.land_step.step_02').addClass('act');
		})

		$('input[name=gender]').on('change',function(){
			$('.land_step').removeClass('act');
			$('.land_step.step_03').addClass('act');
		})

		$('.quiz_select.years').on('change',function(){
			$('.land_step').removeClass('act');
			$('.land_step.step_04').addClass('act');
		})

		$('.quiz_select.height').on('change',function(){
			$('.land_step').removeClass('act');
			$('.land_step.step_05').addClass('act');
		})

	}

	// 출생년도
	$.selectYearList = function(){
		var start_h = 2000;
		var end_h = 2023;
		for (let i = start_h; i <= end_h; i++) {
			var opt = '<option value="'+i+'">'+i+'</option>'
			$('.quiz_select.years').append(opt);
		}
	}
	$.selectYearList();

	// 현재키
	$.selectHeightList = function(){
		var start_h = 100;
		var end_h = 160;
		for (let i = start_h; i <= end_h; i++) {
			var opt = '<option value="'+i+'">'+i+'</option>'
			$('.quiz_select.height').append(opt);
		}
	}
	$.selectHeightList();

	var today = new Date();
	var date = new Date();           

	$(".cal_btn.prev").click(function() { // 이전달
		$(".days").html('');
		today = new Date ( today.getFullYear(), today.getMonth()-1, today.getDate());
		buildCalendar();
		$.data_pick();
		$('.time_copy').removeClass('pick_time');
	})
	
	$(".cal_btn.next").click(function(){ //다음달
		$(".days").html('');
		today = new Date ( today.getFullYear(), today.getMonth()+1, today.getDate());
		buildCalendar();
		$.data_pick();
		$('.time_copy').removeClass('pick_time');
	})


	function buildCalendar() {
		
		nowYear = today.getFullYear();
		nowMonth = today.getMonth();
		firstDate = new Date(nowYear,nowMonth,1).getDate();
		firstDay = new Date(nowYear,nowMonth,1).getDay(); //1st의 요일
		lastDate = new Date(nowYear,nowMonth+1,0).getDate();

		if((nowYear%4===0 && nowYear % 100 !==0) || nowYear%400===0) { //윤년 적용
			lastDate[1]=29;
		}

		$(".cal_date").text(nowYear+"."+(nowMonth+1));

		for (i=0; i<firstDay; i++) { //첫번째 줄 빈칸
			$(".days").append("<span></span>");
		}
		for (i=1; i <=lastDate; i++){ // 날짜 채우기
			plusDate = new Date(nowYear,nowMonth,i).getDay();

			if(plusDate == 0){
				$(".days").append("<span class='date'><span class='in'><span class='cal_num sunday act_day' data-time='short_time' data-date="+ nowYear+"."+(nowMonth+1)+"."+i+">"
				+ i +"</span></span></span>");
			}else if(plusDate == 1 || plusDate == 2 || plusDate == 3){
				$(".days").append("<span class='date'><span class='in'><span class='cal_num act_day' data-time='full_time' data-date="+ nowYear+"."+(nowMonth+1)+"."+i+">"
				+ i +"</span></span></span>");
			}else if(plusDate == 4 || plusDate == 5){
				$(".days").append("<span class='date'><span class='in'><span class='cal_num'>"
				+ i +"</span></span></span>");
			}else if(plusDate == 6){
				$(".days").append("<span class='date'><span class='in'><span class='cal_num act_day' data-time='short_time' data-date="+ nowYear+"."+(nowMonth+1)+"."+i+">"
				+ i +"</span></span></span>");
			}
			
			
		}
		if($("#calendar > tbody > td").length%7!=0) { //마지막 줄 빈칸
			for(i=1; i<= $("#calendar > tbody > td").length%7; i++) {
				$("#calendar tbody:last").append("<td></td>");
			}
		}
		$(".date").each(function(index){ // 오늘 날짜 표시
			if(nowYear==date.getFullYear() && nowMonth==date.getMonth() && $(".days .date").eq(index).text()==date.getDate()) {
				$(".days .date").eq(index).addClass('cal_today');
			}

			// if(nowYear<=date.getFullYear() && nowMonth==date.getMonth() && index<date.getDate()){
			// 	$(".days .date").eq(index).find('.cal_num').removeClass('act_day');
			// }

			if(nowYear < date.getFullYear()){
				$(".days .date").eq(index).find('.cal_num').removeClass('act_day');
			}else if(nowYear == date.getFullYear() && nowMonth < date.getMonth()){
				$(".days .date").eq(index).find('.cal_num').removeClass('act_day');
			}else if(nowYear == date.getFullYear() && nowMonth == date.getMonth() && index<date.getDate()){
				$(".days .date").eq(index).find('.cal_num').removeClass('act_day');
			}

			

		}) 
	}
	buildCalendar();

	$.data_pick = function(){
		$('.act_day').on('click',function(){
			$('.act_day').removeClass('pick_date');
			$(this).addClass('pick_date');
			var time = $(this).data('time');

			$('.time_empty').hide();
			$('.time_exit').show();

			// if(time == 'full_time'){
			// 	$('.time_con').addClass('full_time');
			// 	$('.time_con').removeClass('short_time');
			// }else{
			// 	$('.time_con').addClass('short_time');
			// 	$('.time_con').removeClass('full_time');
			// }
			// $('.time_copy').removeClass('pick_time');
		})
	}
	$.data_pick();

	$.time_pick = function(){
		$('.time_copy').on('click',function(){
			$('.time_copy').removeClass('pick_time');
			$(this).addClass('pick_time');
		})
	}
	$.time_pick();

	$.submit_btn = function(){
		$('.submit_btn').on('click',function(){
			const urlParams = new URL(location.href).searchParams;
			const utmName = urlParams.get('utm');

			var gender = $('input[name=gender]').val();
			var year = $('.quiz_select.years').val();
			var height = $('.quiz_select.height').val();
			var date = $('.pick_date');
			var time = $('.pick_time');
			var name = $('input[name=name]').val();
			var tel = $('input[name=tel]').val();
			var agree = $('.agree_input').is(':checked');

			$('#input_txt_5153671339b9e').val(gender);
			$('#input_txt_37E8A55T9b').val(year);
			$('#input_txt_3Th428193F').val(height);

			if(name.length < 3 || name == '' || name == null){
				alert('성함을 정확히 입력해주세요.');
				return false;
			}else if(tel.length < 9 || tel == '' || tel == null){
				alert('연락처를 정확히 입력해주세요.');
				return false;
			}else if(date.length == 0){
				alert('희망 방문일을 선택해주세요.');
				return false;
			}else if(time.length == 0){
				alert('전화 상담 가능 시간대를 선택해주세요.');
				return false;
			}else if(!agree){
				alert('개인정보취급방침에 동의해주세요.');
				return false;
			}

			$('#input_txt_7957ecbdb9774').val(name);
			$('#input_txt_45f4a9926b148').val(tel);
			$('#input_txt_2C378i55uA').val(date.data('date'));
			$('#input_txt_9E3vs26i64').val(time.data('time'));
			$('#input_txt_6543571784').val(utmName);
			$('.form-group.privacy').find('input[type=checkbox]').attr("checked",true);

			SITE_FORM.confirmInputForm('w20231213e8e8cef1186a5','N')
			setTimeout(() => $('#input_form_complete_modal_w20231213e8e8cef1186a5').find('.btn').trigger('click'), 1000);

			

		})
	}
	$.submit_btn();

	$.agreePopEvent = function(){
		$('.agree_pop').on('click',function(e){
			e.preventDefault();
			$('.privacy_pop').css('display','flex');
		})	
		$('.pop_close').on('click',function(e){
			e.preventDefault();
			$('.privacy_pop').hide();
		})	
	}
	

	$.initView = function () {
		$.nextStep();
		$.agreePopEvent();

	};
	$.initView();

})