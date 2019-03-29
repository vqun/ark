import { arkId } from './consts'

export function is(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}
export function isFunction(fn) {
  return is(fn) === 'function'
}

export function upperFirst(s) {
  return s.replace(/^\w/, function(m0) { return m0.toUpperCase() })
}

export function g(salt = 'SALT') {
  return `${Math.random().toString(32).slice(2)}.${salt}`
}

const SIMPLE_HTML_REG = /^<([a-z]\w*)/i
export function insertArkId(html, id) {
  return html.replace(SIMPLE_HTML_REG, function(m0) { return `${m0} ${arkId}="${id}"` })
}

export function getBody() {
  document.body || document.getElementsByTagName('body')[0]
}