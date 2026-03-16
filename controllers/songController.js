import mongoose from "mongoose";
import Song from "../models/Song.js";

export const getAllSongs = async (req, res) => {
  try {
    const { q } = req.query;
    let finding = {};
    if (q) {
      finding = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { artist: { $regex: q, $options: "i" } }
        ],
      };
    }

    const allSongs = await Song.find(finding).sort({ title: 1 });
    res.status(200).json(allSongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    // Get ID from URL-parameter
    const { id } = req.params;
    // If the song ID is not a number
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Song ID form!" });
    }
    // Find a song by ID
    const song = await Song.findById(id);
    // If not a song
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    // Ensure that title and artist are created with datatype string
    if (typeof title !== "string" || typeof artist !== "string") {
      return res
        .status(400)
        .json({ message: "Song and artist have to be string." });
    }
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSongById = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Song ID form!" });
    }
    // Ensure taht updated song are created with datatype string
    if (
      (title && typeof title !== "string") ||
      (artist && typeof artist !== "string")
    ) {
      return res
        .status(400)
        .json({ message: "Update song and artist have to be string." });
    }
    // Find a match song and update data
    const updateSong = await Song.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }, // Return updated song and ensure Mongoose validation is run on update
    );
    if (!updateSong) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(200).json(updateSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Song ID form!" });
    }
    // Find a match song by ID and delete that match song
    const deleteSong = await Song.findByIdAndDelete(id);
    if (!deleteSong) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
