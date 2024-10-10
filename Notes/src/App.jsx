import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Note from './components/Note'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const objNote = {
      content: newNote,
      important: Math.random() < 0.5
    }
    if (newNote.trim() === "") {
      alert('There is not name')
    } else {
      axios.post('http://localhost:3001/notes', objNote)
        .then(response => {
          setNotes(notes.concat(response.data))
          setNewNote('')
        })
    }
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


  const toogleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })

  }
  return (
    <>
      <h1>
        Notes
      </h1>
      <ul>
        {
          notesToShow.map((note) => {
            return <Note key={note.id} note={note} toogleImportance={() => toogleImportance(note.id)} />
          })
        }
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'filter' : 'All'}</button>
      </div>
      <div className='container-form'>
        <form onSubmit={addNote}>
          <input type="text" value={newNote} onChange={handleChange} />
          <button type='submit'>Add</button>
        </form>
      </div>

    </>
  )
}

export default App
