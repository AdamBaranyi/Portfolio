document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Language Toggle ---
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');
    const overlayLangEn = document.getElementById('overlay-lang-en');
    const overlayLangDe = document.getElementById('overlay-lang-de');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    /**
     * Updates language buttons active states.
     * @param {string} lang - target language
     * @returns {void}
     */
    function updateLangButtons(lang) {
        const isEn = lang === 'en';
        langEnBtn.classList.toggle('active', isEn);
        langDeBtn.classList.toggle('active', !isEn);
        overlayLangEn.classList.toggle('active', isEn);
        overlayLangDe.classList.toggle('active', !isEn);
    }

    /**
     * Translates DOM elements with data-i18n attributes.
     * @param {string} lang - target language
     * @returns {void}
     */
    function translateElements(lang) {
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
    }

    /**
     * Updates form input placeholders based on language.
     * @param {string} lang - target language
     * @returns {void}
     */
    function updatePlaceholders(lang) {
        const nameIn = document.getElementById('name');
        const emailIn = document.getElementById('email');
        const msgIn = document.getElementById('message');
        if (nameIn) nameIn.placeholder = lang === 'en' ? 'Your name' : 'Dein Name';
        if (emailIn) emailIn.placeholder = lang === 'en' ? 'Your email' : 'Deine E-Mail';
        if (msgIn) msgIn.placeholder = lang === 'en' ? 'Your message' : 'Deine Nachricht';
    }

    /**
     * Applies the selected language across the application.
     * @param {string} lang - The target language code.
     * @returns {void}
     */
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        updateLangButtons(lang);
        translateElements(lang);
        updatePlaceholders(lang);
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
     * Gets the active section ID for desktop.
     * @returns {string} The active section ID.
     */
    function getActiveDesktopSection() {
        const center = scrollWrapper.scrollLeft + scrollWrapper.clientWidth / 2;
        let id = '';
        sections.forEach(sec => {
            const start = sec.offsetLeft - sections[0].offsetLeft;
            if (center >= start && center < start + sec.offsetWidth) id = sec.id;
        });
        const isAtEnd = scrollWrapper.scrollLeft + scrollWrapper.clientWidth >= scrollWrapper.scrollWidth - 5;
        return isAtEnd ? sections[sections.length - 1].id : id;
    }

    /**
     * Gets the active section ID for mobile.
     * @returns {string} The active section ID.
     */
    function getActiveMobileSection() {
        const center = window.scrollY + window.innerHeight / 2;
        let id = '';
        sections.forEach(sec => {
            const start = sec.offsetTop;
            if (center >= start && center < start + sec.offsetHeight) id = sec.id;
        });
        return id;
    }

    /**
     * Highlights the active navigation link.
     * @param {string} id - Active section ID.
     * @returns {void}
     */
    function highlightNavLink(id) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    /**
     * Calculates active section based on scroll position and highlights it.
     * @returns {void}
     */
    function updateActiveNav() {
        const activeId = isDesktop ? getActiveDesktopSection() : getActiveMobileSection();
        highlightNavLink(activeId);
    }

    scrollWrapper.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();


    /**
     * Performs smooth scrolling to a target element.
     * @param {HTMLElement} target - The target element to scroll to.
     * @returns {void}
     */
    function scrollToTarget(target) {
        if (isDesktop) {
            const scrollTarget = target.offsetLeft - sections[0].offsetLeft;
            scrollWrapper.scrollTo({ top: 0, left: scrollTarget, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: target.offsetTop - 80, left: 0, behavior: 'smooth' });
        }
    }

    // --- 5. Smooth Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            scrollToTarget(targetElement);
        });
    });

    /**
     * Handles intersection observer for reveal animations.
     * @param {IntersectionObserverEntry[]} entries - Observer entries.
     * @param {IntersectionObserver} observer - The observer instance.
     * @returns {void}
     */
    function handleReveal(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }

    const revealObserver = new IntersectionObserver(handleReveal, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Initialization ---
    setLanguage(localStorage.getItem('lang') || 'en');

    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#current-year, #footer-year').forEach(el => {
        el.textContent = currentYear;
    });
});
