/* eslint-disable no-unused-vars */
import React from 'react'

export default class NotesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notes: []}
  }
  async componentDidMount() {
    const notes = await getNotes()
    console.log('notes', notes)
    this.setState({ notes })
  }
  render() {
    return (
      <div className="note-container">
        {this.state.notes
          .map((note, index) => {
            return (
              <div className="note-container" key={index}>
                <h4 className="note-title"><span className="note-id">#{note.id}</span>{note.title}</h4>
                <div className="note-text-container">
                  <p className="note-content">{note.content}</p>
                </div>
              </div>
            )
          })
        }
        <NoteForm/>
      </div>
    )
  }
}

class NoteForm extends React.Component {
  render() {
    return (
      <div className="note-form-container">
        <form onSubmit={submitNote}>
          <input name="note-title"></input>
          <br />
          <textarea name="note-content" className="note-form-textarea"></textarea>
          <br />
          <button className="btn btn-default" type="button">Cancel</button>
          <button className="btn btn-default" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

async function getNotes() {
  const fetchedNotes = await fetch('http://localhost:3000/notes/')
  const notes = await fetchedNotes.json()
  return notes
}

function extractFormData(event) {
  const form = new FormData(event.target)
  const noteData = {
    title: form.get('note-title'),
    content: form.get('note-content')
  }
  return noteData
}

async function submitNote(event) {
  console.log('Submitted')
  event.preventDefault()
  const noteData = extractFormData(event)
  console.log('note data: ', noteData)
  const response = await fetch('http://localhost:3000/note-submit-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(noteData)
  })
  const currentId = await response.json()
  console.log(currentId)
}
