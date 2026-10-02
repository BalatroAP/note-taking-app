import UserModel from "../models/User.js";
import NoteModel from "../models/Note.js";
import mongoose from "mongoose";

export default class NoteController {
  static getNotes = async (req, res) => {
    const { userId } = req.body;

    try {
      const notes = await NoteModel.find({ userId });
      res.status(200).json({ notes: notes });
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  };

  static newNote = async (req, res) => {
    const { userId, title, content } = req.body;

    if ((!userId, !title, !content)) {
      return res.status(400).json({ error: "missing fields" });
    }

    if (!UserModel.findById(userId)) {
      return res.status(400).json({ error: "user does not exist" });
    }

    try {
      const newNote = new NoteModel({ userId, title, content });
      await newNote.save();
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  };

  static updateNote = async (req, res) => {
    const { noteId, userId, title, content } = req.body;

    if (!(await NoteModel.findById(new mongoose.Types.ObjectId(noteId)))) {
      return res.status(400).json({ error: "note does not exist" });
    }

    try {
      const existingNote = await NoteModel.findOne({
        _id: noteId,
        userId,
      });

      if (!existingNote) {
        return res
          .status(400)
          .json({ error: "unauthorized user for this note" });
      }
      existingNote.title = title;
      existingNote.content = content;
      await existingNote.save();
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  };
}
