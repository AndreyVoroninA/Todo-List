const express = require("express");
const fs = require("fs");
const cors = require('cors');
const e = require("express");
const server = express();
server.use(cors());

server.use(express.json());

server.get('/', (req, res) => {
   
   fs.readFile('./todo-task.json', (err, data) => {
      res.send(JSON.parse(data));
   })
})

server.post('/add', (req, res) => {
   const body = req.body;
   console.log(body);
   res.send(body)
   let t = {
      todos: req.body
   }

   fs.writeFile('./todo-task.json', JSON.stringify(t), (err) => {
      if (err) {
         console.log('error', err)
      } else {
         res.send(db)
      }
   })
})

server.delete('/del', (req, res) => {
   const body = req.body
   
   fs.readFile('./todo-task.json', 'utf-8', (err, data) => {
      const db = JSON.parse(data)
      const newTodos = db.todos.filter((todo) => body.id !== todo.id)
      db.todos = newTodos

      fs.writeFile('./todo-task.json', JSON.stringify(db), (err) =>{
         if (err) {
            console.log('error', err)
         } else {
            res.send(db)
         }
      })
   })
})

server.put('/upd', (req, res) => {
   const body = req.body
   console.log(body)
   fs.readFile('./todo-task.json', 'utf-8', (err, data) => {
      let db = JSON.parse(data)
      console.log(db)
      const idx = db.todos.findIndex((n) => body.id === n.id)
      db.todos[idx].com = !db.todos[idx].com
      fs.writeFile('./todo-task.json', JSON.stringify(db), (err) => {
         if (err) {
            console.log('errr' + err)
         } else (
            res.send(db)
         )
      })
   })

})


server.listen(3001, () => {
   console.log("This is server!!!");
})