import React, { useEffect, useState } from 'react'
import { Container, Button, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from '../../Component/NavbarComan';
import { ToastContainer, toast } from "react-toastify";

const Poem = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [poemData, setPoemData] = useState("")
    const [editablePoem, setEditablePoem] = useState("");

    
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
        toast.error(" An error occure while fetching Poem from the AI!", {
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

   const handleEditablePoemChange = (e) => {
    setEditablePoem(e.target.value);
  };

  const handleSave = () => {

  };


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
    <>
      <NavbarComan />
      <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">
        <center>
          <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
            Your dream to Poem
          </p>
          <Container>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className=" mb-4">
                {poemData.length < 2 ? (
                  <>
                    <div>
                      Your Poem is Loading....
                      <Spinner animation="grow" />
                    </div>{" "}
                  </>
                ) : (
                  <>
                    <div className="poem-preview">{paragraphs}</div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </center>
      </div>
      <ToastContainer />
    </>
  );
}

export default Poem