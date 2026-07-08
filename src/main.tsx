import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext';
import App from './App';
import './index.css';

// little easter egg for fellow devs peeking into the console
console.info(
  '%c🐕🐕 Jupiter & Kepler waren hier.%c\n' +
    'Die zwei kleinen Planeten in der 3D-Szene sind nach meinen Whippets benannt —\n' +
    'Jupiter wie der Planet, Kepler wie der Astronom.\n' +
    '(The two little planets in the 3D scene are named after my whippets.)',
  'color:#b5e93b;font-size:14px;font-weight:bold;',
  'color:#93a186;',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
