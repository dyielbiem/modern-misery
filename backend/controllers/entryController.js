const Entry = require("../models/entryModel")
const mongoose = require("mongoose")


// Callback function for creating a new entry
const createEntry = async (req, res) => {
    const { name, title, body, tags } = req.body;
    try {

        // Create and save a new entry to database
        const newEvent = await Entry.create({
            name: name ? name : "Faceless",
            title,
            body: String(body).trim(),
            tags
        })

        // Respond the newly created entry
        res.json(newEvent);

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
}

// Callback function for retrieving all the entries
const getAllEntries = async (req, res) => {
    try {
        // Retrieve all entries from the database
        const retrievedEntries = await Entry.find({}).sort({ submittedDate: -1 });

        // Respond all the retrieved entries
        res.json(retrievedEntries);

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
}

// Callback function for retrieving an entry by its ID
const getEntryByID = async (req, res) => {
    try {

        // Check the validity of the provided ID by the user
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({ "Error": "The ID is not present to any entry" });
        }

        // Retrieve an entry from the database
        const retrievedEntry = await Entry.findById(req.params.id);

        // Check if the provided ID is present to any entry
        if (!retrievedEntry) return res.json({ "Error": "The ID is not present to any entry" });

        // Respond the lone retrieved entry
        res.json(retrievedEntry);

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
}

// Callback function for updating an entry
const updateEntry = async (req, res) => {
    try {

        // Check the validity of the provided ID by the user
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({ "Error": "The ID is not present to any entry" });
        }


        // Make an update to an entry in the database
        const updatedData = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, { ...updatedData, body: String(req.body.body).trim() }, { new: true });

        // Check if the provided ID is present to any entry
        if (!updatedEntry) return res.json({ "Error": "The ID is not present to any entry" });

        // Respond the updated entry
        res.json(updatedEntry);

    } catch (error) {
        res.status(400).json({ "Error": error.message });
    };
};

const deleteEntryByID = async (req, res) => {
    try {

        // Check the validity of the provided ID by the user
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({ "Error": "The ID is not present to any entry" });
        }

        // Search and delete the searched entry
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

        // Check if there is no entry matched the provided ID
        if (!deletedEntry) return res.json({ "Error": "The ID is not present to any entry" });

        // Respond the deleted entry
        res.json(deletedEntry)

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
}

// Export all the callback function 
module.exports = {
    createEntry,
    getAllEntries,
    getEntryByID,
    updateEntry,
    deleteEntryByID
}