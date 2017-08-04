const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')

describe('notes component containing the NotesList and NoteForm', () => {

  describe('getNotes', () => {
    it('sends a GET request to the server and receives the JSON notes', () => {
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
})

function requestNotes() {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:3000/notes/', (err, response, body) => {
      if (err) return reject(new Error('Did not successfully receive notes'))
      return resolve(response)
    })
  })
}
