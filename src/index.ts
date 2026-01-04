import Turnish from 'turnish'
import highlightedCodeBlock from './highlighted-code-block'
import strikethrough from './strikethrough'
import tables from './tables'
import taskListItems from './task-list-items'

function gfm(turnish: Turnish) {
  turnish.use([
    highlightedCodeBlock,
    strikethrough,
    tables,
    taskListItems
  ])
}

export { gfm, highlightedCodeBlock, strikethrough, tables, taskListItems }
