import { useLanguage } from '../i18n/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-greeting reveal">{'<hello world />'}</p>
          <h1 className="reveal">
            Adam <span>Baranyi</span>
          </h1>
          <h2 className="reveal">{t('hero_title')}</h2>
          <p className="hero-location reveal">Luzern, Schweiz</p>
        </div>
        <div className="hero-photo reveal">
          <div className="photo-ring" aria-hidden="true" />
          <img src="/assets/img/adam-photo-sharp.webp" alt="Adam Baranyi" fetchPriority="high" />
        </div>
      </div>

      <a href="#why-me" className="scroll-hint" aria-label={t('hero_scroll')}>
        <span>{t('hero_scroll')}</span>
        <div className="scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
