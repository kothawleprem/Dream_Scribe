import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";

const Movie = () => {
  const [accordionData, setAccordionData] = useState([]);

  const data =
    '\n\n1. "The Virtual AI Hackathon" : The clock is ticking, the stakes are high, and the code is coming to life.\n2. "Fingers Fly Across the Keyboard" : A race against time to solve complex problems and impress the judges.\n3. "The Power of Collaboration" : Two friends, one project, and the fuel of caffeine and determination.\n4. "The Final Countdown" : As the hours tick by, the tension builds and the code takes shape.\n5. "Victory is Ours" : The moment of triumph, the feeling of pride, and the celebration that follows.';

  const ep_data = {
    episode_number: 1,
    Title: "The Virtual AI Hackathon",
    Subtitle:
      "The clock is ticking, the stakes are high, and the code is coming to life.",
    Story_for_context:
      "I found myself sitting in front of a computer, my fingers flying across the keyboard as I worked on a project with my friend Shubham. We were participating in a virtual AI hackathon, and the stakes were high. We had been working non-stop for hours, fueled by caffeine and determination. As the clock ticked down, our code came to life, solving complex problems and impressing the judges with its ingenuity. When the final results were announced, we were overjoyed to hear our names called as the winners. We had done it, all thanks to our hard work and dedication. The feeling of triumph and pride was exhilarating, and we celebrated long into the night.",
  };
  console.log(JSON.stringify(ep_data));

  useEffect(() => {
    const lines = data.split("\n");

    const newData = [];
    lines.forEach((line) => {
      const match = line.match(/\"(.+?)\"\s*:\s*(.+)/);
      if (match) {
        const title = match[1];
        const subtitle = match[2];
        newData.push({ title, subtitle });
      }
    });

    setAccordionData(newData);
  }, []);
  console.log(accordionData);

  return (
    <div>
      {accordionData.length !== 0 && (
        <>
          {accordionData.map((story, index) => (
            <div key={index}>
              <h2>{story.title}</h2>
              <p>{story.subtitle}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Movie;
