import React, { useEffect, useState } from 'react'
import { Container, Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";

const Poem = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [poemData, setPoemData] = useState("")
    
   useEffect(() => {
     (async () => {
       console.log(state.dreamDescription);
       const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/dream-to-poem/results`;

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
         setPoemData(rawData);
       } catch (error) {
         console.error("Fetch error:", error);
       }
     })();
   }, [state.dreamDescription]);


    const paragraphs = poemData.split("\n\n").map((paragraph, index) => (
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
    <Container>
      <div>{paragraphs}</div>
      <Button>Save</Button>
    </Container>
  );
}

export default Poem