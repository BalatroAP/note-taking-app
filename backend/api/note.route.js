import express from "express";

import NoteController from "./note.controller.js";

const router = express.Router();

router
  .route("/")
  .get(NoteController.apiGetNotes)
  .post(NoteController.apiPostNote)
  .put(NoteController.apiUpdateNote)
  .delete(NoteController.apiDeleteNote);

export default router;
