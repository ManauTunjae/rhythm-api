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

export default artistRouter;
