import './Styles/App.css'
import { useState } from "react"

function App() {

  const [person, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFind, setNameFind] = useState('')

  const handleForm = (event) => {
    event.preventDefault();
    const objContact = {
      name: newName,
      number: newNumber,
      id: person.length + 1
    }
    if(newName.trim() == ''){
     return
    } else if (person.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPerson(person.concat(objContact))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value);
  }

  const handleFind = (event) => {
    setNameFind(event.target.value)
  }

  const filteredContacts = person.filter(contact => 
    contact.name.toLocaleLowerCase().includes(nameFind.toLocaleLowerCase())
  )

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
          Name: <input type="text" value={newName} onChange={handleName} />
          Number : <input type='tel' value={newNumber} onChange={handleNumber} />
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>

      <form>
        <h2>
          Search
        </h2>
         Find: <input type="text" value={nameFind} onChange={handleFind} />
      </form>

      <ul>
         {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name} {contact.number}
            </li>
          ))}
         </ul>
    </>
  )
}

export default App
