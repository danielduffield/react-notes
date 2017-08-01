const { knexSelectAll } = require('./knexCommands.js')

async function getNotes() {
  let notes
  try {
    notes = await knexSelectAll('notes')
  }
  catch (error) {
    console.log(error)
  }
  console.log(notes)
  return notes
}

const notes = getNotes()
console.log(notes)

module.exports = notes
