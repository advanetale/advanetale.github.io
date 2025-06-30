// Скрипт для мобильной навигации в современном стиле
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли мета-тег viewport
    if (!document.querySelector('meta[name="viewport"]')) {
        const metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        metaViewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(metaViewport);
    }

    // Функция для создания мобильного меню
    function createMobileMenu() {
        // Проверяем, существует ли уже мобильное меню
        if (document.querySelector('.mobile-nav')) {
            // Удаляем существующее меню для пересоздания
            const oldMobileNav = document.querySelector('.mobile-nav');
            if (oldMobileNav) {
                oldMobileNav.parentNode.removeChild(oldMobileNav);
            }
        }

        // Создаем контейнер для мобильной навигации
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.style.position = 'absolute';
        mobileNav.style.width = '100%';
        mobileNav.style.zIndex = '1000';

        // Создаем кнопку переключения
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Создаем контейнер для линий бургера
        const burgerLines = document.createElement('div');
        burgerLines.className = 'burger-lines';
        
        // Создаем три линии для бургера
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('span');
            line.className = 'burger-line';
            burgerLines.appendChild(line);
        }
        
        mobileNavToggle.appendChild(burgerLines);

        // Создаем меню и оверлей
        const mobileNavMenu = document.createElement('div');
        mobileNavMenu.className = 'mobile-nav-menu';
        
        const mobileNavOverlay = document.createElement('div');
        mobileNavOverlay.className = 'mobile-nav-overlay';

        // Находим логотип для копирования в мобильное меню
        const logo = document.querySelector('.logo');
        if (logo) {
            const mobileMenuLogo = document.createElement('div');
            mobileMenuLogo.className = 'mobile-menu-logo';
            mobileMenuLogo.style.padding = '20px';
            mobileMenuLogo.style.textAlign = 'center';
            
            // Клонируем логотип
            const logoClone = logo.cloneNode(true);
            mobileMenuLogo.appendChild(logoClone);
            mobileNavMenu.appendChild(mobileMenuLogo);
        }

        // Находим навигацию и создаем список для мобильного меню
        const nav = document.querySelector('.navigation');
        const mobileNavList = document.createElement('ul');
        mobileNavList.className = 'mobile-nav-list';

        if (nav) {
            // Получаем все ссылки из основной навигации
            const navLinks = nav.querySelectorAll('.nav-list a');
            navLinks.forEach(link => {
                const li = document.createElement('li');
                li.className = 'mobile-nav-item';
                
                const newLink = link.cloneNode(true);
                li.appendChild(newLink);
                mobileNavList.appendChild(li);
            });
        } else {
            // Если навигация не найдена, создаем стандартные ссылки
            const defaultLinks = [
                { href: 'index.html', text: 'О сервере' },
                { href: 'rules.html', text: 'Правила' },
                { href: 'gallery.html', text: 'Галерея' },
                { href: 'donate.html', text: 'Донат' },
                { href: 'wiki.html', text: 'Вики' },
                { href: 'support.html', text: 'Поддержка' },
                { href: 'join.html', text: 'Подать заявку' }
            ];
            
            defaultLinks.forEach(linkData => {
                const li = document.createElement('li');
                li.className = 'mobile-nav-item';
                
                const a = document.createElement('a');
                a.href = linkData.href;
                a.textContent = linkData.text;
                
                li.appendChild(a);
                mobileNavList.appendChild(li);
            });
        }

        // Добавляем переключатель темы в мобильное меню
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            // Добавляем класс к исходному переключателю для скрытия на мобильных
            themeToggle.parentElement.classList.add('desktop-only');
            
            // Создаем элемент списка для переключателя темы
            const themeToggleItem = document.createElement('li');
            themeToggleItem.className = 'mobile-nav-item theme-toggle-item';
            
            // Создаем контейнер для переключателя темы
            const themeToggleContainer = document.createElement('div');
            themeToggleContainer.className = 'mobile-theme-toggle-container';
            themeToggleContainer.innerHTML = '<span>Переключить тему</span>';
            
            // Клонируем переключатель темы
            const themeToggleClone = themeToggle.cloneNode(true);
            themeToggleClone.id = 'mobile-theme-toggle';
            themeToggleContainer.appendChild(themeToggleClone);
            
            themeToggleItem.appendChild(themeToggleContainer);
            mobileNavList.appendChild(themeToggleItem);
            
            // Добавляем обработчик события для клонированного переключателя
            themeToggleClone.addEventListener('click', function() {
                // Синхронизируем состояние с оригинальным переключателем
                themeToggle.click();
            });
        }

        mobileNavMenu.appendChild(mobileNavList);

        // Добавляем элементы в DOM
        mobileNav.appendChild(mobileNavToggle);
        mobileNav.appendChild(mobileNavMenu);
        mobileNav.appendChild(mobileNavOverlay);

        // Находим хедер и добавляем мобильную навигацию
        const header = document.querySelector('.header');
        const headerContent = document.querySelector('.header-content');
        
        if (headerContent) {
            headerContent.appendChild(mobileNav);
        } else if (header) {
            header.appendChild(mobileNav);
        } else {
            document.body.insertBefore(mobileNav, document.body.firstChild);
        }

        // Добавляем обработчики событий
        mobileNavToggle.addEventListener('click', function() {
            mobileNavMenu.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Обновляем класс для анимации бургера
            burgerLines.classList.toggle('active');
        });

        mobileNavOverlay.addEventListener('click', function() {
            mobileNavMenu.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Убираем активное состояние у бургера
            burgerLines.classList.remove('active');
        });

        // Закрытие меню при клике на пункт меню
        const mobileMenuLinks = mobileNavMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNavMenu.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Убираем активное состояние у бургера
                burgerLines.classList.remove('active');
            });
        });

        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                mobileNavMenu.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Убираем активное состояние у бургера
                burgerLines.classList.remove('active');
            }
        });

        // Добавляем стили для бургера
        const style = document.createElement('style');
        style.innerHTML = `
            .burger-lines {
                width: 24px;
                height: 18px;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            
            .burger-line {
                display: block;
                width: 100%;
                height: 2px;
                background-color: white;
                transition: transform 0.3s, opacity 0.3s;
            }
            
            .burger-lines.active .burger-line:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .burger-lines.active .burger-line:nth-child(2) {
                opacity: 0;
            }
            
            .burger-lines.active .burger-line:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            /* Стили для центрирования логотипа на мобильных */
            @media screen and (max-width: 900px) {
                .header-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 15px 0;
                }
                
                .logo {
                    margin: 0 auto;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Вызываем функцию создания мобильного меню
    createMobileMenu();
    
    // Добавим повторный вызов через небольшую задержку для гарантированной работы на всех страницах
    setTimeout(createMobileMenu, 500);
}); 