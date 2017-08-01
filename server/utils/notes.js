const { knexSelectAll } = require('./knexCommands.js')

async function getNotes() {
  let notes
  try {
    notes = await knexSelectAll('notes')
  }
  catch (error) {
    console.log(error)
  }
  return notes
}

module.exports = getNotes()
