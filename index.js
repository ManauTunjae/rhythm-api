import express from "express";
import mongoose from "mongoose";
import dotenv, { configDotenv } from "dotenv";
import songRouter from "./routes/songRouter.js";
import artistRouter from "./routes/artistRouter.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/songs', songRouter);
app.use('/api/artists', artistRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MOngoDB."))
    .catch((err) => console.error("Could not connect to MongoDB!, err"));

app.get('/', (req, res) => {
    res.json("Welcome to my project rhythm-API.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});