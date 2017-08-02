const { knexSelectAll } = require('./knexCommands.js')

async function getNotes() {
  const notes = await knexSelectAll('notes')
  return notes
}

module.exports = getNotes
