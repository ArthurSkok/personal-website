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
import background from "../Assets/aura.jpg";

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
        <ScrollListSkills>
          <div style={{ backgroundColor: "lightcoral" }}>
            React <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div style={{ backgroundColor: "lightblue" }}>
            CSS <BsFiletypeCss />
          </div>
          <div style={{ backgroundColor: "lightgreen" }}>HTML</div>
          <div style={{ backgroundColor: "red" }}>Python</div>
          <div style={{ backgroundColor: "orange" }}>AWS</div>
        </ScrollListSkills>
        Full Stack Software Developer
        <div className="Header-Side">My name is Arthur Skok!</div>
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
