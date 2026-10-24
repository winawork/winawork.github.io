/* Local publishing interactions. No data is submitted or stored. */
(function () {
  'use strict';
  function init() {
    var page = document.body.dataset.page || '';
    var english = document.body.dataset.locale === 'en';
    function all(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }
    function notify() {
      window.alert(english ? 'Portfolio preview only. This form does not send or save your information.' : '포트폴리오 화면 미리보기입니다. 입력한 내용은 전송하거나 저장하지 않습니다.');
    }
    function detail() { window.location.href = 'board_detail.html'; }
    all('.cont_position li.home').forEach(function (item) {
      var link = document.createElement('a');
      link.href = english ? 'index_en.html' : 'index.html';
      link.textContent = item.textContent;
      item.textContent = '';
      item.appendChild(link);
    });
    all('.pcLocale, .btn_ghost_on, .btn_ghost_off').forEach(function (link) {
      if (!link.getAttribute('href') && link.dataset.href) link.setAttribute('href', link.dataset.href);
    });
    if (english) all('.headLogo, .headLogo_mo').forEach(function (logo) {
      logo.style.backgroundImage = 'url("images/e_logo.jpg")';
      logo.style.backgroundSize = logo.classList.contains('headLogo_mo') ? '130px 40px' : '190px 60px';
    });
    var boardRoutes = { boardWrite: 'board_write.html', boardList: 'board_list.html', boardCancel: 'board_list.html', boardUpdate: 'board_write.html' };
    Object.keys(boardRoutes).forEach(function (name) {
      all('.' + name).forEach(function (link) { link.setAttribute('href', boardRoutes[name]); });
    });
    all('.boardDetail').forEach(function (link) {
      link.setAttribute('href', link.dataset.lock === 'Y' ? 'board_check.html' : 'board_detail.html');
    });
    all('.boardDelete, .boardSubmit, .repo_btn, #qnaBtn, [data-preview-unavailable]').forEach(function (control) {
      if (control.tagName === 'A' && !control.getAttribute('href')) {
        control.href = control.classList.contains('boardSubmit') && /board\/check(?:_en)?$/.test(page) ? 'board_detail.html' : '#';
      }
      if (control.id === 'qnaBtn' && !/^(A|BUTTON|INPUT)$/.test(control.tagName)) {
        control.setAttribute('role', 'button');
        control.tabIndex = 0;
        control.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            control.click();
          }
        });
      }
      control.addEventListener('click', function (event) {
        event.preventDefault();
        if (control.classList.contains('boardSubmit') && /board\/check(?:_en)?$/.test(page)) detail();
        else if (control.hasAttribute('data-preview-unavailable')) window.alert(english ? 'This destination was not included in the original source.' : '원본에 연결 주소가 제공되지 않은 항목입니다.');
        else notify();
      });
    });
    all('form').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (/board\/check(?:_en)?$/.test(page)) detail();
        else notify();
      });
    });
    var category = document.querySelector('.repo_select');
    var area = document.querySelector('.repo_input.area');
    function updateReport() {
      var selected = category ? category.selectedIndex - 1 : -1;
      all('.type_tip_list .tip').forEach(function (tip, index) { tip.style.display = index === selected ? 'block' : 'none'; });
      all('.exam_list .info_placeholder').forEach(function (example, index) {
        example.style.display = index === selected && area && !area.value && document.activeElement !== area ? 'block' : 'none';
        example.style.pointerEvents = 'none';
      });
    }
    if (category) category.addEventListener('change', updateReport);
    if (area) ['input', 'focus', 'blur'].forEach(function (name) { area.addEventListener(name, updateReport); });
    if (category) updateReport();
    all('.mail_select').forEach(function (select) {
      select.addEventListener('change', function () {
        var input = document.querySelector('.mail_input');
        if (!input) return;
        input.readOnly = select.value !== 'write';
        input.value = select.selectedIndex === 0 || select.value === 'write' ? '' : select.value;
        if (!input.readOnly) input.focus();
      });
    });
    all('.root_daum_roughmap').forEach(function (map, index) {
      var address = index === 0 ? '광주광역시 북구 양일로 10' : '충청남도 예산군 예산읍 벚꽃로388번길 12-12';
      var mapBox = map.closest('.map_box');
      var sibling = mapBox && mapBox.nextElementSibling;
      while (sibling && !sibling.classList.contains('map_box')) {
        if (sibling.classList.contains('map_p') && !/^Tel\./.test(sibling.textContent.trim())) { address = sibling.textContent.trim(); break; }
        sibling = sibling.nextElementSibling;
      }
      map.removeAttribute('id');
      map.style.cssText = 'width:100%;min-height:260px;height:320px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:18px;padding:32px;background:#f3f5f6;border:1px solid #e1e5e8;text-align:center;color:#45515b;';
      var title = document.createElement('strong');
      title.textContent = english ? 'Location map' : '오시는 길 지도';
      title.style.fontSize = '22px';
      var text = document.createElement('p');
      text.textContent = address;
      text.style.cssText = 'line-height:1.6;margin:0;';
      var link = document.createElement('a');
      link.href = 'https://map.kakao.com/link/search/' + encodeURIComponent(address);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = english ? 'Search in Kakao Map (external)' : '카카오맵에서 위치 보기 (외부 연결)';
      link.style.cssText = 'display:inline-block;padding:12px 20px;border:1px solid #6a7580;border-radius:3px;color:#34424f;font-size:14px;';
      var note = document.createElement('small');
      note.textContent = english ? 'The live map requires an internet connection.' : '실시간 지도는 인터넷 연결 후 외부 사이트에서 확인할 수 있습니다.';
      note.style.lineHeight = '1.6';
      map.replaceChildren(title, text, link, note);
    });
    if (document.querySelector('form, .board_list_box, .board_write_box, .root_daum_roughmap')) {
      var notice = document.createElement('p');
      notice.className = 'publishing-notice';
      notice.textContent = english ? 'Static portfolio preview · ' : '퍼블리싱 포트폴리오 미리보기 · ';
      var pages = document.createElement('a');
      pages.href = 'pages.html';
      pages.textContent = english ? 'All pages' : '전체 화면 보기';
      notice.appendChild(pages);
      var footer = document.querySelector('.footer > .inner');
      if (footer) footer.appendChild(notice);
    }
    if (window.AOS && typeof window.AOS.init === 'function') window.AOS.init({ once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
