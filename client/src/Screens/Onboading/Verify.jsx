import React from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { MuiOtpInput } from "mui-one-time-password-input";

import { ToastContainer, toast } from "react-toastify";

import "./Email.css";
import 'bootstrap/dist/css/bootstrap.min.css';



import axios from "axios";
import NavbarComan from '../../Component/NavbarComan';
import Nav from '../../Component/Nav';

const Verify = () => {
  const { state } = useLocation();
  const { email } = state;
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
    var status;
  console.log(email);

  function handleChange(OTP) {
    setOTP(OTP);
    console.log(OTP);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (OTP.length === 0) {
      console.log('lesss')
      toast.warn("Please enter Valid OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/verify", {
        state: {
          email: email,
        },
      });
    } else {
      const data = {
        email: email,
        otp: OTP,
      };
      console.log(data)

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api/patients/verify_email/`,
          data,
          config
        )
        .then((response) => {
          const data = response.data;
          // console.log(response.data);
          status = response.status;
          console.log(status);
          if (status === 200) {
            var patient_token = data["token"];
            localStorage.setItem("patient_token", patient_token);
            navigate("/manageappointment");
          } else {
            console.log("incorrect otp");
            toast.warn("Incorrect OTP!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            navigate("/verify", {
              state: {
                email: email,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
    <Nav/>
      <Container>
        <br />
        <Row className="d-flex align-items-center justify-content-center">
          <Col xs={12} lg={3} md={6}>
            <h2 style={{ fontWeight: 750 }}>Verify OTP </h2>
            <br />

            <Form>
              <MuiOtpInput value={OTP} onChange={handleChange} />
              <br></br>
              <button style={{ border: "none" ,backgroundColor:'white' }} onClick={handleSubmit}>
                <p className="main-btn">Submit</p>
              </button>

            </Form>
          </Col>
          <Col xs={12} lg={5} md={6}>
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1693134346~exp=1693134946~hmac=716eeaf1f20cac584562c2c8c591af225f9139a0527bd0d23b07301b02914ce7" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Verify