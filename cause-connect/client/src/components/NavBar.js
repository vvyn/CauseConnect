import React from "react";

function NavBar() {
    return (
      <div className="navbar">
        <div className="allBtns">
          <a href="/">
            <button className="home">Home</button>
          </a>
          <a href="/vd/donor">
            <button className="btn">Donor</button>
          </a>
          <a href="/vd/login">
            <button className="btn">Login</button>
          </a>
          <a href="/vd/profile">
            <button className="btn">Profile</button>
          </a>
          <a href="/vd/signup">
            <button className="btn">Signup</button>
          </a>
          <a href="/vd/volunteer">
            <button className="btn">Volunteer</button>
          </a>
          <a href="/vd/welcome">
            <button className="btn">Welcome</button>
          </a>
        </div>
      </div>
    );
  }

export default NavBar;