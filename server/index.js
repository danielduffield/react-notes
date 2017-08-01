const express = require('express')
const app = express()
const notes = require('./utils/notes.js')
const { getNextNoteId } = require('./noteId.js')

app.use(express.static('server/public'))

app.get('/notes/', async (req, res) => {
  const noteList = await notes
  const jsonNotes = JSON.stringify(noteList)
  res.send(jsonNotes)
})

app.post('/note-submit-request/', (req, res) => {
  const current = getNextNoteId()
  res.send(current)
})

app.listen(3000, () => console.log('Listening on 3000...'))
