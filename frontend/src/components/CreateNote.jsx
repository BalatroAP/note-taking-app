import { useState } from "react";
import NotesDataService from "../services/notes";
import "./CreateNote.css";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, content };

    try {
      NotesDataService.create(data);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h1>CREATE NEW NOTE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <label htmlFor="content">Content</label>
        <br />
        <input
          type="text"
          value={content}
          id="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
