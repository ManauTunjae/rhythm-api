import express from "express";
import Artist from "../models/Artist.js";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  updateArtistById,
} from "../controllers/artistController.js";

const artistRouter = express.Router();

// Get all artists
artistRouter.get("/", getAllArtists);

// Get a artist by ID
artistRouter.get("/:id", getArtistById);

// Create an artist
artistRouter.post("/", createArtist);

// Update artist by ID
artistRouter.put("/:id", updateArtistById);

// Delete artist by ID
artistRouter.delete("/:id", deleteArtist);

export default artistRouter;
