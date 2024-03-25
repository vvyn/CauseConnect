import React from "react";
import "./Navbar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="">
        <a href="/">
          <button className="btn">Home</button>
        </a>
        <a href="/vd/donor">
          <button className="btn"> VD Donor</button>
        </a>
        <a href="/vd/login">
          <button className="btn">VD Login</button>
        </a>
        <a href="/vd/profile">
          <button className="btn">VD Profile</button>
        </a>
        <a href="/vd/signup">
          <button className="btn">VD Signup</button>
        </a>
        <a href="/vd/volunteer">
          <button className="btn">VD Volunteer</button>
        </a>
        <a href="/vd/welcome">
          <button className="btn">VD Welcome</button>
        </a>
        <a href="/np/donor">
          <button className="btn"> NP Donor</button>
        </a>
        <a href="/np/login">
          <button className="btn">NP Login</button>
        </a>
        <a href="/np/profile">
          <button className="btn">NP Profile</button>
        </a>
        <a href="/np/signup">
          <button className="btn">NP Signup</button>
        </a>
        <a href="/np/volunteer">
          <button className="btn">NP Volunteer</button>
        </a>
        <a href="/np/welcome">
          <button className="btn">NP Welcome</button>
        </a>
        <a href="/*">
          <button className="btn">Error</button>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
