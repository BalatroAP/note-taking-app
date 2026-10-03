import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Notes from "./components/Notes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
