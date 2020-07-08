// this import is pulling from node_modules now
const express = require('express')
const db = require('./database.js')

const server = express()

//? this is installing some middleware to allow Express to parse JSON req bodies. 
server.use(express.json())

server.get('/users', (req, res) => {
  const users = db.getUsers()
  res.json(users)
})

server.get('/users/:id', (req, res) => {
  //? the param var matches up to the name of our URL param above
  const user = db.getUserById(req.params.id)

  // since we're not taking in values from the client, we need to make sure the value is valid before trying to use it
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
})

server.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: 'Need a name for the user',
    })
  }
  const newUser = db.createUser({
    name: req.body.name,
  })

  res.status(201).json(newUser)
})

// server.put('/users/:id', (req, res) => {
//   const user = db.getUserById(req.params.id)
//   if (!user) {
//     return res.status(404).json({
//       message: 'User not found'
//     })
//   }
//   const updateUser = db.updateUser(req.params.id,
//     { name: req.body.name }
//   )

//   res.status(201).json(updateUser)
// })

server.put('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
    })

    res.json(updatedUser)
  } else {
    res.status(404).json({
      message: 'User not found',
    })
  }
})


server.delete('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'Cannot delete user because user DNE'
    })
  }

  const deleteUser = db.deleteUser(req.params.id)

  res.status(201).json(db.getUsers())
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})



