import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Stillroom server listening on ${PORT}`);
});