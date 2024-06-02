const express = require('express');
const router = express.Router();
const thingController = require('./things.controller');

// Get all things
router.get('/getAll', thingController.getThings);

// Get all things by filter
router.post('/getByFilter', thingController.getThingsByFilter);

// Get thing by ID
router.get('/getById/:id', thingController.getThingById);

// Create thing
router.post('/create', thingController.createThing);

// Update thing
router.put('/update/:id', thingController.updateThing);

// Delete thing
router.delete('/delete/:id', thingController.deleteThing);

module.exports = router;