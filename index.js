let FLARE = true

const selfClosingTags = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

export default function report(title, str, opts = {}) {
  const { flare = true } = opts
  FLARE = flare

  const bones = selectorSkelly(str)
  const lines = bones.split('\n')
  const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b))
  const titleLine = `${c.pink('┌─')} ${c.b(c.blue(title))}${flare ? ' 🩻' : ''} ${c.pink('─○')}`
  const lastLine = c.pink(`└${'─'.repeat(longestLine.length + 3)}●`)

  return `${titleLine}
${lines.map((line) => `${c.pink('│')} ${line}`).join('\n')}
${lastLine}`
}

export function selectorSkelly(h) {
  const html = h.replace(/<([^>]+)\/>/g, '<$1/>')

  const tags = html.match(/<[^>]+>/g) || []
  let indentLevel = 0
  let formattedHtml = ''

  for (const tag of tags) {
    const isClosing = tag.startsWith('</')
    const tagMatch = tag.match(/^<\/?([\w-]+)/)
    const idMatch = tag.match(/id="([^"]+)"/)
    const classMatch = tag.match(/class="([^"]+)"/)
    const isSelfClosing =
      tag.endsWith('/>') || selfClosingTags.some((selfTag) => tag.startsWith(`<${selfTag}`))

    if (!isClosing && tagMatch) {
      const tagName = tagMatch[1]
      const idSelector = idMatch ? c.red(`#${idMatch[1]}`) : ''
      const classSelector = classMatch ? c.orange(`.${classMatch[1].replace(/\s+/g, '.')}`) : ''
      const selector = `${c.dim('<')}${tagName}${idSelector}${classSelector}${c.dim('>')}`

      formattedHtml += `${'  '.repeat(indentLevel)}${selector}\n`

      if (!isSelfClosing) indentLevel++
    } else if (isClosing && tagMatch) {
      indentLevel = Math.max(indentLevel - 1, 0)
    }
  }

  return formattedHtml.trim()
}

export function tagsSkelly(h, opts = {}) {
  const { attrs = false } = opts
  const html = h.replace(/<([^>]+)\/>/g, '<$1/>')

  const tags = html.match(/<[^>]+>/g) || []
  let indentLevel = 0
  let formattedHtml = ''

  for (const tag of tags) {
    const isClosing = tag.startsWith('</')
    const isSelfClosing =
      tag.endsWith('/>') || selfClosingTags.some((selfTag) => tag.startsWith(`<${selfTag}`))
    const tagMatch = tag.match(/^<\/?([\w-]+)/)
    const insert = attrs ? tag : tag.replace(/ .+/, '>')

    if (!isClosing) {
      if (isSelfClosing) {
        formattedHtml += `${'  '.repeat(indentLevel)}${insert}\n`
      } else {
        formattedHtml += `${'  '.repeat(indentLevel)}${insert}\n`
        indentLevel++
      }
    } else if (tagMatch && isClosing) {
      indentLevel = Math.max(indentLevel - 1, 0)
    }
  }

  return formattedHtml
}

export const c = {
  b(str) {
    return FLARE ? `\x1b[1m${str}\x1b[22m` : str
  },
  color(str, code) {
    return FLARE ? `\x1b[${code}m${str}\x1b[0m` : str
  },
  dim(str) {
    return this.color(str, 2)
  },
  red(str) {
    return this.color(str, 31)
  },
  orange(str) {
    return this.color(str, 33)
  },
  blue(str) {
    return this.color(str, 34)
  },
  pink(str) {
    return this.color(str, 35)
  },
}
