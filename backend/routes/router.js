
const express = require("express");
const router = express.Router();
const {
    createEntry,
    getAllEntries,
    getEntryByID,
    updateEntry,
    deleteEntryByID
} = require("../controllers/entryController");



// GET request to retrieve all the entry
router.get('/', getAllEntries);


// GET request on /:id path to retrieve an entry
router.get('/:id', getEntryByID);


// POST request to create a new entry
router.post('/', createEntry);


// PATCH request to update an entry
router.patch('/:id', updateEntry);

// PATCH request to update an entry
router.delete('/:id', deleteEntryByID);


module.exports = router;