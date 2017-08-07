const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')

describe('notes component containing the NotesList and NoteForm', () => {

  describe('server responses to GET requests at /notes/', () => {
    it('responds with the JSON notes', done => {
      const fetchedNotes = requestNotes()
      fetchedNotes
        .then(response => {
          const notes = JSON.parse(response.body)
          expect(notes).to.be.an('array')
          if (notes.length) {
            for (let i = 0; i < notes.length; i++) {
              expect(notes[i]).to.be.an('object')
            }
          }
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

function requestNotes() {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:3000/notes/', (err, response, body) => {
      if (err) return reject(new Error(err))
      return resolve(response)
    })
  })
}
