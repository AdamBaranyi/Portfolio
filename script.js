document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');
    const overlayLangEn = document.getElementById('overlay-lang-en');
    const overlayLangDe = document.getElementById('overlay-lang-de');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    /**
     * Switches the page to the given language: updates the language buttons,
     * replaces every [data-i18n] text and adjusts the form placeholders.
     * @param {('en'|'de')} lang - Language code to apply.
     */
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        // Desktop lang buttons
        if (lang === 'en') {
            langEnBtn.classList.add('active');
            langDeBtn.classList.remove('active');
        } else {
            langDeBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        }

        // Overlay lang buttons
        if (lang === 'en') {
            overlayLangEn.classList.add('active');
            overlayLangDe.classList.remove('active');
        } else {
            overlayLangDe.classList.add('active');
            overlayLangEn.classList.remove('active');
        }

        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.innerHTML.includes('<') || translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput) nameInput.placeholder = lang === 'en' ? 'Your name' : 'Dein Name';
        if (emailInput) emailInput.placeholder = lang === 'en' ? 'Your email' : 'Deine E-Mail';
        if (messageInput) messageInput.placeholder = lang === 'en' ? 'Your message' : 'Deine Nachricht';
    }

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langDeBtn.addEventListener('click', () => setLanguage('de'));


    // 2. Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const overlayCloseBtn = document.getElementById('overlay-close-btn');
    const overlayLinks = document.querySelectorAll('.overlay-link');

    /** Opens the mobile navigation overlay and locks background scrolling. */
    function openMenu() {
        mobileNavOverlay.classList.add('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    /** Closes the mobile navigation overlay and restores background scrolling. */
    function closeMenu() {
        mobileNavOverlay.classList.remove('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openMenu);
    overlayCloseBtn.addEventListener('click', closeMenu);

    overlayLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    overlayLangDe.addEventListener('click', () => setLanguage('de'));
    overlayLangEn.addEventListener('click', () => setLanguage('en'));

    // Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });


    // 3. Horizontal Scrolling Logic (Desktop only) 
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    let isDesktop = window.innerWidth > 800;

    window.addEventListener('resize', () => {
        isDesktop = window.innerWidth > 800;
        if (!isDesktop) {
            scrollWrapper.style.transform = '';
        }
    });

    window.addEventListener('wheel', (e) => {
        if (isDesktop) {
            if (e.target.tagName.toLowerCase() === 'textarea') return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                scrollWrapper.scrollBy({ left: e.deltaY, behavior: 'auto' });
                e.preventDefault();
            }
        }
    }, { passive: false });


    // 4. Navigation Highlight based on scroll position 
    const sections = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Highlights the navigation link of the section currently in view.
     * Uses horizontal scroll position on desktop and vertical scroll on mobile.
     */
    function updateActiveNav() {
        let index = sections.length;

        if (isDesktop) {
            let scrollPos = scrollWrapper.scrollLeft;
            while (--index && scrollPos + (scrollWrapper.clientWidth / 2) < sections[index].offsetLeft - sections[0].offsetLeft) {}
        } else {
            let scrollPos = window.scrollY;
            while (--index && scrollPos + (window.innerHeight / 2) < sections[index].offsetTop) {}
        }

        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && index < navLinks.length) {
            const activeSectionId = sections[index].id;
            const activeLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }

    scrollWrapper.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();


    // 5. Smooth Anchor Scrolling 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            if (isDesktop) {
                const scrollTarget = targetElement.offsetLeft - sections[0].offsetLeft;
                scrollWrapper.scrollTo({ top: 0, left: scrollTarget, behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Initialize — restore the previously chosen language (defaults to English)
    setLanguage(localStorage.getItem('lang') || 'en');

    const year = new Date().getFullYear();
    document.querySelectorAll('#current-year, #footer-year').forEach(el => {
        el.textContent = year;
    });
});
