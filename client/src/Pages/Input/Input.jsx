import React, { useState } from 'react'
import { Container, Form, InputGroup, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Input = () => {
    const [dream, setDream] = useState(undefined);
    const [dreamDescription, setDreamDescription] = useState(undefined
        )

    const navigate = useNavigate();

    const handleDreamChange = (e) => {
        setDream(e.target.value)
    }

    const handlDreamDescriptionChange = (e) => {
        setDreamDescription(e.target.value)
    }
    //     const data = {
    //       inputs: [
    //         {
    //           data: {
    //             text: {
    //               raw: {dream},
    //             },
    //           },
    //         },
    //       ],
    //     };
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Key ${process.env.REACT_APP_KEY}`,
    //       },
    //     };
    //     const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/workflow-76e29b/results`;
    //     console.log(data, config);
    //     axios
    //       .post(url, data, config)
    //       .then((response) => {
    //         console.log(response);
    //         console.log(response.output.data.text["raw"])
    //      .catch((error) => {
    //         console.log(error)
    //      })
    //       });

    // }

    // const handleInputDream = async () => {

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Key ${process.env.REACT_APP_KEY}`);
    // myHeaders.append("Content-Type", "application/json");
    // console.log(dream)

    // var raw = JSON.stringify({
    //   inputs: [
    //     {
    //       data: {
    //         text: {
    //           raw: "In my dream, i went to the US.",
    //         },
    //       },
    //     },
    //   ],
    // });
    // console.log(raw)

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(
    //   "https://api.clarifai.com/v2/users/kothawleprem/apps/dreamscribe/workflows/workflow-76e29b/results",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
    // };

    const handleInputDream = async () => {
      if (!dream) {
        console.log("Dream is empty");
        return;
      }

      const url = `${process.env.REACT_APP_C_BASE_URL}/v2/users/${process.env.REACT_APP_USER_ID}/apps/dreamscribe/workflows/workflow-76e29b/results`;

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
        const rawResult = responseData.results[0].outputs[1].data.text.raw;
        const dreamDesc = rawResult.replace(/\n/g, "");
        setDreamDescription(dreamDesc);
        navigate("/options",{
            state:{
                "dreamDescription": dreamDesc
            }
        })
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };





  return (
    <Container>
      <center>
        <h3>Enter your Dream and we will expand it!</h3>
        <p>Please limit to 50 words.</p>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            onChange={handleDreamChange}
          />
          <Button onClick={handleInputDream}>✨</Button>
        </InputGroup>
        <h2>OR</h2>
        <h3>Enter your Dream's description!</h3>
        <p>Please limit to 150 words.</p>
        <InputGroup>
          <Form.Control as="textarea" aria-label="With textarea" rows="7" />
          <Button>✨</Button>
        </InputGroup>
      </center>
    </Container>
  );
}

export default Input