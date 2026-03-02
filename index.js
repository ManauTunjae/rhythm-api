import express from "express";
import mongoose from "mongoose";
import dotenv, { configDotenv } from "dotenv";
import Song from "./models/Song.js";
import songRouter from "./routes/songRouter.js";
import Artist from "./models/Artist.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/songs', songRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MOngoDB."))
    .catch((err) => console.error("Could not connect to MongoDB!, err"));

app.get('/', (req, res) => {
    res.json("Welcome to my project rhythm-API.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});