import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import Footer from "./Footer.js";
import NavBar from "./NavBar.js";
import "./About.css";
import "../Fonts/fonts.css";
import background from "../Assets/slide.png";
import Resume from "../Assets/Resume.pdf";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.mjs";

const PdfParser = () => {
  const [parsedText, setParsedText] = useState("");

  useEffect(() => {
    const fetchAndParsePdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(Resume).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }

        setParsedText(text);
      } catch (error) {
        console.error("Error parsing PDF:", error);
      }
    };

    fetchAndParsePdf();
  }, []);

  return (
    <div>
      <h1>Parsed Resume</h1>
      <pre>{parsedText}</pre>
    </div>
  );
};

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
      <PdfParser />

      <Footer />
    </div>
  );
}

export default About;
