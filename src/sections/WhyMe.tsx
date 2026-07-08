import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import './WhyMe.css';

export default function WhyMe() {
  const { t } = useLanguage();

  const facts = [
    { icon: '📍', text: t('why_me_located') },
    { icon: '🌍', text: t('why_me_remote') },
    { icon: '💼', text: t('why_me_hybrid') },
  ];

  return (
    <section id="why-me" className="section">
      <SectionHeading index="01" title={t('why_me_title')} />
      <div className="why-me-grid">
        <p className="why-me-intro reveal">{t('why_me_text_1')}</p>
        <div className="why-me-facts">
          <h3 className="reveal">{t('why_me_iam')}</h3>
          <ul>
            {facts.map((fact) => (
              <li key={fact.text} className="glass reveal">
                <span aria-hidden="true">{fact.icon}</span>
                {fact.text}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary reveal">
            {t('why_me_contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
