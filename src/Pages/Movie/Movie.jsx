import React, { useState, useEffect } from 'react';
import NavbarComan from '../../Component/NavbarComan';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Movie = () => {
  // const [ partsRawData, setPartsRawData] = useState("");
  const [accordionData, setAccordionData] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      const dreamPrev = state.dreamDescription
      console.log(state.dreamDescription);
      const wordsArray = dreamPrev.split(" ");
      const dream = wordsArray.slice(4).join(" ");
      console.log(dream)
      const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/workflow-24614a/results`;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Key ${process.env.REACT_APP_KEY}`);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        inputs: [
          {
            data: {
              text: {
                raw: dream,
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
        // const sections = rawData.split("\n\n");
        // console.log(sections);
        setAccordionData(rawData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, []);

 const paragraphs = accordionData.split("\n\n").map((paragraph, index) => (
   <p key={index}>
     {paragraph.split("\n").map((line, lineIndex) => (
       <React.Fragment key={lineIndex}>
         {line}
         <br />
       </React.Fragment>
     ))}
   </p>
 ));
  return (
    <>
      <NavbarComan />
      {accordionData.length !== 0 ? (
        <>
          <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">
            <center>
              <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
                Your dream to a One Minute Video Script
              </p>
              <Container>
                <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className=" mb-4">
                    <div className="poem-preview">{paragraphs}</div>
                  </div>
                </div>
              </Container>
            </center>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Movie;
