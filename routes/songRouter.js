import express from "express";
import Song from "../models/Song.js";
import { getAllSongs, getSongById, createSong } from "../controllers/songController.js";

const songRouter = express.Router();

// Get all songs from database
songRouter.get('/', getAllSongs);

// Get a song by ID with validations
songRouter.get('/:id', getSongById);

// Create a song
songRouter.post('/', createSong);

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