import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './component/Form';
import List from './component/List';

const App = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        //console.log(data.todos )
        let array = [];
       for(let i = 0; i < data.todos.length; i++) {
          let newItem = {
            id: data.todos[i].id,
            note: data.todos[i].note,
            com: false
          }
          array.push(newItem)
        }
        //console.log(array);
        setNotes(array);
      })
  }, [])

  
  const addNote = (info) => {
    if (info) {
      let newItem = {
        id: notes.length + 1,
        note: info,
        com: false
      }

      fetch("http://localhost:3001/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...notes, newItem]),
      }).then(res => res.json()).then(
        prev => setNotes(prev)
      )
    }
  }
  
  const yes = (iid) => {
  
   fetch("http://localhost:3001/upd", {
     method: 'PUT',
     headers: {
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({iid})
   }).then(res => res.json())
     .then(prev => setNotes(prev))
  }

  const deleteNote = (id) => {
  fetch("http://localhost:3001/del", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id})
  })//.then(res => res.json())

    setNotes([...notes.filter((note) => note.id !== id)])
  }

  return(
    <>
      <h1>Заметки</h1>
      <Form addNote={addNote} />
      <ol>
      {notes.map((notes) => {
        return (
              <List 
            notes={notes}
            deleteNote={deleteNote}
            key={notes.id}
            yes={yes}
            />
        )
      })}
      </ol>
    </>
  )
}

export default App;
