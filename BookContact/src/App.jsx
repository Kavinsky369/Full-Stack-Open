import './Styles/App.css'
import { useState } from "react"

function App() {

  const [person, setPerson] = useState([
    { name: 'Daniel', number: '56 3054 8812', id: 1 },
  
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFind, setNameFind] = useState('')
  const [idEdit, setIdEdit] = useState(null)

  const handleForm = (event) => {
    event.preventDefault();
    if (idEdit != null) {
      const updatedContacts = person.map(contact => {
        return contact.id === idEdit ? { ...contact, name: newName, number: newNumber } : contact
      })
      setPerson(updatedContacts)
      setIdEdit(null)
    } else {
      const objContact = {
        name: newName,
        number: newNumber,
        id: person.length + 1
      }
      if (newName.trim() == '') {
        return
      } else if (person.find((x) => x.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPerson(person.concat(objContact))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFind = (event) => {
    setNameFind(event.target.value)
  }

  const filteredContacts = person.filter(contact =>
    contact.name.toLocaleLowerCase().includes(nameFind.toLocaleLowerCase())
  )

  const handleEliminate = (id) => {
    const updateContacts = person.filter(contact => contact.id !== id);
    setPerson(updateContacts)
  }

  const handleUpdate = (id) => {
    console.log('Do it click in', id);
    const editUser = person.find(contact => contact.id === id);
    setNewNumber(editUser.number);
    setNewName(editUser.name);
    setIdEdit(id)
  }

  return (
    <>
      <div>
        <h1>Phonebook</h1>
      </div>
      <div>
        <h2>
          Add new contact
        </h2>
        <form onSubmit={handleForm}>
          <div  className='form'>
            Name: <input type="text" value={newName} onChange={handleName} />
            Number : <input type='tel' value={newNumber} onChange={handleNumber} />
            Find: <input type="text" value={nameFind} onChange={handleFind} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <ul >
        {filteredContacts.map(contact => (
          <li key={contact.id} className='render-contacts'>
            {contact.name} {contact.number}
            <div className='container-buttons'>
              <button onClick={() => handleEliminate(contact.id)}>Delete</button>
              <button onClick={() => handleUpdate(contact.id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
