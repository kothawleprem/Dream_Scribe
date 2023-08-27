import React, { useEffect, useState } from 'react'
import { Container, Button ,Form} from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from '../../Component/NavbarComan';

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
         console.error("Fetch error:", error);
       }
     })();
   }, [state.dreamDescription]);

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
    <NavbarComan/>
    <div style={{ backgroundImage: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)', minHeight: '100vh', padding: '2rem' }}>
    <center  > 
    <p className="py-1 text-xl font-bold leading-normal text-gray-600 lg:text-xl xl:text-4xl">
          Your dream to Poem
            </p>
    <Container>
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className=" mb-4">
    <div className="poem-preview">
      {paragraphs}
    </div>
      <Button
        className="main-btn-comon"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
    </div>

  </Container>
  </center>
  </div> 
  </>
  );
}

export default Poem