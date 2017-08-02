const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const express = require('express')
const app = express()

const getNotes = require('./utils/getNotes.js')
const { getNextNoteId, incrementNextId } = require('./utils/noteId.js')
const { knexInsert } = require('./utils/knexCommands.js')

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/notes/', async (req, res) => {
  const noteList = await getNotes()
  const jsonNotes = JSON.stringify(noteList)

  res.send(jsonNotes)
})

app.post('/note-submit-request/', (req, res) => {
  const current = getNextNoteId()
  const noteData = req.body
  noteData.id = current
  incrementNextId()
  knexInsert('notes', noteData)
    .then(() => {
      res.sendStatus(201)
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => console.log('Listening on 3000...'))
