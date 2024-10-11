const express = require("express");

const cors = require('cors');
const PORT = 3000;
const app = express();

app.use(cors()); 
app.use(express.json()); 

let contacts = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ];

app.get('/',(req,res)=>{
    res.send('Im working')
})

app.get('/contacts',(req,res) => {
    res.json(contacts)
})

app.post('/contacts',(req,res) =>{
    const {name,number} = req.body;
    const newContact = {
        name,
        number,
        id: contacts.length + 1
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
})

app.delete('/contacts/:id',(req,res) => {
    const id = Number(req.params.id);
    contacts = contacts.filter(contact => contact.id != id);
    res.status(204).end();
})

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})