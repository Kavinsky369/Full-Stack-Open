import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [person, setPerson] = useState([]);
  const [find, setFind] = useState('');

  const url = 'http://localhost:3000/contacts'

//Fetching data
useEffect(()=>{
    axios.get(url)
    .then(response => {
      console.log('Response Data: ', response.data);
      setPerson(response.data)
    })
},[])


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

  //Manejar inputs

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

  //Delete

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
        <div className='inputs'>
          Name: <input type="text" value={newName} onChange={handleName} />
          Number: <input type="text" value={newNumber} onChange={handleNumber} />
          Find: <input type="text" value={find} onChange={handleFind} />
          <button type='submit' className='send-Data'>Send</button>
        </div>
        <div>
          <h2>Contacts</h2>
          <ul>
            {filteredContacts.map(contact => (
              <div key={contact.id} className='contacts'>
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
