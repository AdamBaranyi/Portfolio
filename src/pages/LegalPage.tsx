import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { contactInfo } from '../data/content';
import { ArrowLeftIcon } from '../components/icons';
import './LegalPage.css';

function Imprint() {
  const { t } = useLanguage();
  const { address, email, phone, phoneHref } = contactInfo;

  return (
    <>
      <h1>{t('imprint_heading')}</h1>
      <p>
        <strong>{address.name}</strong>
        <br />
        {address.street}
        <br />
        {address.city}
        <br />
        {address.country}
      </p>
      <p>
        <strong>{t('contact_label')}</strong>
        <br />
        {t('email_label')} <a href={`mailto:${email}`}>{email}</a>
        <br />
        {t('phone_label')} <a href={phoneHref}>{phone}</a>
      </p>
    </>
  );
}

function Privacy() {
  const { t } = useLanguage();

  return (
    <>
      <h1>{t('privacy_heading')}</h1>

      <h2>{t('pp_1_title')}</h2>
      <h3>{t('pp_general_info')}</h3>
      <p>{t('pp_general_info_text')}</p>

      <h3>{t('pp_data_recording')}</h3>
      <p className="pre-line">{t('pp_controller')}</p>
      <p className="pre-line">{t('pp_how_record')}</p>
      <p>{t('pp_other_data')}</p>
      <p className="pre-line">{t('pp_purpose')}</p>

      <h2>{t('pp_2_title')}</h2>
      <p>{t('pp_hosting_intro')}</p>
      <h3>{t('pp_external_hosting')}</h3>
      <p>{t('pp_external_hosting_text')}</p>

      <h2>{t('pp_3_title')}</h2>
      <h3>{t('pp_data_protection')}</h3>
      <p>{t('pp_data_protection_text1')}</p>
      <p>{t('pp_data_protection_text2')}</p>
      <p>{t('pp_data_protection_text3')}</p>
    </>
  );
}

export default function LegalPage({ page }: { page: 'imprint' | 'privacy' }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <main className="legal-page">
      <a href="#/" className="back-link">
        <ArrowLeftIcon size={22} />
        {t('back_home')}
      </a>
      <article className="legal-body glass">
        {page === 'imprint' ? <Imprint /> : <Privacy />}
      </article>
    </main>
  );
}
