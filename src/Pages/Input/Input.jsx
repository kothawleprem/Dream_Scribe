import React, { useState } from 'react'
import { Container, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavbarComan from '../../Component/NavbarComan';
import AudioInputComponent from '../audio';
import { ToastContainer, toast } from "react-toastify";

const Input = () => {
    const [dream, setDream] = useState(undefined);
    const [inputType, setInputType] = useState('dream'); // Added inputType state
    const [isLoading, setIsLoading] = useState(false)

    const [dreamDescription, setDreamDescription] = useState(undefined)

    const navigate = useNavigate();

    const handleDreamChange = (e) => {
        setDream(e.target.value)
    }

    const handlDreamDescriptionChange = (e) => {
        setDreamDescription(e.target.value)
    }
   
    const handleInputDream = async () => {
      if (!dream) {
        console.log("Dream is empty");
        return;
      }
      setIsLoading(true)

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
        toast.error(" An error occure while fetching data from the AI!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false)
        console.error("Fetch error:", error);
      }
    };
    const toggleInputType = () => {
      setInputType(inputType === 'dream' ? 'description' : 'dream');
    };
  

  const handleInputDreamDescription = async () => {
    if (!dreamDescription) {
      console.log('Dream description is empty');
      return;
    }
    const dreamDesc = "In the dream, " + dreamDescription
    navigate("/options", {
      state: {
        dreamDescription: dreamDesc,
      },
    });
  };





  return (
    <>
      <NavbarComan />
      <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <button
              className={`bg-indigo-600 text-white  font-bold px-8 py-2 rounded-full focus:outline-none ${
                inputType === "dream" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => setInputType("dream")}
            >
              Enter Dream
            </button>

            <button
              className={`bg-indigo-600 text-white font-bold px-4 ml-4 py-2 rounded-full focus:outline-none ${
                inputType === "description" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => setInputType("description")}
            >
              Enter Dream's Description
            </button>
            <h3 className="text-3xl   font-bold text-gray-600  mt-4">
              Enter your{" "}
              {inputType === "dream"
                ? "Dream and we will expand it!"
                : "Dream's Description"}
            </h3>
            <p className="text-gray-600">
              {" "}
              {inputType === "dream"
                ? "Please have a short description"
                : "Please have an elaborated description of about 120 words"}
              .
            </p>
          </div>
          <div className="flex flex-col items-center">
            <textarea
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder={`Enter your ${
                inputType === "dream" ? "dream" : "dream's description"
              }...`}
              rows={inputType === "dream" ? 3 : 5}
              // onChange={handleDreamChange}
              onChange={
                inputType === "dream"
                  ? handleDreamChange
                  : handlDreamDescriptionChange
              }
            ></textarea>
            <button
              className="main-btn-comon mt-6"
              onClick={
                inputType === "dream"
                  ? handleInputDream
                  : handleInputDreamDescription
              }
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" variant="light" size="sm" />
                  &nbsp;
                  {inputType === "dream" ? "✨ Expanding ..." : "Go"}
                </>
              ) : (
                <>{inputType === "dream" ? "✨ Expand" : "Go"}</>
              )}
            </button>

            {/* <AudioInputComponent/> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Input