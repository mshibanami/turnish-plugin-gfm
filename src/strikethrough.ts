import Turnish from "turnish"

export default function strikethrough(turnish: Turnish) {
  turnish.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: function (content: any) {
      return '~~' + content + '~~'
    }
  })
}
