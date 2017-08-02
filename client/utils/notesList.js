/* eslint-disable no-unused-vars */
import React from 'react'

export default class NotesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
    this.updateList = this.updateList.bind(this)
  }
  async componentDidMount() {
    const notes = await getNotes()
    console.log('notes', notes)
    this.setState({ notes })
  }
  updateList(newState) {
    this.setState({notes: newState})
  }
  render() {
    console.log('list renders')
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
        <NoteForm updateList={this.updateList}/>
      </div>
    )
  }
}

class NoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.submitNote = this.submitNote.bind(this)
  }
  async submitNote(event) {
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
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    const updatedNotes = await getNotes()
    console.log(updatedNotes)
    this.props.updateList(updatedNotes)
  }
  render() {
    return (
      <div className="note-form-container">
        <form onSubmit={this.submitNote}>
          <input name="note-title" placeholder="Note Title"></input>
          <br />
          <textarea name="note-content" className="note-form-textarea" placeholder="Note Text"></textarea>
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
