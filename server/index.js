const express = require('express')
const app = express()
const notes = require('./utils/notes.js')

// app.use(express.static('server/public'))

app.get('/', async (req, res) => {
  const noteList = await notes
  res.send(noteList)
})

app.listen(3000, () => console.log('Listening on 3000...'))
