import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import './home_1.css';
import norwayImage from "../assets/images/norway_1.png";

function Home() {
  const sentences = ["Hi, I'm KKH!", "Welcome to my portfolio.", "Feel free to explore."];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentSentenceWidth, setCurrentSentenceWidth] = useState(0);
  const [isSection2Visible, setIsSection2Visible] = useState(false);

  useEffect(() => {
    const calculateWidth = () => {
      const width = document.getElementById("madimiFont")?.offsetWidth;
      if (width) {
        setCurrentSentenceWidth(width);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section2Offset = document.querySelector(".section2")?.offsetTop;

      if (section2Offset && scrollPosition >= section2Offset - window.innerHeight / 2) {
        setIsSection2Visible(true);
      } else {
        setIsSection2Visible(false);
      }
    };

    calculateWidth();
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
      calculateWidth();
    }, 6000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home">
      <Navigation></Navigation>
      <section className="section1">
        <div className="text-container">
          <h1
            id="madimiFont"
            className="madimi_font"
            style={{ maxWidth: `${currentSentenceWidth}px`}}>
            {sentences[currentSentenceIndex]}
          </h1>
        </div>
      </section>
      <section className={`section2 ${isSection2Visible ? 'visible' : ''}`}>
        <h2 className={isSection2Visible ? 'slide-in' : 'slide-out'}>I visited here~</h2>
        <img src={norwayImage} alt="Norway"></img>
      </section>
    </div>
  );
}

export default Home;