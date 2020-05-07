import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-dark bg">
        <span className="navbar-brand mb-0 h1">
          Odontologia App - Control de pacientes
        </span>
      </nav>
    );
  }
}

export default Navbar;
