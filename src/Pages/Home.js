import React, { useState, useEffect, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./Home.css";
import "../Fonts/fonts.css";
import ScrollListSkills from "./WheelList.js";
import LogoNew from "../Assets/logonew.png";
import { BsFiletypeCss, BsArrowRightCircle } from "react-icons/bs";
import {
  AiOutlinePython,
  AiOutlineHtml5,
  AiOutlineAmazon,
} from "react-icons/ai";
import background from "../Assets/slide.png";
import bird from "../Assets/Bird.jpg";
import Selfie from "../Assets/Selfie.jpg";
import moment from "moment-timezone";
import Popup from "./Popup";

const Header = () => {
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0); // in milliseconds
  const [localTime, setLocalTime] = useState("");
  const [easternTime, setEasternTime] = useState("");
  const [welcomeMessage, setWelcome] = useState(" ");
  const [showPopup, setShowPopup] = useState(true);
  const PopupText = `${welcomeMessage}`;
  const handleClosePopup = () => {
    setShowPopup(false);
  };
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
      setLocalTime(formattedTime); // We're using this variable to determine the welcome message
      const NYTime = moment(date.toISOString()).tz("America/New_York").toDate(); // Converting the local time from the previously called date object to eastern time to determine availability
      setEasternTime(formatter.format(NYTime));
      const hourVar = String(date.getHours()).padStart(2, "0");
      setWelcome(
        hourVar > 18
          ? "Good evening!"
          : hourVar < 12
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
        <p className="Welcome-Var">{welcomeMessage}</p>
        <p className="Time-Var">Local time is: {localTime}</p>
        <p className="My-Time">{easternTime}</p>
        <div className="Header-Middle">
          <div className="Welcome-Div">
            <p className="Time-Var">Software Developer based in NYC</p>
            <p className="Welcome-Var">
              My name is<div className="Name"> Arthur Skok</div>
            </p>

            <p className="Time-Var">My Current Skillset Includes:</p>
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
            <p className="Time-Var">
              You can see my Portfolio here <BsArrowRightCircle />
            </p>
          </div>
          <div className="Middle-Div">
            <img
              src={Selfie}
              alt="A crane standing in water"
              className="Portrait"
            ></img>
          </div>
          <div className="End-Div"></div>
        </div>
      </div>
      <Popup show={showPopup} onClose={handleClosePopup} input={PopupText} />
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
