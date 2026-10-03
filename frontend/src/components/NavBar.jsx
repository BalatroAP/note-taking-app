import react from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ isLoggedIn }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/notes"}>Notes</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to={"/"}>Log out</Link>
          ) : (
            <Link to={"/login"}>Login/Register</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
