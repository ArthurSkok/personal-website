import React, { useState, useEffect, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./Home.css";
import "../Fonts/fonts.css";
import "./WheelList.css";
import LogoNew from "../Assets/logonew.png";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

const ScrollListSkills = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  const autoIncrementRef = useRef(null);
  //index set equal to next index (x % y = y unless x = y, makes code optimized rather than, checking for equal, if not stay the same)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length
    );
  };
  const pauseAutoIncrement = () => {
    clearInterval(autoIncrementRef.current);
    autoIncrementRef.current = setTimeout(startAutoIncrement, 5000); // restarting the timer
  };
  const handleWheel = (e) => {
    e.preventDefault();
    clearInterval(autoIncrementRef.current);
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
    autoIncrementRef.current = setTimeout(startAutoIncrement, 5000);
  };
  const startAutoIncrement = () => {
    autoIncrementRef.current = setInterval(goToNext, 3000);
  };
  const handleNextClick = () => {
    pauseAutoIncrement();
    goToNext();
  };

  // Handle button click to go to the previous slide and pause auto increment
  const handlePrevClick = () => {
    pauseAutoIncrement();
    goToPrev();
  };
  useEffect(() => {
    startAutoIncrement();
    const container = containerRef.current;
    //const autoIncrement = setInterval(goToNext, 1000); // original implementation of the timer
    container.addEventListener("wheel", handleWheel);
    if (container) {
      setContainerHeight(container.clientHeight);
    }

    return () => {
      clearInterval(autoIncrementRef.current);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div>
      <button onClick={handlePrevClick} className="carousel-button prev">
        <BsArrowUpCircle />
      </button>
      <div ref={containerRef} className="carousel-container">
        <div
          className="carousel-content"
          style={{
            transform: `translateY(-${currentIndex * containerHeight}px)`,
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="carousel-item">
              {child}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNextClick} className="carousel-button next">
        <BsArrowDownCircle />
      </button>
    </div>
  );
};

export default ScrollListSkills;
