import express from "express";

import NoteController from "../controllers/note.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express();

router.use(AuthMiddleware.verifyToken);

router.get("/", NoteController.getNotes);
router.post("/new", NoteController.newNote);
router.put("/update/:id", NoteController.updateNote);
router.delete("/delete/:id", NoteController.deleteNote);

export default router;
