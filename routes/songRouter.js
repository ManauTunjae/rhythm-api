import express from "express";
import Song from "../models/Song.js";

const songRouter = express.Router();

// Get all songs from database
songRouter.get('/', async (req, res) => {
    try {
        const allSongs = await Song.find().sort({ id: 1}); 
        res.status(200).json(allSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a song by ID with validations
songRouter.get('/:id', async (req, res) => {
    try {
        // Get ID from URL-parameter
        const songId = req.params.id;
        // If the song ID is not a number
        if (isNaN(songId)) {
            return res.status(400).json({ message: "Song ID is not a valid number!"});
        } 
        // Find a song by ID 
        const song = await Song.findOne({ id: songId });
        // If not a song
        if (!song) {
            return res.status(404).json({ message: "Song not found."});
        }
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a song
songRouter.post('/', async (req, res) => {
    try {
        const { id, title, artist } = req.body;
        if(typeof id !== "number") {
            return res.status(400).json({ message: "Song ID has to be number!"});
        }
        // Ensure that title and artist are created with datatype string
        if (typeof title !== "string" || typeof artist !== "string") {
            return res.status(400).json({ message: "Song and artist have to be string."});
        }
        const newSong = await Song.create(req.body);
        res.status(201).json(newSong);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a song by ID with validations
songRouter.put('/:id', async (req, res) => {
    try {
        const { title, artist } = req.body;
        const songId = req.params.id;
        if (isNaN(songId)) {
            return res.status(400).json({ message: "Song ID is not a valid number!"});
        }
        // Ensure taht updated song are created with datatype string
        if ((title && typeof title !== "string") || (artist && typeof artist !== "string")) {
            return res.status(400).json({ message: "Update song and artist have to be string."});
        }
        // Find a match song and update data
        const updateSong = await Song.findOneAndUpdate(
            { id: songId }, // Find a song by id
            req.body,
            { new: true, runValidators: true } // Return updated song and ensure Mongoose validation is run on update
        );
        if (!updateSong) {
            return res.status(404).json({ message: "Song not found." });
        }
        res.status(200).json(updateSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a song
songRouter.delete('/:id', async (req, res) => {
    try {
        const songId = req.params.id;
        if (isNaN(songId)) {
            return res.status(400).json({ message: "Song ID is not a valid number." });
        }
        // Find a match song by ID and delete that match song
        const deleteSong = await Song.findOneAndDelete({ id: songId });
        if(!deleteSong) {
            return res.status(404).json({ message: "Song not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default songRouter;