import { arkId } from './consts'

let Manager, ComSet
if (!window.Manager) {
  ComSet = {}

  Manager = {
    ComponentSet: ComSet,
    peelArkComponents
  }
}

export default window.__Manager__ || (window.__Manager__ = Manager)
export const ComponentSet = window.__Manager__.ComponentSet

export function peelArkComponents(container) {
  const comSet = window.__Manager__.ComponentSet
  const all = container.getElementsByTagName('*')
  for (let k = all.length; k--;) {
    const el = all[k]
    const id = el.getAttribute(arkId)
    if (id) {
      comSet[id] = el
    }
  }
}