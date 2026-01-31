const production = process.env.NODE_ENV === 'production'

const appConfig = {
    name: process.env.VITE_APP_NAME,
    title: process.env.VITE_SITE_TITLE,
    description: process.env.VITE_SITE_DESCRIPTION,
    url: process.env.VITE_BASE_URL,
    locale: process.env.VITE_DEFAULT_LOCALE,
    theme: process.env.VITE_DEFAULT_THEME,
    production,
  };
  
  export default appConfig;