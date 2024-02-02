import express from "express";
import dotenv from "dotenv";
dotenv.config();
import grades from "./routes/grades.mjs";

const app = express();

app.use(express.json());

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
