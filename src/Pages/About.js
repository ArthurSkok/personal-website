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
        //at this point, do we need to keep this in the async/try/catch block? We have the raw text at this point, pdf loading issue would be established here, add cascading try blocks for errors down the line? (have to figure out promises)
        const contact = {};
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b/;
        const linksRegex = /\b(https?:\/\/[^\s]+)\b/g;
        const nameAndTitleRegex = /^([A-Za-z\s]+)\s+([^\|]+)/;

        const nameAndTitleMatch = text.match(nameAndTitleRegex);
        contact.name = nameAndTitleMatch?.[1] || null; //assigns null as backup if there's an issue parsing pdf and field isn't returned either through incorrect parsing or regex failure on match
        contact.title = nameAndTitleMatch?.[2]?.trim() || null; //trim to clean the leading/ending white spaces
        contact.email = text.match(emailRegex)?.[0] || null;
        contact.phone = text.match(phoneRegex)?.[0] || null;
        contact.links = text.match(linksRegex) || [];
        console.log(contact);

        const sectionHeaders = [
          "SUMMARY",
          "SKILLS",
          "EXPERIENCE",
          "TRAINING / COURSES",
          "LANGUAGES",
          "EDUCATION",
          "PROJECTS",
        ];
        const sections = {};

        sectionHeaders.forEach((header, index) => {
          const headerRegex = new RegExp(`\\b${header}\\b`, "i");
          const startIndex = text.search(headerRegex);
          const endIndex =
            index < sectionHeaders.length - 1
              ? text.search(
                  new RegExp(`\\b${sectionHeaders[index + 1]}\\b`, "i")
                )
              : text.length;

          if (startIndex !== -1) {
            sections[header.toLowerCase()] = text
              .substring(startIndex + header.length, endIndex)
              .trim();
          }
        });
        console.log(sections);
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

//split between loading a local model to apply text classification to existing resume rather than regex parsing, however decided that deterministic outputs are better both for testing (result consistency) and debugging
