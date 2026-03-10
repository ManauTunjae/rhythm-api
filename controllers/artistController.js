import Artist from "../models/Artist.js";

export const getAllArtists = async (req, res) => {
  try {
    const allArtists = await Artist.find().sort({ id: 1 });
    res.status(200).json(allArtists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
