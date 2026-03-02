import express from "express";
import Artist from "../models/Artist.js";

const artistRouter = express.Router();

// Get all artists
artistRouter.get('/', async (req, res) => {
    try {
        const allArtists = await Artist.find().sort({ id: 1 });
        res.status(200).json(allArtists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a artist by ID
artistRouter.get('/:id', async (req, res) => {
    try {
        const artistId = req.params.id;
        if (isNaN(artistId)) {
            return res.status(400).json({ message: "Artist ID is not a valid number."});
        }
        const artist = await Artist.findOne({ id: artistId });
        if (!artist) {
            return res.status(404).json({ message: "Artist not found." });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default artistRouter;
