export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // About section
    'about.title': "Hi, I'm Jose Ávila",
    'about.desc': "Developer and former designer who enjoys building things, hitting drums, and thinking about life's big questions. Always eager to learn something new and figure out how things work.",

    // Links and navigation
    'nav.profile': 'Profile',
    'nav.resume': 'Resume',
    'nav.contact': 'contact me',

    // Lab section
    'lab.title': 'Lab',
    'lab.desc': "Here you can view some of my personal work and experiments, and why not? some fails",

    // Code repository section
    'repo.title': 'Code repository',
    'repo.desc': 'I got (almost) all my code for free view in case if you want to get deep on my work as developer',

    // Basic info
    'info.yearsOld': 'Years old',
    'info.location': 'Santiago, Chile',

    // Dribbble
    'dribbble.shots': 'shots',
  },
  es: {
    // About section
    'about.title': 'Hola, soy Jose Ávila',
    'about.desc': 'Desarrollador y ex-diseñador que disfruta construyendo cosas, tocando batería y pensando en las grandes preguntas de la vida. Siempre dispuesto a aprender algo nuevo y descubrir cómo funcionan las cosas.',

    // Links and navigation
    'nav.profile': 'Perfil',
    'nav.resume': 'Currículum',
    'nav.contact': 'contáctame',

    // Lab section
    'lab.title': 'Laboratorio',
    'lab.desc': 'Aquí puedes ver algunos de mis trabajos personales y experimentos, y ¿por qué no? algunos fallos',

    // Code repository section
    'repo.title': 'Repositorio de código',
    'repo.desc': 'Tengo (casi) todo mi código disponible para ver, por si quieres profundizar en mi trabajo como desarrollador',

    // Basic info
    'info.yearsOld': 'Años',
    'info.location': 'Santiago, Chile',

    // Dribbble
    'dribbble.shots': 'shots',
  },
} as const;

export type TranslationKey = keyof typeof ui[typeof defaultLang];
