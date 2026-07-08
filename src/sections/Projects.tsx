import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import { projects } from '../data/content';
import './Projects.css';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="my-work" className="section">
      <SectionHeading index="03" title={t('work_title')} />
      <div className="projects-list">
        {projects.map((project) => (
          <TiltCard key={project.number} className="reveal">
            <article className="project-card glass">
              <div className="project-media">
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                <span className="project-number" aria-hidden="true">
                  0{project.number}
                </span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <h4>{t('proj_about')}</h4>
                <p>{t(project.descriptionKey)}</p>
                <h4>{t('proj_tech')}</h4>
                <ul className="tech-tags">
                  {project.tech.split(', ').map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <h4>{t(project.learnedTitleKey)}</h4>
                <p>{t(project.learnedKey)}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                    {t('btn_live')}
                  </a>
                </div>
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
