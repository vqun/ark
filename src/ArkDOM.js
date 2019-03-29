import { peelArkComponents } from './ArkManager'

const ArkDOM = {}

ArkDOM.render = function(
  element,
  container = document.getElementsByTagName('body')[0],
  callback = () => void(0)
) {
  if (!container || container.nodeType !== 1) return;
  // const el = new Element
  element.__willMount__()
  // container.innerHTML += element
  container.appendChild(generateDom(element))
  peelArkComponents(container)
  element.__didMount__()
  callback()
}

function generateDom(element) {
  const proxy = document.createElement('div')
  proxy.innerHTML = element
  return proxy.firstChild
}

export default ArkDOM