import Vue from 'vue'
import config from '@/app.config'
import lang from '@/lang'

const COOKIE_KEY = 'uno_locale'
const DEFAULT_LOCALE = 'en'
const FALLBACK_LOCALE = 'en'

/**
 * Метод получения перевода строки
 * @param key
 * @param params
 * @returns {string}
 */
const $t = (key, params) => {
  let str = _getLangString(key)
  if (params) {
    Object.keys(params).forEach(key => {
      const regexp = new RegExp(`{${key}}`, 'g')
      str = str.replace(regexp, params[key])
    })
  }
  if (!params && /{.+}/.test(str)) {
    console.warn(`String ${key} doesn't have params.`)
  }
  return str
}

/**
 * Метод получения перевода со склонением
 * @param key
 * @param number
 * @returns {string}
 */
const $tc = (key, number) => {
  const str = _getLangString(key)
  if (typeof number !== 'number') {
    return str
  }
  const options = str.replace(/{n}/g, number).split('|')
  return options[_getChoiceIndex(number)] || options[options.length - 1]
}

/**
 * Системный объект с информацией о локализации
 * @type { {locales: array, locale: string, messages: object} }
 */
const $i18n = {
  // Current locale
  locale: _getCookie(COOKIE_KEY) || DEFAULT_LOCALE,
  // Available locales in project
  locales: config.locales,
  // Object (Proxy) with translations
  messages: lang
}

Vue.prototype.$t = $t
Vue.prototype.$tc = $tc
Vue.prototype.$i18n = $i18n

// helpers
function _getCookie (name) {
  if (process.server) {
    return undefined
  }
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function _getLangString (key) {
  const chain = `['${key.replace(/\./g, '\'][\'')}']`
  try {
    // eslint-disable-next-line no-eval
    const res = eval(`$i18n.messages['${$i18n.locale}']${chain}`)
    if (typeof res === 'string') {
      return res
    }
    throw new Error(`String ${key} doesn't exist in ${$i18n.locale} locale`)
  } catch (e) {
    console.warn(e.message)
    try {
      // eslint-disable-next-line no-eval
      const res = eval(`$i18n.messages['${FALLBACK_LOCALE}']${chain}`)
      if (typeof res === 'string') {
        return res
      }
      throw new Error(`String ${key} doesn't exist in fallback (${FALLBACK_LOCALE}) locale`)
    } catch (e) {
      console.warn(e.message)
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return key
    }
  }
}

function _getChoiceIndex (n) {
  return n === 0 ? 0 : n % 10 === 1 && n % 100 !== 11 ? 1 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 2 : 3
}
