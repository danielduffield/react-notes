import React from 'react'

export default class NotesComponent extends React.Component {
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
    console.log('Main Component renders')
    return (
      <div>
        <NotesList notes={this.state.notes} updateList={this.updateList}/>
        <NoteForm notes={this.state.notes} updateList={this.updateList}/>
      </div>
    )
  }
}

class NotesList extends React.Component {
  constructor(props) {
    super(props)
    this.deleteNote = this.deleteNote.bind(this)
  }
  async deleteNote(event) {
    const noteToDelete = event.target.dataset.noteid
    const response = await fetch('http://localhost:3000/delete-note/' + noteToDelete, {
      method: 'DELETE'
    })
    console.log(response)
    const notesList = this.props.notes
    const deleteIndex = notesList.findIndex(note => note.id === parseInt(noteToDelete, 10))
    console.log('delete index: ', deleteIndex)
    const updatedNotes = [...notesList.slice(0, deleteIndex), ...notesList.slice(deleteIndex + 1, notesList.length)]
    console.log(updatedNotes)
    this.props.updateList(updatedNotes)
  }
  render() {
    console.log('prop notes ', this.props.notes)
    return (
      <div className="note-container">
        {this.props.notes
          .map((note, index) => {
            return (
              <div className="note-container" key={index}>
                <h4 className="note-title">
                  <span className="note-id">#{note.id}</span>
                  {note.title}
                  <button data-noteid={note.id} type="button"
                    className="delete-button" onClick={this.deleteNote}>X</button>
                </h4>
                <div className="note-text-container">
                  <p className="note-content">{note.content}</p>
                </div>
              </div>
            )
          })
        }
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
    const response = await fetch('http://localhost:3000/note-submit-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(noteData)
    })
    const insertedNote = await response.json()
    this.props.updateList([...this.props.notes, ...insertedNote])
  }
  render() {
    return (
      <div className="note-form-container">
        <h4>Submit a New Note</h4>
        <form onSubmit={this.submitNote}>
          <input name="note-title" className="note-form-title"
            placeholder="Note Title" maxLength="30" required={true}></input>
          <br />
          <textarea name="note-content" className="note-form-textarea"
            maxLength="200" cols="70" rows="10" required={true}></textarea>
          <br />
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
