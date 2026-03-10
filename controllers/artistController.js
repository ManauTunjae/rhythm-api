import mongoose from "mongoose";
import Artist from "../models/Artist.js";

export const getAllArtists = async (req, res) => {
  try {
    const allArtists = await Artist.find().sort({ name: 1 });
    res.status(200).json(allArtists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Artist ID form!" });
    }
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found." });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    if (typeof name !== "string") {
      return res.status(400).json({ message: "Artist name has to be string!" });
    }
    const newArtist = await Artist.create(req.body);
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Artist ID format!" });
    }
    if (name && typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Update artist name has to be string!" });
    }
    const updateArtist = await Artist.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updateArtist) {
      return res.status(404).json({ message: "Artist not found." });
    }
    res.status(200).json(updateArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Artist ID form!" });
    }
    const deleteArtist = await Artist.findByIdAndDelete(id);
    if (!deleteArtist) {
      return res.status(404).json({ message: "Artist not found." });
    }
    res.status(204).send(deleteArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
