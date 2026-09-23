import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link className="nav" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav" to="/create">
              Create
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>
    </div>
  );
}

export default App;
