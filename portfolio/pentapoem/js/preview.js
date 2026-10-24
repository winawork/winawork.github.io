/* Static publishing interactions. No authentication, API calls or persisted user data. */
(function () {
    'use strict';
    const page = document.body.dataset.page;
    const root = document.body.dataset.root;
    const pageURL = path => root + path.replace(/\//g, '_') + '.html';
    const go = path => { location.href = pageURL(path); };
    const message = () => alert('퍼블리싱 미리보기입니다. 실제 로그인·인증·신청·저장·다운로드는 처리하지 않습니다.');
    const note = document.createElement('p');
    note.style.cssText = 'margin:0;padding:12px 20px;background:#f4eee5;color:#594329;font:14px/1.6 sans-serif;text-align:center;position:relative;z-index:2';
    note.append('퍼블리싱 미리보기 · 게시글과 예약 정보는 샘플입니다. ');
    const allPages = document.createElement('a');
    allPages.href = root + 'pages.html';
    allPages.textContent = '전체 페이지 보기';
    note.append(allPages);
    document.querySelector('footer')?.before(note);
    if (!note.isConnected) document.body.append(note);

    Handlebars.registerHelper('safe', text => new Handlebars.SafeString(text || ''));
    Handlebars.registerHelper('breaklines', text => new Handlebars.SafeString(Handlebars.escapeExpression(text || '').replace(/\n/g, '<br>')));
    Handlebars.registerHelper('date', () => '2026.10.24');
    Handlebars.registerHelper('pageOrders', (total, current, count, index) => total - index);
    Handlebars.registerHelper('ifCond2', function (a, operator, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });
    const sample = {
        id: 1, name: '샘플 회원', member_name: '샘플 회원', phone_number: '010-0000-0000',
        notice_title: '[샘플] 공지사항 안내', news_title: '[샘플] 보도자료 안내',
        reference_title: '[샘플] 자료실 안내', status_table_title: '[샘플] 사업진행현황 안내',
        contact_title: '[샘플] 문의드립니다.', contact_type: '답변완료', status_type: '승인완료',
        news_url: root + 'pages.html', questions: '[샘플] 방문예약은 어떻게 하나요?',
        answers: '방문예약 화면에서 날짜와 시간을 선택하는 퍼블리싱 예시입니다.\n실제 예약 접수는 진행되지 않습니다.',
        data_base_info: { modified_dt: '2026-10-24', created_dt: '2026-10-24', created_by: '샘플 회원' },
        file_list: [], home_type: '84A', reserve_number: 'SAMPLE-001', winner_type: '샘플',
    };
    ['notice_contents', 'reference_contents', 'status_table_contents', 'contact_contents', 'contact_contents_reply'].forEach(key => {
        sample[key] = '<p style="line-height:1.8">퍼블리싱 확인을 위한 샘플 내용입니다.<br>실제 게시글과 개인 정보는 포함되어 있지 않습니다.</p>';
    });
    const render = (target, template, data) => {
        const element = document.getElementById(target);
        const source = document.getElementById(template);
        if (element && source) element.innerHTML = Handlebars.compile(source.textContent)(data);
    };
    const detail = page.endsWith('Detail');
    const list = Array.from({ length: 3 }, (_, index) => ({ ...sample, id: index + 1 }));
    render('dataDetail', 'data-template', detail ? sample : { list, toplist: [], total_record_count: 3, current_page: 1, cnt_per_page: 10 });
    document.querySelectorAll('#dataDetail .unit[data-id]').forEach(row => {
        const target = page + 'Detail';
        if (['social/notice', 'social/reference', 'social/statusTable', 'social/faq', 'social/contact', 'member/board01', 'member/board02'].includes(page)) {
            row.querySelector('a.title')?.setAttribute('href', pageURL(target));
        }
    });
    document.querySelectorAll('.to_list_btn').forEach(link => { link.href = pageURL(page.replace(/Detail$/, '')); });
    document.querySelectorAll('.faq_unit').forEach(unit => {
        unit.addEventListener('click', () => $(unit).find('.answer').slideToggle(200));
    });
    document.querySelectorAll('.fileDownload').forEach(link => link.addEventListener('click', event => { event.preventDefault(); message(); }));

    // Reservation date/time examples are local and never submitted.
    let month = new Date(2026, 9, 1);
    function calendar() {
        const weeks = [];
        const start = month.getDay();
        const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const keys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        for (let offset = 0; offset < start + last; offset += 7) {
            const week = { ym: `${month.getFullYear()}.${String(month.getMonth() + 1).padStart(2, '0')}` };
            keys.forEach((key, index) => {
                const day = offset + index - start + 1;
                week[key] = day > 0 && day <= last ? day : '';
            });
            weeks.push(week);
        }
        render('calDateView', 'days-data-template', { list: weeks });
        const heading = document.getElementById('calCur');
        if (heading) heading.textContent = weeks[0].ym;
        document.querySelectorAll('#calDateView td').forEach(cell => {
            if (!cell.dataset.day) return;
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', () => {
                document.querySelectorAll('#calDateView td').forEach(other => { other.style.background = ''; });
                cell.style.background = '#f4eee5';
                render('planDetail', 'add-plan-template', {
                    am: [{ id: 'sample-am', time: '10:00 (샘플)', limit_team: 5, reserved_count: 0 }],
                    pm: [{ id: 'sample-pm', time: '14:00 (샘플)', limit_team: 5, reserved_count: 0 }],
                });
            });
        });
    }
    if (document.getElementById('calDateView')) {
        calendar();
        render('planDetail', 'no-add-plan-template', {});
        ['calPrev', 'calNext'].forEach((id, index) => document.getElementById(id)?.addEventListener('click', () => {
            month = new Date(month.getFullYear(), month.getMonth() + (index ? 1 : -1), 1);
            calendar();
            render('planDetail', 'no-add-plan-template', {});
        }));
    }
    ['ymd', 'time'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) element.textContent = index ? '오전 10:00 (샘플)' : '2026.10.24 (샘플)';
    });
    // Replace the original mobile handler, whose toggleClass callback is not supported by jQuery.
    $('.moIcon').off('click').on('click', function () {
        $('.header').toggleClass('moAct');
        $('.header_menu_mom').stop(true, true).slideToggle(200);
        $('body').toggleClass('scrollDisable', $('.header').hasClass('moAct'));
    });
    if (window.matchMedia) {
        const mobile = window.matchMedia('(max-width: 839px)');
        mobile.addEventListener('change', () => {
            $('.header').removeClass('moAct');
            $('body').removeClass('scrollDisable');
            $('.header_menu_mom').stop(true, true).css('display', '');
        });
    }
    document.querySelector('.float_pc_02')?.closest('a')?.addEventListener('click', event => {
        event.preventDefault();
        alert('원본에 연결된 홍보 영상이 없습니다.');
    });
    const next = document.getElementById('nextButton');
    next?.addEventListener('click', event => { event.preventDefault(); go(page.replace('Step1', 'Step2')); });
    document.getElementById('agreeAll')?.addEventListener('change', event => {
        document.querySelectorAll('.privacy input[type="checkbox"]').forEach(input => { input.checked = event.target.checked; });
    });
    document.querySelector('.devMoveJoin')?.addEventListener('click', () => go('login/joinMember02'));
    document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
        event.preventDefault();
        if (/Step2$/.test(page)) { go(page.replace('Step2', 'Step3')); return; }
        if (/Step1$/.test(page)) { go(page.replace('Step1', 'Step3')); return; }
        if (page === 'login/findUserInfo') { render('pwArea', 'data-template', sample); return; }
        if (page === 'login/findUserPw') { go('login/findUserPwRs'); return; }
        message();
    }));
    document.querySelectorAll('button').forEach(button => {
        if (button.closest('form') && button.type === 'submit') return;
        if (button.id === 'nextButton' || button.classList.contains('scroll_btn') || button.classList.contains('devMoveJoin')) return;
        button.addEventListener('click', event => { event.preventDefault(); message(); });
    });
    document.querySelector('.scroll_btn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
        }));
        document.querySelectorAll('.sa').forEach(element => observer.observe(element));
    } else document.querySelectorAll('.sa').forEach(element => element.classList.add('show'));
})();
