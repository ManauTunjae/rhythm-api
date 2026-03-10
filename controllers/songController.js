import Song from "../models/Song.js";

export const getAllSongs = async (req, res) => {
  try {
    const allSongs = await Song.find().sort({ id: 1 });
    res.status(200).json(allSongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    // Get ID from URL-parameter
    const songId = req.params.id;
    // If the song ID is not a number
    if (isNaN(songId)) {
      return res
        .status(400)
        .json({ message: "Song ID is not a valid number!" });
    }
    // Find a song by ID
    const song = await Song.findOne({ id: songId });
    // If not a song
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
