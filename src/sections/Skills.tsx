import type { CSSProperties } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import { skills } from '../data/content';
import './Skills.css';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section">
      <SectionHeading index="02" title={t('skills_title')} />
      <p className="skills-intro reveal">{t('skills_text')}</p>
      <ul className="skills-grid">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="skill-card glass reveal"
            style={{ '--skill-color': skill.color } as CSSProperties}
          >
            <img src={skill.icon} alt="" loading="lazy" />
            <span>{skill.name}</span>
          </li>
        ))}
        <li className="skill-card challenge glass reveal">
          <img src="/assets/img/Challenge me.svg" alt="" loading="lazy" />
          <span>{t('challenge_me')}</span>
          <p>{t('skills_motivation')}</p>
        </li>
      </ul>
    </section>
  );
}
