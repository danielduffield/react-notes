const { knexSelect } = require('./knexCommands.js')

async function getNotes() {
  let notes
  try {
    notes = await knexSelect('notes')
  }
  catch (error) {
    console.log(error)
  }
  return notes
}

module.exports = getNotes()
