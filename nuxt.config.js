const pkg = require('./package')

module.exports = {
  mode: 'spa',

  // server: {
  //   port: 3030
  // },

  router: {
    mode: 'hash'
    // base: process.env.NODE_ENV === 'production' ? '/projects/uno' : '/'
  },

  env: {
    isDev: false
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'UNO the game online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/vnd.microsoft.icon', size: '16x16 32x32 48x48 64x64', href: './favicon.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Fugaz+One' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#C81F45' },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: '@/assets/scss/variables/_index.scss'
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/i18n'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (!ctx.isDev) {
        // relative links, please.
        config.output.publicPath = './_nuxt/'
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      return config
    }
  }
}
