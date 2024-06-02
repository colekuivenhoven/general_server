const express = require('express');
const router = express.Router();
const userController = require('./users.controller');

// Get all users
router.get('/getAll', userController.getUsers);

// Get user by ID
router.get('/getById/:id', userController.getUserById);

// Create user
router.post('/create', userController.createUser);

// Update user
router.put('/update/:id', userController.updateUser);

// Delete user
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;