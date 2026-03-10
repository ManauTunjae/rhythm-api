import Song from "../models/Song.js";

export const getAllSongs = async (req, res) => {
  try {
    const allSongs = await Song.find().sort({ id: 1 });
    res.status(200).json(allSongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

