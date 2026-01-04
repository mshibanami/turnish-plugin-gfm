export default function strikethrough(turndownService: any) {
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: function (content: any) {
      return '~~' + content + '~~'
    }
  })
}
