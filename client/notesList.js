import React from 'react'

export default class NotesList extends React.Component {
  constructor(props, notes) {
    super(props)
    this.state = {notes: []}
  }
  async componentDidMount() {
    const notes = await getNotes()
    this.setState({ notes })
  }
  render() {
    return (
      this.state.notes.map((note, index) => {
        return (
          <div key={index}>
            <span className="note-id">{note.id}</span>
            <h3 className="note-title">{note.title}</h3>
            <div className="note-container">
              <p className="note-content">{note.content}</p>
            </div>
          </div>
        )
      })
    )
  }
}

async function getNotes() {
  const fetchedNotes = await fetch('http://localhost:3000')
  return fetchedNotes
}
