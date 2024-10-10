import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [person, setPerson] = useState([]);
  const [find, setFind] = useState('');

  const url = 'http://localhost:3000/contacts'


  useEffect(() => {
    axios.get(url)
      .then(response => {
        setPerson(response.data)
      })
      .catch(error => console.log("Error: ", error))
  }, [])

  const handleForm = (event) => {
    event.preventDefault()
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert('Name or number empty')
      return
    }
    const objPerson = {
      name: newName,
      number: newNumber
    }
    axios.post(url, objPerson)
      .then(response => {
        setPerson(person.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.log('Error', error))
  }


  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFind = (event) => {
    setFind(event.target.value)
  }

  const filteredContacts = person.filter(contact =>
    contact.name.toLowerCase().includes(find.toLowerCase())
  );


  const handleDelete = (id) => {
    axios.delete(`${url}/${id}`)
      .then(() => {
        setPerson(person.filter(contact => contact.id !== id));
      })
      .catch(error => console.log('Error', error))
  }

  return (
    <>
      <h1>PhoneBook</h1>
      <form onSubmit={handleForm}>
        <div>
          Name: <input type="text" value={newName} onChange={handleName} />
          Number: <input type="text" value={newNumber} onChange={handleNumber} />
          Find: <input type="text" value={find} onChange={handleFind} />
          <button type='submit'>Send</button>
        </div>
        <div>
          <h2>Contacts</h2>
          <ul>
            {filteredContacts.map(contact => (
              <div key={contact.id}>
                <li>{contact.name} {contact.number}</li>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            ))}
          </ul>
        </div>
      </form>
    </>
  )
}

export default App
