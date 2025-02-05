import React from "react";
import "./NavBarStyle.css";
import {
  BsHouseDoor,
  BsPencil,
  BsCollection,
  BsLightning,
  BsSend,
} from "react-icons/bs";
import "../Fonts/fonts.css";
import LogoNew from "../Assets/logonew.png";

const NavBar = ({ fontFam }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={LogoNew} alt="Example" className="navbar-logo-pic" />
        <div className="navbar-logo-text">
          <div className="navbar-logo-top-text">
            Full-Stack App and Web Developer
          </div>
          <div className="navbar-logo-bottom-text "></div>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#home">
            <BsHouseDoor className="navbar-icon" />
            Home
          </a>
        </li>
        <li>
          <a href="#about">
            <BsPencil className="navbar-icon" />
            About
          </a>
        </li>
        <li>
          <a href="#portfolio">
            <BsCollection className="navbar-icon" />
            Portfolio
          </a>
        </li>
        <li>
          <a href="#prototypes">
            <BsLightning className="navbar-icon" />
            MiniApps
          </a>
        </li>
        <li>
          <a href="#contact">
            <BsSend className="navbar-icon" />
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
