import { useLanguage } from '../i18n/LanguageContext';
import { contactInfo } from '../data/content';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          <a href={contactInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon size={24} />
          </a>
          <a href={`mailto:${contactInfo.email}`} aria-label="Email">
            <MailIcon size={24} />
          </a>
          <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={24} />
          </a>
        </div>
        <nav className="footer-links">
          <a href="#/imprint">{t('imprint')}</a>
          <a href="#/privacy">{t('privacy_policy')}</a>
        </nav>
        <span className="footer-copy">© Adam Baranyi {year}</span>
      </div>
    </footer>
  );
}
