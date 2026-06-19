document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Language Toggle ---
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');
    const overlayLangEn = document.getElementById('overlay-lang-en');
    const overlayLangDe = document.getElementById('overlay-lang-de');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    /**
     * Applies the selected language across the entire application.
     * Updates localStorage, UI active states, text content, and input placeholders.
     * 
     * @param {string} lang - The target language code ('en' or 'de').
     * @returns {void}
     */
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'en') {
            langEnBtn.classList.add('active');
            langDeBtn.classList.remove('active');
            overlayLangEn.classList.add('active');
            overlayLangDe.classList.remove('active');
        } else {
            langDeBtn.classList.add('active');
            langEnBtn.classList.remove('active');
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
    overlayLangDe.addEventListener('click', () => setLanguage('de'));
    overlayLangEn.addEventListener('click', () => setLanguage('en'));


    // --- 2. Mobile Navigation ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const overlayCloseBtn = document.getElementById('overlay-close-btn');
    const overlayLinks = document.querySelectorAll('.overlay-link');

    /**
     * Opens the mobile navigation menu and prevents background scrolling.
     * 
     * @returns {void}
     */
    function openMenu() {
        mobileNavOverlay.classList.add('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Closes the mobile navigation menu and restores background scrolling.
     * 
     * @returns {void}
     */
    function closeMenu() {
        mobileNavOverlay.classList.remove('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openMenu);
    overlayCloseBtn.addEventListener('click', closeMenu);
    overlayLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });


    // --- 3. Scroll Logic ---
    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    let isDesktop = window.innerWidth > 800;

    window.addEventListener('resize', () => {
        isDesktop = window.innerWidth > 800;
        if (!isDesktop) scrollWrapper.style.transform = '';
    });

    window.addEventListener('wheel', (e) => {
        if (isDesktop) {
            if (e.target.tagName.toLowerCase() === 'textarea') return;
            // translate vertical wheel to horizontal scroll
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                scrollWrapper.scrollBy({ left: e.deltaY, behavior: 'auto' });
                e.preventDefault();
            }
        }
    }, { passive: false });


    // --- 4. Scroll Spy (Active Links) ---
    const sections = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Calculates the current active section based on scroll position
     * and highlights the corresponding navigation link.
     * 
     * @returns {void}
     */
    function updateActiveNav() {
        let activeSectionId = '';

        if (isDesktop) {
            const viewportCenter = scrollWrapper.scrollLeft + scrollWrapper.clientWidth / 2;
            sections.forEach(section => {
                const sectionStart = section.offsetLeft - sections[0].offsetLeft;
                const sectionEnd = sectionStart + section.offsetWidth;
                if (viewportCenter >= sectionStart && viewportCenter < sectionEnd) {
                    activeSectionId = section.id;
                }
            });

            const isAtEnd = scrollWrapper.scrollLeft + scrollWrapper.clientWidth >= scrollWrapper.scrollWidth - 5;
            if (isAtEnd) activeSectionId = sections[sections.length - 1].id;
        } else {
            const viewportCenter = window.scrollY + window.innerHeight / 2;
            sections.forEach(section => {
                const sectionStart = section.offsetTop;
                const sectionEnd = sectionStart + section.offsetHeight;
                if (viewportCenter >= sectionStart && viewportCenter < sectionEnd) {
                    activeSectionId = section.id;
                }
            });
        }

        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    scrollWrapper.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();


    // --- 5. Smooth Anchor Scrolling ---
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

    // --- Initialization ---
    setLanguage(localStorage.getItem('lang') || 'en');

    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#current-year, #footer-year').forEach(el => {
        el.textContent = currentYear;
    });
});
