import React, { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from "../../Component/NavbarComan";
import Tags from "../../Component/Tags/Tags";
import Characters from "../../Component/Characters/Characters";
import { ToastContainer, toast } from "react-toastify";

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
        toast.error(" An error occure while fetching analysis from the AI!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Fetch error:", error);
        console.error("Fetch error:", error);
      }
    })();
  }, []);

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
      <NavbarComan />
      <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">
        <center>
          <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
            Analysis of your dream
          </p>
        </center>

        <Container>
          <center>
            <div class="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {analyzeData !== undefined ? (
                <>
                  <div>{paragraphs}</div>
                  <br />
                </>
              ) : (
                <>
                  <center>
                    <Spinner animation="grow" />
                    Loading Analysis Data...
                  </center>
                </>
              )}
            </div>
          </center>
          <br />
          <Tags />
          <br />
          <Characters />
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}
export default Analyze;
