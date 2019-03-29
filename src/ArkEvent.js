import { isFunction, upperFirst, getBody } from './toolkit'
import { KEYCODE_TO_EVENT_NAME } from './VK-Keys'

const FOCUS_EVENT_SUPPORTED = document.implementation.hasFeature('FocusEvent', '3.0')
const NormalEvents = (function() {
  let focus = 'focusin'
  let blur = 'focusout'
  if (!FOCUS_EVENT_SUPPORTED) {
    focus = 'DOMFocusIn'
    blur = 'DOMFocusOut'
  }
  // key: value, key是实际event对象的event.type，value是art-template文件里的on-[EVENT_TYPE]
  return {
    [focus]: 'focus',
    [blur]: 'blur'
  }
})()
const KeyEvents = ['keydown']

// 事件回调方法名不要使用onKeydown/onFocus.../on[Native-Envet-Name]
export default class Event {
  constructor() {
    this.__bindEventThis__()
  }
  // 以下三个为顶级默认事件处理函数
  // onKeydown() {}
  // onFocus() {}
  // onBlur() {}
  __bindEventThis__() {
    this.__handleKeyevents__ = this.__handleKeyevents__.bind(this)
    this.__handleNormalEvent__ = this.__handleNormalEvent__.bind(this)
  }
  __bindEvents__() {
    this.__liveEvents__('add')
  }
  __unbindEvents__() {
    this.__liveEvents__('remove')
  }
  __liveEvents__(name) {
    const el = this.el
    const hand = `${name}EventListener`
    for(let j = KeyEvents.length; j--;) {
      el[hand](KeyEvents[j], this.__handleKeyevents__, false)
    }
    for(const k in NormalEvents) {
      if (NormalEvents.hasOwnProperty(k)) {
        el[hand](k, this.__handleNormalEvent__, false)
      }
    }
  }
  __handleKeyevents__(evt) {
    const { keyCode } = evt
    const evtType = KEYCODE_TO_EVENT_NAME[keyCode] || evt.type
    evtType && this.__handleEvents__(evt, evtType)
  }
  __handleNormalEvent__(evt) {
    const { type } = evt
    const evtType = NormalEvents[type]
    evtType && this.__handleEvents__(evt, evtType)
  }
  __handleEvents__(evt, evtType) {
    const body = getBody()
    const proxyEvt = evt.proxied ? evt : proxyEvent(evt)
    const nativeEvtName = proxyEvt.type.toLowerCase()
    const fallbackEvtType = (NormalEvents[nativeEvtName] || nativeEvtName).toLowerCase()
    let el = proxyEvt.target
    const ending = this.el // 到容器了就结束
    do {
      this.__triggerEvent__(
        proxyEvt,
        el,
        el.getAttribute(`on-${evtType}`) || el.getAttribute(`on-${fallbackEvtType}`)
      )
      if (el === ending || el === body) break;
    } while(!proxyEvt.cancelBubble && (el = el.parentNode))
    if (!proxyEvt.cancelBubble) {
      // 没有被阻止，调用默认的onKeydown/onFoucs等onXX
      this.__triggerEvent__(
        proxyEvt,
        el,
        `on${upperFirst(fallbackEvtType)}`
      )
    }
  }
  __triggerEvent__(evt, el, evtName) {
    if (evtName && isFunction(this[evtName])) {
      this[evtName](evt, el)
    }
  }
}

function proxyEvent(evt) {
  evt.proxied = true
  evt.__originalStop__ = evt.stopPropagation
  if (!('cancelBubble' in evt)) {
    evt.cancelBubble = false
  }
  evt.stopPropagation = function() {
    evt.__originalStop__()
    if (!evt.cancelBubble) evt.cancelBubble = true;
  }
  return evt
}