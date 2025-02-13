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
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0); // in milliseconds
  const [localTime, setLocalTime] = useState("");
  const [welcomeMessage, setWelcome] = useState(" ");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedTime = formatter.format(new Date());
      setLocalTime(formattedTime);
      const hourVar = String(date.getHours()).padStart(2, "0");
      setWelcome(
        hourVar > 18
          ? "Good evening!"
          : hourVar < 16
          ? "Good morning!"
          : "Good afternoon!"
      );
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  return (
    <>
      <div className="Header">
        <div className="Header-Middle">
          <p>{welcomeMessage}</p>
          <p>{localTime}</p>
          Arthur Skok: NYC Based Application and Web Developer
        </div>
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
      <Footer />
    </div>
  );
}

export default Home;
