import React, { useState, useEffect, useRef } from "react";
import logo from "../logo.svg";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./Home.css";
import "../Fonts/fonts.css";
import "./WheelList.css";
import LogoNew from "../Assets/logonew.png";

const ScrollListSkills = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  //index set equal to next index (x % y = y unless x = y, makes code optimized rather than, checking for equal, if not stay the same)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length
    );
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel);
    if (container) {
      setContainerHeight(container.clientHeight);
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
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
      <button onClick={goToPrev} className="carousel-button prev">
        Prev
      </button>
      <button onClick={goToNext} className="carousel-button next">
        Next
      </button>
    </div>
  );
};

export default ScrollListSkills;
