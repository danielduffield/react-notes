const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const express = require('express')
const app = express()

const notes = require('./utils/notes.js')
const { getNextNoteId } = require('./utils/noteId.js')

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/notes/', async (req, res) => {
  const noteList = await notes
  const jsonNotes = JSON.stringify(noteList)

  res.send(jsonNotes)
})

app.post('/note-submit-request/', (req, res) => {
  const current = getNextNoteId()
  res.status(201).json(current)
})

app.listen(3000, () => console.log('Listening on 3000...'))
