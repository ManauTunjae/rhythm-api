import express from "express";
import Artist from "../models/Artist.js";
import { createArtist, getAllArtists, getArtistById } from "../controllers/artistController.js";

const artistRouter = express.Router();

// Get all artists
artistRouter.get('/', getAllArtists);

// Get a artist by ID
artistRouter.get('/:id', getArtistById);

// Create an artist
artistRouter.post('/', createArtist);

// Update artist by ID
artistRouter.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const artistId = req.params.id;
        if (isNaN(artistId)) {
            return res.status(400).json({ message: "Artist ID has be a valid number!"});
        }
        if (name && typeof name !== "string") {
            return res.status(400).json({ message: "Update artist name has to be string!"});
        }
        const updateArtist = await Artist.findOneAndUpdate(
            { id: artistId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateArtist) {
            return res.status(404).json({message: "Artist not found."});
        }
        res.status(200).send(updateArtist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete artist by ID
artistRouter.delete('/:id', async (req, res) => {
    try {
        const artistId = req.params.id;
        if (isNaN(artistId)) {
            return res.status(400).json({ message: "Artist ID has to be a valid number!"});
        }
        const deleteArtist = await Artist.findOneAndDelete({ id: artistId });
        if (!deleteArtist) {
            return res.status(404).json({ message: "Artist not found."});
        }
        res.status(204).send(deleteArtist);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}); 

export default artistRouter;
