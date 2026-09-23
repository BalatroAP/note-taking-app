import { useEffect, useState } from "react";
import NotesDataService from "../services/notes";
import "./Note.css";

export default function Note() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    await NotesDataService.getAll()
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = async (noteId) => {
    const data = { note_id: noteId };

    await NotesDataService.delete(data);
    await retrieveNotes();
  };

  return (
    <div className="notes">
      {notes.map((note, i) => {
        return (
          <div className="note" key={i}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <footer>
              <p className="date">Last updated: {note.last_updated_date}</p>
              <p className="date">Created: {note.created_date}</p>
              <button
                onClick={() => {
                  deleteNote(note._id);
                }}
              >
                Delete
              </button>
            </footer>
          </div>
        );
      })}
    </div>
  );
}
