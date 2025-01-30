import React from "react";
import "./Footer.css";
import "../Fonts/fonts.css";
import { BsCCircle, BsGithub, BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <BsGithub />
        <BsFacebook />
        <BsLinkedin />
      </div>
      <div className="footer-logo">
        <BsCCircle className="footer-icon" />
        COPYRIGHT 2025 — Arthur Skok
      </div>
    </footer>
  );
};

export default Footer;
