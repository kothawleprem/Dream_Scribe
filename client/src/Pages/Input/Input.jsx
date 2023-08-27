import React, { useState } from 'react'
import { Container, Form, InputGroup, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavbarComan from '../../Component/NavbarComan';

const Input = () => {
    const [dream, setDream] = useState(undefined);
    const [inputType, setInputType] = useState('dream'); // Added inputType state

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
    const toggleInputType = () => {
      setInputType(inputType === 'dream' ? 'description' : 'dream');
    };
  




  return (
    <>
       <NavbarComan />
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none ${
                inputType === 'dream' ? 'bg-opacity-100' : 'bg-opacity-50'
              }`}
              onClick={() => setInputType('dream')}
            >
              Enter Dream
            </button>

            <button
              className={`bg-blue-500 text-white px-4 ml-4 py-2 rounded-full focus:outline-none ${
                inputType === 'description' ? 'bg-opacity-100' : 'bg-opacity-50'
              }`}
              onClick={() => setInputType('description')}
            >
              Enter Dream's Description
            </button>
            <h3 className="text-3xl font-semibold mt-4">
              Enter your {inputType === 'dream' ? 'Dream' : 'Dream Description'} and we will expand it!
            </h3>
            <p className="text-gray-600">Please limit to {inputType === 'dream' ? '50 words' : '150 words'}.</p>
          </div>
          <div className="flex flex-col items-center">
            <textarea
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder={`Enter your ${inputType === 'dream' ? 'dream' : 'dream\'s description'}...`}
              rows={inputType === 'dream' ? 3 : 5}
              onChange={handleDreamChange}
            ></textarea>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={handleInputDream}
            >
              ✨ Expand
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Input