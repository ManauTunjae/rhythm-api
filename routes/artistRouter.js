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

// Create an artist
artistRouter.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        if(typeof id !== "number") {
            return res.status(400).json({ message: "Artist ID has to be number!"});
        }
        if (typeof name !== "string") {
            return res.status(400).json({ message: "Artist name has to be string!"});
        }
        const newArtist = await Artist.create(req.body);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default artistRouter;
