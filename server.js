import express from "express";
import cors from "cors";

import note from "./api/note.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/note", note);

app.use((req, res) => {
  res.status(404).json({ error: "page not found" });
});

export default app;
