import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import grades from "./routes/grades.mjs";

const app = express();
app.use(express.json());

const db = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(db);
            console.log('MongoDB successfully connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

app.use("/", grades);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

