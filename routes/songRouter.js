import express from "express";
import { getAllSongs, getSongById, createSong, updateSongById, deleteSong } from "../controllers/songController.js";

const songRouter = express.Router();

// Get all songs from database
songRouter.get('/', getAllSongs);

// Get a song by ID with validations
songRouter.get('/:id', getSongById);

// Create a song
songRouter.post('/', createSong);

// Update a song by ID with validations
songRouter.put('/:id', updateSongById);

// Delete a song
songRouter.delete('/:id', deleteSong);

export default songRouter;