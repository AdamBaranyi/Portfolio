import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import { contactInfo } from '../data/content';
import { MailIcon, PhoneIcon, SendIcon } from '../components/icons';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
}

type FieldName = keyof FormData;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm: FormData = { name: '', email: '', message: '', privacy: false };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const errors: Partial<Record<FieldName, string>> = {};
  if (!form.name.trim()) errors.name = t('error_name');
  if (!EMAIL_PATTERN.test(form.email)) errors.email = t('error_email');
  if (!form.message.trim()) errors.message = t('error_message');
  if (!form.privacy) errors.privacy = t('error_privacy');

  const isValid = Object.keys(errors).length === 0;

  const touch = (field: FieldName) => setTouched((prev) => ({ ...prev, [field]: true }));

  const showError = (field: FieldName) => touched[field] && errors[field];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || status === 'sending') return;

    setStatus('sending');
    try {
      const body = new FormData();
      body.append('name', form.name);
      body.append('email', form.email);
      body.append('message', form.message);
      body.append('privacy', 'on');

      const res = await fetch('contact.php', { method: 'POST', body });
      const data = await res.json();
      if (!data.success) throw new Error('send failed');

      setStatus('success');
      setForm(emptyForm);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeading index="04" title={t('contact_title')} />
      <div className="contact-grid">
        <div className="contact-text reveal">
          <h3>{t('contact_subtitle')}</h3>
          <p>{t('contact_text')}</p>
          <p>
            {t('contact_text_2')} <strong>{t('contact_text_2_strong')}</strong>
          </p>
          <div className="contact-details">
            <a href={`mailto:${contactInfo.email}`}>
              <MailIcon size={18} />
              {contactInfo.email}
            </a>
            <a href={contactInfo.phoneHref}>
              <PhoneIcon size={18} />
              {contactInfo.phone}
            </a>
          </div>
        </div>

        <form className="contact-form glass reveal" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t('ph_name')}
              aria-label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => touch('name')}
              className={showError('name') ? 'invalid' : ''}
            />
            {showError('name') && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('ph_email')}
              aria-label="E-Mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => touch('email')}
              className={showError('email') ? 'invalid' : ''}
            />
            {showError('email') && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              rows={5}
              placeholder={t('ph_message')}
              aria-label="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onBlur={() => touch('message')}
              className={showError('message') ? 'invalid' : ''}
            />
            {showError('message') && <span className="error-msg">{errors.message}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={form.privacy}
                onChange={(e) => {
                  setForm({ ...form, privacy: e.target.checked });
                  touch('privacy');
                }}
              />
              <span>
                {t('privacy_consent_1')}{' '}
                <a href="#/privacy" className="privacy-link">
                  {t('privacy_policy')}
                </a>{' '}
                {t('privacy_consent_2')}
              </span>
            </label>
            {showError('privacy') && <span className="error-msg">{errors.privacy}</span>}
          </div>

          {status === 'success' && <p className="form-feedback success">{t('success_message')}</p>}
          {status === 'error' && <p className="form-feedback error">{t('error_send')}</p>}

          <button type="submit" className="btn btn-primary" disabled={!isValid || status === 'sending'}>
            {status === 'sending' ? t('btn_sending') : t('btn_send')}
            <SendIcon />
          </button>
        </form>
      </div>
    </section>
  );
}
