const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const express = require('express')
const app = express()

const getNotes = require('./utils/getNotes.js')
const { getNextNoteId, incrementNextId } = require('./utils/noteId.js')
const { knexInsert, knexDelete } = require('./utils/knexCommands.js')

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/notes/', async (req, res) => {
  const noteList = await getNotes()
  const jsonNotes = JSON.stringify(noteList)

  res.send(jsonNotes)
})

app.post('/note-submit-request/', async (req, res) => {
  const current = getNextNoteId()
  const noteData = req.body
  noteData.id = current
  incrementNextId()
  const updatedNotes = await knexInsert('notes', noteData)
  res.status(201).json(updatedNotes)
})

app.delete('/delete-note/:id', (req, res) => {
  const noteToDelete = parseInt(req.params.id, 10)
  knexDelete('notes', 'id', noteToDelete).then(() => {
    res.sendStatus(204)
  })
})

app.listen(process.env.LISTEN_PORT, () => console.log('Listening on 3000...'))
