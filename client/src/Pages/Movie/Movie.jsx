import React, { useState, useEffect } from 'react';
import NavbarComan from '../../Component/NavbarComan';

const Movie = () => {
  const [accordionData, setAccordionData] = useState([]);

  const data =
    '\n\n1. "The Virtual AI Hackathon" : The clock is ticking, the stakes are high, and the code is coming to life The clock is ticking, the stakes are high, and the code is coming to life.\n2. "Fingers Fly Across the Keyboard" : A race against time to solve complex problems and impress the judges.\n3. "The Power of Collaboration" : Two friends, one project, and the fuel of caffeine and determination.\n4. "The Final Countdown" : As the hours tick by, the tension builds and the code takes shape.\n5. "Victory is Ours" : The moment of triumph, the feeling of pride, and the celebration that follows.';

  useEffect(() => {
    const lines = data.split('\n');

    const newData = [];
    lines.forEach((line) => {
      const match = line.match(/\"(.+?)\"\s*:\s*(.+)/);
      if (match) {
        const title = match[1];
        const subtitle = match[2];
        newData.push({ title, subtitle, expanded: false });
      }
    });

    setAccordionData(newData);
  }, []);

  const toggleExpanded = (index) => {
    const updatedData = [...accordionData];
    updatedData[index].expanded = !updatedData[index].expanded;
    setAccordionData(updatedData);
  };

  return (
    <> 
    <NavbarComan/>
    <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Movie Stories</h1>
        {accordionData.length !== 0 &&
          accordionData.map((story, index) => (
            <div key={index} className="bg-white rounded shadow p-4 mb-4">
              <h2 className="text-xl font-bold mb-2">{story.title}</h2>
              {story.expanded ? (
                <p>{story.subtitle}</p>
              ) : (
                <p>{story.subtitle.slice(0, 100)}...</p>
              )}
              <button
                className="text-blue-500 mt-2 cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                {story.expanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Movie;
