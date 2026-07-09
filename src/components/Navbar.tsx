import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { contactInfo } from '../data/content';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import './Navbar.css';

const NAV_ITEMS = [
  { href: '#why-me', key: 'nav_why_me' },
  { href: '#skills', key: 'nav_skills' },
  { href: '#my-work', key: 'nav_my_work' },
  { href: '#contact', key: 'nav_contact' },
] as const;

function LangToggle({ id }: { id: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className="lang-toggle" id={id}>
      <button className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>
        DE
      </button>
      <span>|</span>
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // don't leave the scroll locked when the overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#hero" className="nav-logo" aria-label="Go to start">
            <span className="logo-mark">AB</span>
            <span className="logo-sub">frontend developer</span>
          </a>

          <nav className="nav-desktop">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <div className="nav-socials">
              <a href={`mailto:${contactInfo.email}`} aria-label="Email">
                <MailIcon size={20} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={20} />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon size={20} />
              </a>
            </div>
            <LangToggle id="nav-lang" />
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="mobile-link" onClick={closeMenu}>
              {t(item.key)}
            </a>
          ))}
        </nav>
        <LangToggle id="overlay-lang" />
      </div>
    </>
  );
}
