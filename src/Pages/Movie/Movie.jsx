import React, { useState, useEffect } from 'react';
import NavbarComan from '../../Component/NavbarComan';
import { useLocation } from 'react-router-dom';

const Movie = () => {
  // const [ partsRawData, setPartsRawData] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      console.log(state.dreamDescription);
      const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/movie-script-parts/results`;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Key ${process.env.REACT_APP_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        inputs: [
          {
            data: {
              text: {
                raw: state.dreamDescription,
              },
            },
          },
        ],
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.results[0].outputs[1].data.text.raw);
        const rawData = responseData.results[0].outputs[1].data.text.raw;
        const sections = rawData.split("\n\n");
        console.log(sections);
        setAccordionData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [setAccordionData]);

  // const data =
  //   '\n\n1. "The Virtual AI Hackathon" : The clock is ticking, the stakes are high, and the code is coming to life The clock is ticking, the stakes are high, and the code is coming to life.\n2. "Fingers Fly Across the Keyboard" : A race against time to solve complex problems and impress the judges.\n3. "The Power of Collaboration" : Two friends, one project, and the fuel of caffeine and determination.\n4. "The Final Countdown" : As the hours tick by, the tension builds and the code takes shape.\n5. "Victory is Ours" : The moment of triumph, the feeling of pride, and the celebration that follows.';

  // const ep_data = {
  //   episode_number: 1,
  //   Title: "The Virtual AI Hackathon",
  //   Subtitle:
  //     "The clock is ticking, the stakes are high, and the code is coming to life.",
  //   Story_for_context:
  //     "I found myself sitting in front of a computer, my fingers flying across the keyboard as I worked on a project with my friend Shubham. We were participating in a virtual AI hackathon, and the stakes were high. We had been working non-stop for hours, fueled by caffeine and determination. As the clock ticked down, our code came to life, solving complex problems and impressing the judges with its ingenuity. When the final results were announced, we were overjoyed to hear our names called as the winners. We had done it, all thanks to our hard work and dedication. The feeling of triumph and pride was exhilarating, and we celebrated long into the night.",
  // };
  // console.log(JSON.stringify(ep_data));

  // useEffect(() => {
  //   const lines = partsRawData.split('\n');

  //   const newData = [];
  //   lines.forEach((line) => {
  //     const match = line.match(/\"(.+?)\"\s*:\s*(.+)/);
  //     if (match) {
  //       const title = match[1];
  //       const subtitle = match[2];
  //       newData.push({ title, subtitle, expanded: false });
  //     }
  //   });

  //   setAccordionData(newData);
  // }, []);

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
