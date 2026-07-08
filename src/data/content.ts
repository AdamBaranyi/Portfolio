import type { TranslationKey } from '../i18n/translations';

export interface Project {
  number: number;
  title: string;
  descriptionKey: TranslationKey;
  learnedTitleKey: TranslationKey;
  learnedKey: TranslationKey;
  tech: string;
  image: string;
  github: string;
  live: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export const projects: Project[] = [
  {
    number: 1,
    title: 'Project Join',
    descriptionKey: 'proj_join_desc',
    learnedTitleKey: 'proj_experience',
    learnedKey: 'proj_join_learned',
    tech: 'JavaScript, HTML, CSS, Git, Firebase',
    image: '/assets/img/Join1x.webp',
    github: 'https://github.com/AdamBaranyi/Join-Gruppenarbeit',
    live: 'https://join.adambaranyi.xyz',
  },
  {
    number: 2,
    title: 'Project Pollo Loco',
    descriptionKey: 'proj_pollo_desc',
    learnedTitleKey: 'proj_learned',
    learnedKey: 'proj_pollo_exp',
    tech: 'JavaScript, HTML, CSS, OOP',
    image: '/assets/img/Pollolocob1x.webp',
    github: 'https://github.com/AdamBaranyi/El-Pollo-Loco',
    live: 'https://polloloco.adambaranyi.xyz',
  },
  {
    number: 3,
    title: 'Project Pokedex',
    descriptionKey: 'proj_poke_desc',
    learnedTitleKey: 'proj_learned',
    learnedKey: 'proj_poke_learned',
    tech: 'JavaScript, HTML, CSS, REST API',
    image: '/assets/img/Pokedex1x.webp',
    github: 'https://github.com/AdamBaranyi/Pokedex',
    live: 'https://pokedex.adambaranyi.xyz',
  },
];

export const skills: Skill[] = [
  { name: 'React', icon: '/assets/img/React.svg' },
  { name: 'Angular', icon: '/assets/img/Angular.svg' },
  { name: 'TypeScript', icon: '/assets/img/Typescript.svg' },
  { name: 'JavaScript', icon: '/assets/img/Javascript.svg' },
  { name: 'HTML', icon: '/assets/img/Html.svg' },
  { name: 'CSS', icon: '/assets/img/Css.svg' },
  { name: 'REST-API', icon: '/assets/img/Rest-Api.svg' },
  { name: 'Supabase', icon: '/assets/img/Supabase.svg' },
  { name: 'Git', icon: '/assets/img/Git.svg' },
  { name: 'Scrum', icon: '/assets/img/Scrum.svg' },
  { name: 'Material design', icon: '/assets/img/Material Design.svg' },
];

export const contactInfo = {
  email: 'baranyiadam27@icloud.com',
  phone: '+41 78 812 99 89',
  phoneHref: 'tel:+41788129989',
  github: 'https://github.com/AdamBaranyi',
  linkedin: 'https://www.linkedin.com/in/adam-baranyi123',
  address: {
    name: 'Adam Baranyi',
    street: 'Luzernerstrasse 141G',
    city: '6014 Luzern',
    country: 'Switzerland',
  },
};
