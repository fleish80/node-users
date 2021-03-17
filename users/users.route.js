const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');


router.post('/user', usersController.createUser);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);
router.get('/users', usersController.getUsers);

module.exports = router;
