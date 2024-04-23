import { React, useEffect, useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Checkbox,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import "./login.css";
import styled from "styled-components";
// import { PASSWORD, TEXT } from "./consts";
// 
// import { showToasts } from "../toast";
import { ToastContainer } from "react-toastify";
import { LoginFunction } from "./LoginFunction";
// import LoginComponent from "./userLogin/Login";
// import ForgotPassword from "./resetPassword/ForgotPassword";


export default function Login() {
  const [type, setType] = useState();
  const [showLogin, setShowLogin] = useState(true);

  const sheet = {
    mainTopic: {
      fontSize: 60,
    },
    mainTopicSm: {
      fontSize: 30,
    },
  };

  // useIsUserLoggedIn()
  // useIsUserLoggedIn()
    

  const controlShow = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="d-flex container-fluid mx-0 px-0 flex-lg-row flex-column">
      <div className="d-center login-back flex-column heading-container  d-lg-flex d-none ">
        {/* <img src={logo} /> */}
        <div className="d-flex justify-content-center text-purple f-shippori text-shadow-sm mt-4">
          <h1
            style={sheet.mainTopic}
            className="text-purple f-shippori text-shadow-sm text-center"
          >
            WELCOME TO HARD SMART
          </h1>
        </div>
      </div>
      <div className="login-container ">
        {/* {showLogin ? (
          <LoginComponent controlShow={controlShow} />
        ) : (
          <ForgotPassword controlShow={controlShow} />
        )} */}
        <LoginFunction/>
      </div>

      <ToastContainer />
    </div>
  );
}

