import config from '../app.config'

const lang = {}
config.locales.forEach(locale => {
  let localeLang = {}

  try {
    localeLang = require(`./${locale}.js`).default
  } catch (e) {
    console.warn(e)
  }

  lang[locale] = localeLang
})

export default lang
