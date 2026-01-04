var highlightRegExp = /highlight-(?:text|source)-([a-z0-9]+)/

export default function highlightedCodeBlock(turndownService: any) {
  turndownService.addRule('highlightedCodeBlock', {
    filter: function (node: any) {
      var firstChild = node.firstChild
      return (
        node.nodeName === 'DIV' &&
        highlightRegExp.test(node.className) &&
        firstChild &&
        firstChild.nodeName === 'PRE'
      )
    },
    replacement: function (content: any, node: any, options: any) {
      var className = node.className || ''
      var language = (className.match(highlightRegExp) || [null, ''])[1]

      return (
        '\n\n' + options.fence + language + '\n' +
        node.firstChild.textContent +
        '\n' + options.fence + '\n\n'
      )
    }
  })
}
