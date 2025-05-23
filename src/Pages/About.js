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
        //at this point, do we need to keep this in the async/try/catch block? We have the raw text at this point, pdf loading issue would be established here, add cascading try blocks for errors down the line? (have to figure out promises, potentially not worth doing unless there are more bugs)
        const contact = {};
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b/;
        const linksRegex = /\b(https?:\/\/[^\s]+)\b/g;
        const nameAndTitleRegex = /^([A-Za-z\s]+)\s+([^\|]+)/;

        const nameAndTitleMatch = text.match(nameAndTitleRegex);
        contact.name = nameAndTitleMatch?.[1] || null; //assigns null as backup if there's an issue parsing pdf and field isn't returned either through incorrect parsing or regex failure on match (by now if there is an issue loading the document, it is detected in earlier try block)
        contact.title = nameAndTitleMatch?.[2]?.trim() || null; //trim to clean the leading/ending white spaces, second index as first index fills name var
        contact.email = text.match(emailRegex)?.[0] || null;
        contact.phone = text.match(phoneRegex)?.[0] || null;
        contact.links = text.match(linksRegex) || [];
        console.log(contact);

        const sectionHeaders = [
          //hard coding these for now, since the resume will generally possess these sections in the current format for future iterations
          "SUMMARY",
          "SKILLS",
          "PROJECTS",
          "TRAINING / COURSES",
          "LANGUAGES",
          "EDUCATION",
          "EXPERIENCE",
        ];
        const sections = {};

        sectionHeaders.forEach((header, index) => {
          const headerRegex = new RegExp(`\\b${header}\\b`, "i"); //creating a new regex expression in order to find the start of each section as listed above in headers
          const startIndex = text.search(headerRegex);
          const endIndex = //trying to figure out the index start and end for each section to capture the entirety of an individual section's content and nothing more, so matching text between two consecutive header sections
            index < sectionHeaders.length - 1
              ? text.search(
                  new RegExp(`\\b${sectionHeaders[index + 1]}\\b`, "i") //grabbing the next header section to find the end of the current section
                )
              : text.length;

          if (startIndex !== -1) {
            sections[header.toLowerCase()] = text
              .substring(startIndex + header.length, endIndex) //skipping the section header to get section body
              .trim();
          }
        });
        //to get individual elements for each section in a manner that properly tokenizes them, figure out unique delimiter for each section and use the above text contents to return another array:
        const arraySkills = (skillsText) => {
          return skillsText.split(",").map((skill) => skill.trim());
        };
        const skillsArray = arraySkills(sections.skills || "");
        console.log("Skills listed are:", skillsArray);

        console.log("Raw Projects Section:", sections.projects);
        //to get the projects section, we need to split the text into an array of objects, each containing a title, date, and description
        const arrayProjects = (projectsText) => {
          const projects = [];
          let match;
          //regex to match the project title, date, and description, used GPT to generate this as this section has rather hard parsing rules to follow, need to ensure that later iterations have the same structure:
          //STRUCTURE OF TITLE NEEDS TO BE: "Title of Project 01 01/2024 - 01/2024" where all of the Title text is capitalized
          const projectRegex =
            /((?:[A-Z][a-zA-Z0-9\-']*\s+)+)\s*(\d{2}\/\d{4}\s+-\s+(?:\d{2}\/\d{4}|Present))([\s\S]*?)(?=(?:[A-Z][a-zA-Z0-9\-']*\s+)+\d{2}\/\d{4}\s+-\s+(?:\d{2}\/\d{4}|Present)|$)/g;
          while ((match = projectRegex.exec(projectsText)) !== null) {
            projects.push({
              title: match[1].trim(),
              date: match[2].trim(),
              description: match[3].trim(),
            });
          }

          return projects;
        };

        const projectsArray = arrayProjects(sections.projects || "");
        console.log("Projects are:", projectsArray);
        console.log("Sections are:", sections);
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
