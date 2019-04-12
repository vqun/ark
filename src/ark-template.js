import template from 'art-template/lib/template-web'

const rule = {
  test: /<x\-([a-z]\w*)(?:\s+((?:\S|\s)*?))?(?:\/|(?:>((?:\S|\s)*?)<\/x\-\1))>/gim, // 第二个\s，可以\r|\n|\f
  use: function(match, Plugin, props, children) {
    const hasChildren = !!children
    const propsString = stringifyProps(
      props || '',
      hasChildren ? `__template__.render('${children.replace(/(?:\r|\n)/gm, '\\n').replace(/\'/gm, '\\\'')}', $data)` : '""'
    )
    return {
      // code: `(__self__ ? __self__.__components__[__self__.__components__.push(new ${Plugin}(${propsString})) - 1] : '')`,
      code: `(__self__ ? __self__.__renderComponent__(${Plugin}, ${propsString}) : '')`,
      output: 'raw'
    }
  }
}

const PROPS_REG_EXP = /([a-z]\w*)(?:\=(["'])({{)?\s*(.*?)\s*(}})?\2)?/gim

    function stringifyProps(propsString, children) {
      PROPS_REG_EXP.lastIndex = 0
      const props = [`children:${children}`]
      let match, isArtVar
      while (match = PROPS_REG_EXP.exec(propsString)) {
        isArtVar = false
        if (match[3] && match[5]) {
          isArtVar = true
        }

        const v = match[4]
        props.push(`${match[1]}:${isArtVar ? v : transform(v)}`)
      }
      return `{${props.join(',')}}`
    }

    function transform(v) {
      if (/^\d+$/.test(v)) {
        return Number(v)
      }
      if (!v || v === 'true') {
        return true
      }
      if (v === 'false') {
        return false
      }
      return `"${v}"`
    }

template.defaults.rules.unshift(rule)
export default template