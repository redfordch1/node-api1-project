// implement your API here

// import express from 'express'; // ES2015 module syntax
const express = require('express'); // CommonJS modules
const server = express();
const Users = require('./data/db.js'); 
server.use(express.json());

const port = 8001;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));





// routes or endpoints
// GET REQUESTS  ===============================================================
server.get('/', function(request, response) {
    response.send({ hello: 'This is the start of the API' });
  });

server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;
    Users.findById(id)
    .then(res => {
        response.status(200).json(res);
    })
    .catch(err => {
        console.log(err);
        response.status(404).json({
            errorMessage: 'That user Id does not exist'
        })
    })
});

server.get('/api/users', (request, response) => {
    Users.find()
    .then(users => {
        console.log('Users', users)
        response.status(200).json(users);
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({errorMessage: 'Not Working!! Could not get Users'})
    })
})
// =============================================================================
// POST REQUESTS ===============================================================
server.post('/api/users', (request, response) => {
    const userData = request.body; // for this to work you need the server.use(express.json()); above
    // const {name, bio} = userData;
    console.log(userData);
   
    Users.insert(userData)
      .then(user => {
          console.log(user);
          if(name == "" || bio == ""){
            response.status(400).json({
                errorMessage: 'Need to provide Name and Bio'
            })
          } else {
            response.status(201).json(user);
          }
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error saving the User',
        });
      });
  });
// =============================================================================
// DELETE REQUESTS =============================================================
server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;
    console.log('This is the Id', id);
    Users.remove(id)
      .then(res => {
          console.log('Deleted Id', res);
          response.status(200).json(res);
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the User',
        });
      });
  });
  // ====================================================================
  // PUT REQUESTS =======================================================
  server.put('/api/users/:id', (request, response) => {
      const id = request.params.id;
      const UpdateUser = request.body;
      const {name, bio} = UpdateUser;
      Users.update(id, UpdateUser)
      .then(user => {
          if(!id) {
              response.status(404).json({
                  errorMessage: 'The User with that Id does not exist'
              })
          } else if(name == "" || bio == "") {
              response.status(400).json({
                  errorMessage: 'Need to provide the name and bio for the user'
              })
          } else {
              response.status(200).json(user).json({
                  message: 'It worked great job!!'
              })
          }
      })
      .catch(err => {
          console.log(err);
          response.status(500).json({
              errorMessage: 'The user info could not be modified'
          })
      })
  })