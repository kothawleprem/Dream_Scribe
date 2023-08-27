import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import login from "../../lotties/login.json";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const style = {
    height: "80%",
    width: "80%",
  };
  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value.trim(),
    });
  };

  
  console.log(process.env.REACT_APP_API_URL);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.warn("Please enter an Email Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } else {
      const data = {
        email: email["email"],
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(data,config)

      console.log(process.env.REACT_APP_API_URL);

      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api/patients/email/`,
          data,
          config
        )
        .then((response) => {
          console.log(response.data);
          navigate("/verify", {
            state: {
              email: email["email"],
            },
          });
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      {/* <center> */}
      <Container>
        <br />
        <br />
        <Row className=" d-flex align-items-center justify-content-center">
          <Col xs={12} lg={6} md={12}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <h2 style={{ fontWeight: 800 }}>Login</h2>
                <br />
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  style={{ width: 330 }}
                />
                {/* <TextField type="email" id="standard-basic" label="Enter your email id" variant="standard"  style={{width:330}}/> */}

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Link
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleSubmit}
                to="/Formview"
              >
                {" "}
                <p className="main-btn-email">Submit</p>{" "}
              </Link>
            </Form>
          </Col>

          <Col xs={12} lg={5} md={12}>
            {/* <Lottie animationData={login} className="loti-img" style={style} /> */}
          </Col>
        </Row>
      </Container>
      {/* </center> */}
      <ToastContainer />
    </>
  );
};

export default Email;