'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tab

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click' , (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });


    // Timer

    const deadline = '2020-10-30'; // дата в виде строки

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // превращаем строку даты в числовое значение - реальное время
              days = Math.floor((t / (1000 * 60 * 60 * 24))), // количество дней
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // чтобы таймер не возвращался на написанный в html

        function updateClock () {
            const t = getTimeRemaining(endtime);
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');


    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modalTrigger.forEach( btn => {
        btn.addEventListener('click', openModal);
    });
    
    

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(modalTimeId);
    }
    
    
    modalClose.addEventListener('click', closeModal);
        
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });
        
    // закрываем модальное окно кнопкой Esc
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
        
    const modalTimeId = setTimeout(openModal, 5000);
    
    function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
});