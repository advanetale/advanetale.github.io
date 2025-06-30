document.addEventListener('DOMContentLoaded', function() {
    // Подсвечивание активного пункта в навигации
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list .nav-item a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Проверяем, соответствует ли ссылка текущей странице
        if ((currentPage.endsWith(href)) || 
            (currentPage === '/' && href === 'index.html') ||
            (currentPage.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Устанавливаем только темную тему
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация для видео трейлера
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Здесь можно добавить логику для запуска видео
            alert('Функция просмотра трейлера будет добавлена в ближайшее время!');
        });
    }

    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .section-title, .about-image, .about-text, .join-form-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Добавляем класс для стилизации анимаций
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .section-title, .about-image, .about-text, .join-form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Стили для фиксации body при открытом меню */
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Запускаем анимацию при загрузке и при скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запуск при загрузке страницы

    // Параллакс-эффект для главного экрана
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });
    }

    // Мобильное навигационное меню
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    if (mobileNavToggle && mobileNavMenu && mobileNavOverlay) {
        function toggleMenu() {
            mobileNavMenu.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            if (mobileNavMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
            } else {
                document.body.style.overflow = ''; // Разрешаем прокрутку страницы
            }
        }

        mobileNavToggle.addEventListener('click', toggleMenu);
        mobileNavOverlay.addEventListener('click', toggleMenu);
        
        // Закрываем меню при клике на пункт
        const mobileLinks = mobileNavMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(toggleMenu, 100); // Небольшая задержка для анимации
            });
        });
    }
    
    // Закрываем меню при изменении размера окна (если размер больше мобильного)
    window.addEventListener('resize', function() {
        const mobileNavMenu = document.querySelector('.mobile-nav-menu');
        if (mobileNavMenu && window.innerWidth > 900 && mobileNavMenu.classList.contains('active')) {
            document.querySelector('.mobile-nav-toggle').click();
        }
    });

    // Адаптивность видео
    function resizeIframes() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const container = iframe.parentElement;
            if (container) {
                const width = container.offsetWidth;
                iframe.style.width = width + 'px';
                iframe.style.height = (width * 9 / 16) + 'px';  // Соотношение сторон 16:9
            }
        });
    }
    
    // Вызываем при загрузке и изменении размера окна
    resizeIframes();
    window.addEventListener('resize', resizeIframes);

    // Улучшенная универсальная функция для работы с FAQ и раскрывающимися элементами
    function initFaqAccordion() {
        // Поиск всех FAQ элементов на странице
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length > 0) {
            console.log('FAQ элементы найдены: ' + faqQuestions.length);
            
            // Обработчик клика для всех FAQ вопросов
            faqQuestions.forEach(question => {
                const answer = question.nextElementSibling;
                let toggleIcon = question.querySelector('.toggle-icon');
                
                // Если иконки нет, добавляем её
                if (!toggleIcon && !question.innerHTML.includes('toggle-icon')) {
                    toggleIcon = document.createElement('span');
                    toggleIcon.className = 'toggle-icon';
                    toggleIcon.textContent = '+';
                    question.appendChild(toggleIcon);
                }
                
                // Удаляем предыдущий обработчик, если он был
                question.removeEventListener('click', handleFaqClick);
                
                // Добавляем новый обработчик
                question.addEventListener('click', handleFaqClick);
            });
            
            // Вынесли функцию обработчика, чтобы можно было её удалить при необходимости
            function handleFaqClick(event) {
                const question = this;
                const answer = question.nextElementSibling;
                const toggleIcon = question.querySelector('.toggle-icon');
                
                // Проверяем, есть ли ответ
                if (!answer || !answer.classList.contains('faq-answer')) {
                    console.error('FAQ ответ не найден');
                    return;
                }
                
                // Закрываем все открытые ответы
                const allAnswers = document.querySelectorAll('.faq-answer.active');
                const allQuestions = document.querySelectorAll('.faq-question');
                
                allAnswers.forEach(item => {
                    if (item !== answer) {
                        item.classList.remove('active');
                        const q = item.previousElementSibling;
                        if (q && q.classList.contains('faq-question')) {
                            const icon = q.querySelector('.toggle-icon');
                            if (icon) icon.textContent = '+';
                        }
                    }
                });
                
                // Открываем/закрываем текущий ответ
                answer.classList.toggle('active');
                
                // Обновляем иконку
                if (toggleIcon) {
                    toggleIcon.textContent = answer.classList.contains('active') ? '−' : '+';
                }
                
                // Плавный скролл к выбранному вопросу, если он не видим
                if (answer.classList.contains('active')) {
                    const rect = question.getBoundingClientRect();
                    if (rect.top < 0 || rect.bottom > window.innerHeight) {
                        window.scrollTo({
                            top: window.scrollY + rect.top - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }
    }
    
    // Инициализируем FAQ при загрузке
    initFaqAccordion();
    
    // Повторная инициализация через небольшой промежуток времени для обработки динамически добавленных элементов
    setTimeout(initFaqAccordion, 1000);
    
    // Обработка кликов по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Добавление эффекта при наведении на карточки
    const cards = document.querySelectorAll('.feature-card, .faq-item, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}); 