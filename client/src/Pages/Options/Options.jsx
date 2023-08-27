import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Options = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [dreamDesc, setDreamDesc] = useState("");

  useEffect(() => {
    setDreamDesc(state.dreamDescription);
  }, [state.dreamDescription]);

  console.log(state);

  return (
    <Container>
      <center>
        <br />
        <p>{dreamDesc}</p>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/poem", {
              state: {
                dreamDescription: state.dreamDescription,
              },
            })
          }
        >
          Poem
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/analyze", {
              state: {
                dreamDescription: state.dreamDescription,
              },
            })
          }
        >
          Analyze
        </Button>
      </center>
    </Container>
  );
};

export default Options;
