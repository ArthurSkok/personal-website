import React, { useState, useEffect, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./Home.css";
import "../Fonts/fonts.css";
import ScrollListSkills from "./WheelList.js";
import LogoNew from "../Assets/logonew.png";

const Header = () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event) => {
    setScrollPosition((prevPosition) => prevPosition + event.deltaY);
  };
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="Header">
        <img src={LogoNew} alt="Example" className="Header-Picture" />
        Full Stack Software Developer
        <div className="Header-Side">My name is Arthur Skok!</div>
      </div>
      <ScrollListSkills>
        <div style={{ backgroundColor: "lightcoral" }}>React</div>
        <div style={{ backgroundColor: "lightblue" }}>CSS</div>
        <div style={{ backgroundColor: "lightgreen" }}>HTML</div>
        <div style={{ backgroundColor: "red" }}>Python</div>
        <div style={{ backgroundColor: "orange" }}>AWS</div>
      </ScrollListSkills>
    </>
  );
};
/*<div style={{ height: "200vh", padding: "20px" }}>
        <h1>Scroll Position: {scrollPosition}px</h1>
      </div>
    */
function Home() {
  return (
    <div className="Home">
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
