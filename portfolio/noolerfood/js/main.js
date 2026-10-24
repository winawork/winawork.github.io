

window.addEventListener('scroll',() =>{
	scrollEvent();
})

const scrollEvent = function(){
	const scrollTop = document.querySelector('html').scrollTop;
	const sys_h = window.innerHeight/2;
	const header = document.querySelector('header');
	console.log(scrollTop)

	// 스크롤시 헤더 css변경
	if(scrollTop>0){
		header.classList.add('scr_on');
	}else{
		header.classList.remove('scr_on');
	}

}


// 모바일 햄버거 버튼 클릭
const moIconClick = function(){
	const moIcon = document.querySelector('.moIcon');
	const _header =  document.querySelector('header');

	moIcon.addEventListener('click',function(){
		if(_header.classList.contains('moAct')){
			_header.classList.remove('moAct');
		}else{
			_header.classList.add('moAct');
		};
	})
}

// DOT 스크롤 이벤트
const sectionMove = function(){
	const dot = document.querySelector('.dot');
	dot.addEventListener("click",function(e){
		const idx = e.data('idx');
		const _this = $('.main_sec[data-idx="'+idx+'"]')
		const target = $(_this).offset().top;

		$('body, html').animate({scrollTop : target}, 400);
	})
}




const initView = function () {
	// moIconClick();
	// sectionMove();

};
initView();