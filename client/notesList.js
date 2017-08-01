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
                <span className="note-id">{note.id}</span>
                <h3 className="note-title">{note.title}</h3>
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

async function getNotes() {
  const fetchedNotes = await fetch('http://localhost:3000/notes/')
  const notes = await fetchedNotes.json()
  return notes
}
