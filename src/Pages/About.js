import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./About.css";
import "../Fonts/fonts.css";
import background from "../Assets/slide.png";

function About() {
  return (
    <div
      className="Home"
      style={{
        backgroundImage: `url(${background})`,
        backgroundsize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <NavBar />
      Test
      <Footer />
    </div>
  );
}

export default About;
