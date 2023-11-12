import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-container">
    <Link className="logo" to="/"></Link>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/stores">Stores</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </div>
  );
}
