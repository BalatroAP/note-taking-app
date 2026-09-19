import NoteDao from "../dao/noteDAO.js";

export default class NoteController {
  static async apiPostNote(req, res, next) {
    try {
      const date = new Date();
      const noteContent = req.body.content;

      await NoteDao.addNote(noteContent, date);

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUpdateNote(req, res, next) {
    try {
      const date = new Date();
      const noteId = req.body.note_id;
      const updatedNoteContent = req.body.content;

      const updateResponse = await NoteDao.updateNote(
        noteId,
        updatedNoteContent,
        date,
      );

      if (updateResponse.error) {
        res.status.json({ error: updateResponse.error });
      }

      if (updateResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update note. User may not be orignal poster",
        );
      }

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteNote(req, res, next) {
    try {
      const noteId = req.body.note_id;

      const deleteResponse = await NoteDao.deleteNote(noteId);

      if (deleteResponse.error) {
        res.status.json({ error: deleteResponse.error });
      }

      res.json({ status: "success" });
    } catch (err) {
      console.error(err);
    }
  }
}
