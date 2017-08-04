const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')

describe('notes component containing the NotesList and NoteForm', () => {

  describe('server responses to GET requests at /notes/', () => {
    it('responds with the JSON notes', () => {
      const fetchedNotes = requestNotes()
      fetchedNotes.then(notes => {
        expect(notes).to.be.an('array')
        if (notes.length) {
          for (let i = 0; i < notes.length; i++) {
            expect(notes[i]).to.be.an('object')
          }
        }
      })
    })
  })

  describe('server response to POST request at /note-submit-request/', () => {
    it('responds with an object corresponding to the latest note', () => {
      const postedNote = submitNote()
      postedNote.then(note => {
        expect(note).to.be.an('object')
        expect(note.content).to.equal('Mocha Test Note Content')
      })
    })
  })
})

function requestNotes() {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:3000/notes/', (err, response, body) => {
      if (err) return reject(new Error('Unable to acquire notes'))
      return resolve(response)
    })
  })
}

function submitNote() {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'http://localhost:3000/note-submit-request',
      noteData: {
        title: 'Mocha Test Note Title',
        content: 'Mocha Test Note Content'
      }
    },
    (err, response, body) => {
      if (err) return reject(new Error('Unable to submit a note'))
      return resolve(response)
    })
  })
}
