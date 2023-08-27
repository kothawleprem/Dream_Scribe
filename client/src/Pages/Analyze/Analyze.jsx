import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from "../../Component/NavbarComan";

const Analyze = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [analyzeData, setAnalyzeData] = useState("");
  useEffect(() => {
    (async () => {
      console.log(state.dreamDescription);
      const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/dream-analysis/results`;

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
        
        setAnalyzeData(rawData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [state.dreamDescription, analyzeData]);

  const paragraphs = analyzeData.split("\n\n").map((paragraph, index) => (
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
   <NavbarComan/>
   <center> 
   <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
          Analysis of your dream
            </p>
            </center>
           
        
    <Container >
    <center>  
    <div class="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      {analyzeData !== undefined ? (
        <>
          <div>{paragraphs}</div>
          <br/>
          <Button 
           className="main-btn-comon"
          >Save</Button>
        </>
      ) : (
        <></>
      )}
      </div>
      </center>
    </Container>
    
    </>
  );
}
export default Analyze;
