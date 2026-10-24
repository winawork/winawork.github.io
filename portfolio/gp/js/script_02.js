$(window).load(function(){
	resizeMinHeight();
});

$(window).resize(function(){
	resizeMinHeight();
});

$(document).on("touchstart", function(){ });

$(document).ready(function(){

		$('.gnb').mouseenter(function(){
			$('.gnb_depth_bg').show();
			$('.gnb_depth').addClass('on');
		});
		
		// 헤더에서 마우스 떠날때
		$('.gnb, .gnb_depth_bg').mouseleave(function(){
			$('.gnb_depth_bg').hide();
			$('.gnb_depth').removeClass('on');
		});

		if($('.acco_list').length){
			$('.acco_list .tit').click(function(){
				$(this).parent().toggleClass('on');
				$(this).next('.gnb_depth').stop().slideToggle(300);
			});
		}

		// 모바일 사이드메뉴 클릭시
		$('.allmenu').click(function(){
			if($('.dim').hasClass("on")){
				$('.dim, .drawer').removeClass('on');
			}else{
				$('.dim, .drawer').addClass('on');
			}
		});
		
		$('html').click(function(e) {
			if(!$(e.target).hasClass(".header_l, .gnb, .gnb_depth_bg")){
				$('.gnb_depth_bg').hide();
				$('.gnb_depth').removeClass('on');
			} 
		}); 
		
		// 영역 밖을 클릭시
		$("div.dim").click(function(e){
			if( $("div.drawer").hasClass("on") ){
				if( !$(e.target).hasClass("drawer") ){
					$(".dim, .drawer").removeClass("on");
				}
			}
		});

});

function resizeMinHeight(){
	var wrap_height = window.innerHeight;
	var h_h = $('.header_l').height();
	var f_h = $('.footer').outerHeight();
	var m_h = $('.menu_box').height();

	//최소 height 지정
	if($('.wrap').length) {
		$('.wrap').css("min-height" , wrap_height + "px");
	}
	//최소 height 지정
	if($('.container').length) {
		$('.container').css("min-height" , wrap_height-h_h-f_h + "px");
	}
	// $(window).resize(function (){});
	if($('.visual_box').length) {
		$('.visual_box').css("min-height" , wrap_height-h_h-f_h-m_h + "px");
	}
}