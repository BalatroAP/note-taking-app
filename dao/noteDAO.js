import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
let note;

export default class NoteDao {
  static async injectDB(conn) {
    try {
      note = await conn.collection("notes");
    } catch (err) {
      console.error(err);
    }
  }

  static async addNote(noteContent, date) {
    try {
      const newNote = {
        content: noteContent,
        created_date: date,
        last_updated_date: date,
      };
      return await note.insertOne(newNote);
    } catch (err) {
      console.error(err);
    }
  }

  static async updateNote(noteId, newNoteContent, date) {
    try {
      const updateResponse = await note.updateOne(
        { _id: new ObjectId(noteId) },
        { $set: { content: newNoteContent, last_updated_date: date } },
      );
      return updateResponse;
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteNote(noteId) {
    try {
      const deleteResponse = await note.deleteOne({
        _id: new ObjectId(noteId),
      });
      return deleteResponse;
    } catch (err) {
      console.error(err);
    }
  }
}
