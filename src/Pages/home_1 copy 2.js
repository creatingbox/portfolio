import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
// import './home.css';
import './home_1.css';

function Home() {
  const sentences = ["Hi, I'm KKH", "Welcome to my porffolio", "Feel free to explore."]
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex +1) % sentences.length);
    }, 6000);

    return() => clearInterval(interval);
  }, []);

  return (
      <div className="home">
        <Navigation></Navigation>
        <div className="text-container">
          <h1 className="madimi_font">{sentences[currentSentenceIndex]}</h1>
        </div>
      </div>

      
  );
}

export default Home;
