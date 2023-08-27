import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComan from "../../Component/NavbarComan";
import "./Options.css"

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
    <Container>
      <center>
      <p className="py-8 text-xl leading-normal text-gray-600 lg:text-xl xl:text-3xl">
            Transform your dream experiences into captivating narratives, stories, and more.
            </p>
        <Form.Control
          as="textarea"
          value={editableDesc}
          onChange={handleEditableDescChange}
          rows={6}
          className="mb-3"
        />
        <Button
          className="main-btn-comon"
          onClick={() =>
            navigate("/poem", {
              state: {
                dreamDescription: editableDesc,
              },
            })
          }
        >
          Poem
        </Button>
        <Button
          // variant="outline-primary"
          className="main-btn-comon ml-4"
          onClick={() =>
            navigate("/analyze", {
              state: {
                dreamDescription: editableDesc,
              },
            })
          }
        >
          Analyze
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/movie", {
              state: {
                dreamDescription: state.dreamDescription,
              },
            })
          }
        >
          Movie
        </Button>
      </center>
    </Container>
    </>
  );
};

export default Options;
