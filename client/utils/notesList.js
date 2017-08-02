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
    const updatedNotes = await getNotes()
    this.props.updateList(updatedNotes)
  }
  render() {
    return (
      <div className="note-form-container">
        <form onSubmit={this.submitNote}>
          <input name="note-title" className="note-form-title"
            placeholder="Note Title" maxLength="30" required={true}></input>
          <br />
          <textarea name="note-content" className="note-form-textarea"
            maxLength="200" cols="70" rows="10" required={true}></textarea>
          <br />
          <button className="btn btn-default form-button" type="button">Cancel</button>
          <button className="btn btn-default form-button" type="submit">Submit</button>
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
