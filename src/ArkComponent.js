import template from './ark-template'
import Event from './ArkEvent'
import { g, insertArkId } from './toolkit'
import { ComponentSet, peelArkComponents } from './ArkManager'

// Component art: 必须是一个独立的元素包裹
export default class Component extends Event {
  constructor(props) {
    super()
    this.props = props || {}
    this.data = {}

    this.id = g('ark')
    const __template__ = this.render() || ''
    this.__renderer__ = template.compile(__template__.replace('{{children}}', this.props.children || ''))
    this.__components__ = []
    this.__updatePropsCursor__ = 0

    // 绑定this
    this.bind()
  }
  // <InterfaceAPI>
  // <InitAPI>
  willMount() {}
  didMount() {}
  // </InitAPI>
  // <LifeAPI>
  render() {
    return ''
  }
  setData(patch) {
    const nextData = {
      ...this.data,
      ...(patch || {})
    }
    this.__doUpdate__(nextData)
    this.data = nextData
  }
  // </LifeAPI>
  // <UpateAPI>
  willUpdate() {}
  willReceiveProps() {}
  didUpdate() {}
  // </UpateAPI>

  bind() {}
  // </InterfaceAPI>

  // <PrivateAPI>
  toString() {
    return this.__render__()
  }
  __render__(data = this.data) {
    return insertArkId(
      this.__renderer__({
        ...this.props,
        ...data,
        ...(this.constructor.components || {}),
        __self__: this,
        __template__: template
      }).trim(),
      this.id
    )
  }
  __willMount__() {
    this.willMount()
    this.__do__('__willMount__')
  }
  __didMount__() {
    this.el = ComponentSet[this.id]
    this.__bindEvents__()
    this.didMount()
    this.__do__('__didMount__')
    this.__updatePropsCursor__ = 0
  }
  __willUpdate__() {
    this.willUpdate()
    this.__do__('__willUpdate__')
    this.__unbindEvents__()
  }
  __didUpdate__() {
    this.el = ComponentSet[this.id]
    this.didUpdate()
    this.__do__('__didUpdate__')
    this.__bindEvents__()
    this.__updatePropsCursor__ = 0
  }
  __doUpdate__(data = this.data) {
    this.__willUpdate__()
    const html = this.__render__(data)
    const newEl = this.__buildEl__(html)
    this.el.parentNode.replaceChild(newEl, this.el)
    peelArkComponents(ComponentSet[this.id] = newEl)
    this.__didUpdate__()
  }

  __willReceiveProps__(nextProps) {
    this.willReceiveProps(nextProps)
    this.props = nextProps
  }

  __buildEl__(html) {
    const proxy = document.createElement('div')
    proxy.innerHTML = html
    return proxy.firstChild
  }
  __do__(name, ...args) {
    const __components__ = this.__components__
    for (let k = __components__.length; k--;) {
      __components__[k][name](...args)
    }
  }

  __renderComponent__(Type, props) {
    let component = this.__components__[this.__updatePropsCursor__++]
    if (!!component) {
      component.__willReceiveProps__(props)
    } else {
      this.__components__.push(component = new Type(props))
    }
    return component
  }
  // </PrivateAPI>
}
// 定义该组件有哪些子组件，子组件是一个组件类，不是实例
Component.components = {}