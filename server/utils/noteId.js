const fs = require('fs')
const path = require('path')

const noteIdPath = path.join(__dirname, '../nextNoteId.txt')

function getNextNoteId() {
  return fs.readFileSync(noteIdPath, 'utf8')
}

function incrementNextId() {
  const currentId = getNextNoteId()
  fs.writeFileSync(noteIdPath, parseInt(currentId, 10) + 1, 'utf8')
}

module.exports = {
  getNextNoteId: getNextNoteId,
  incrementNextId: incrementNextId
}
