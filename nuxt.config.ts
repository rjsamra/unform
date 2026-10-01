// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-04-27',
  devtools: { enabled: true },
  // Load fonts via CSS link at runtime instead of @nuxt/fonts download-at-build,
  // so Docker builds work on servers that cannot reach fonts.gstatic.com.
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: ['~~/server/utils/**/*.ts'],
    },
  },
  app: {
    head: {
      title: 'Unform - Form Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple form management solution' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    db: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgrespw',
      database: 'unform',
    },
    delayResponse: false,
    public: {
      host: 'http://localhost:3000',
    },
  },
});
