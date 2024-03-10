import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import './home_1.css';

function Home() {
  const sentences = ["Hi, I'm KKH!", "Welcome to my portfolio.", "Feel free to explore."];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentSentenceWidth, setCurrentSentenceWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      const width = document.getElementById("madimiFont").offsetWidth;
      setCurrentSentenceWidth(width);
    };

    // calculateWidth();

    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
      calculateWidth();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Navigation></Navigation>
      <div className="text-container">
        <h1
          id="madimiFont"
          className="madimi_font"
          style={{ maxWidth: `${currentSentenceWidth}px`}}
        >
          {sentences[currentSentenceIndex]}
        </h1>
      </div>
    </div>
  );
}

export default Home;
