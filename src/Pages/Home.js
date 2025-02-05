import React, { useState, useEffect, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./Home.css";
import "../Fonts/fonts.css";
import ScrollListSkills from "./WheelList.js";
import LogoNew from "../Assets/logonew.png";
import { BsFiletypeCss } from "react-icons/bs";
import {
  AiOutlinePython,
  AiOutlineHtml5,
  AiOutlineAmazon,
} from "react-icons/ai";
import background from "../Assets/slide.png";

const Header = () => {
  return (
    <>
      <div className="Header">
        <ScrollListSkills>
          <div>
            React <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
            CSS <BsFiletypeCss className="Wheel-Icons" />
          </div>
          <div>
            HTML <AiOutlineHtml5 className="Wheel-Icons" />
          </div>
          <div>
            Python <AiOutlinePython className="Wheel-Icons" />
          </div>
          <div>
            AWS <AiOutlineAmazon className="Wheel-Icons" />
          </div>
        </ScrollListSkills>
        <div className="Header-Side">
          Arthur Skok: NYC Based Application and Web Developer
        </div>
      </div>
    </>
  );
};
function Home() {
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
      <Header />
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <Footer />
    </div>
  );
}

export default Home;
