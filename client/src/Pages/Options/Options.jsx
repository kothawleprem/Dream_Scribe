import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from "../../Component/NavbarComan";
import "./Options.css"
import { BiBookOpen, BiChart, BiCameraMovie } from "react-icons/bi"; // Import icons


const Options = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [dreamDesc, setDreamDesc] = useState("");
  const [editableDesc, setEditableDesc] = useState("");

  useEffect(() => {
    setDreamDesc(state.dreamDescription);
    setEditableDesc(state.dreamDescription);
  }, [state.dreamDescription]);

  const handleEditableDescChange = (e) => {
    setEditableDesc(e.target.value);
  };

  console.log(state);

  return (
    <>  
    <NavbarComan/>
    <div className=" bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen py-16">

    <Container>
      <center>
      <p className="py-8 text-xl leading-normal font-bold text-gray-600 lg:text-xl xl:text-3xl">
            Transform your dream experiences into captivating narratives, stories, and more.
            </p>
        <Form.Control
          as="textarea"
          value={editableDesc}
          onChange={handleEditableDescChange}
          rows={6}
          className="mb-3"
        />
                  <div className="button-container">

        <Button
          className="new-btn"
          onClick={() =>
            navigate("/poem", {
              state: {
                dreamDescription: editableDesc,
              },
            })
          }
        >
            Poem <BiBookOpen className="ml-2 text-2xl" />
    </Button>
        <Button
          // variant="outline-primary"
          className="new-btn ml-4"
          onClick={() =>
            navigate("/analyze", {
              state: {
                dreamDescription: editableDesc,
              },
            })
          }
        >
            Analyze <BiChart className="ml-2 text-4xl" />

        </Button>
        <Button
          className="new-btn ml-4"
          onClick={() =>
            navigate("/movie", {
              state: {
                dreamDescription: state.dreamDescription,
              },
            })
          }
        >
           Movie <BiCameraMovie className="ml-2 text-2xl" />

        </Button>
        </div>
      </center>
    </Container>
    </div>
    </>
  );
};

export default Options;
