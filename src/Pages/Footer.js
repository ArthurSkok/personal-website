import React from "react";
import "./Footer.css";
import "../Fonts/fonts.css";
import { BsCCircle, BsGithub, BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://github.com/ArthurSkok">
          <BsGithub />
        </a>
        <a href="https://www.facebook.com/arthur.sneeze/">
          <BsFacebook />
        </a>
        <a href="https://www.linkedin.com/in/arthur-skok/">
          <BsLinkedin />
        </a>
      </div>
      <div className="footer-logo">
        <BsCCircle className="footer-icon" />
        COPYRIGHT 2025 — Arthur Skok
      </div>
    </footer>
  );
};

export default Footer;
