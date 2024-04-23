import { React, useState } from "react";
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
import { showToasts } from "../toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const sheet = {
  mainTopic: {
    fontSize: 60,
  },
  mainTopicSm: {
    fontSize: 30,
  },
};

export function LoginFunction(props) {
  //   const { controlShow, loginUser } = props;

  const navigate = useNavigate()

  const [type, setType] = useState();
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [error, setError] = useState({
    errorMobile: " ",
    errorPassword: " ",
  });

  const submit = async (e) => {
    // e.preventDefault();
    // const mobileValid = mobileValidation(formData.mobile);
    // const passwordValid = passwordValidation(formData.password);
    // if (mobileValid) {
    //   setError({
    //     errorMobile: "",
    //     errorPassword: "",
    //   });
    // } else {
    //   setError({
    //     errorMobile: "Please Enter Valid Mobile Number",
    //     errorPassword: "",
    //   });
    //   return;
    // }
    // if (passwordValid) {
    //   setError({
    //     errorMobile: "",
    //     errorPassword: "",
    //   });
    // } else {
    //   setError({
    //     errorMobile: "",
    //     errorPassword: "Password should contain 6 to 10 characters",
    //   });
    //   return;
    // }
    // loginUser(formData);
    login()
  };

  const handleChange = (e) => {
    setError({
      errorMobile: "",
      errorPassword: "",
    });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async ()=>{

    //  try {

    //   const response = await userLogin(formData)
    //   if(response.status == 200){
    //     console.log(response)
    //     showToasts("SUCCESS", "successfully login")
    //   }else{
    //     showToasts("ERROR", "login unsuccessfull")
    //   }

    //  } catch (error) {
    //   console.log(error)
    //   showToasts("ERROR", "login unsuccessfull")
    //  }
     showToasts("SUCCESS", "Login Success")
    navigate('/dashboard')
    

  }

  return (
    <Paper
      elevation={5}
      className="login-paper h-100 d-center flex-column "
      sx={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(85, 177, 247,1) 100%);",
      }}
    >
      {/* <img src={logo} className="d-lg-none" /> */}
      <div className="d-flex justify-content-center mb-5 ">
        <h1
          style={sheet.mainTopicSm}
          className="text-white text-shadow-sm d-inline d-lg-none text-center"
        >
          WELCOME TO GARAGE MANAGER
        </h1>
      </div>
      <hr></hr>

      <div className="w-75 mb-4 text-white">
        <h1 className="text-left text-large mt-2 mb-2  m-0 p-0">Login</h1>
        <p>Use your credentials to login</p>
      </div>

      <form className="w-75 mb-5 text-white" onSubmit={submit}>
        <div className="w-100">
          <div className="mb-2">
            <label className="text-small mb-1">Mobile Number</label>
            <TextField
              type="text"
              align="center"
              //   ref={userRef}
              fullWidth
              placeholder="07X-XXXXXXX"
              name="mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={handleChange}
              required
              autoFocus
              autoComplete="off"
              classes="text-field"
              sx={{
                "& .MuiInputBase-root": {
                  color: "primary.main",
                },
                "& input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ebecec", // Normal state border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                },
              }}
            />
            <div className="error">{error.errorMobile}</div>
          </div>
          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <label className="text-small-extra">Password</label>
            </div>
            <TextField
              type={type}
              placeholder="*********"
              fullWidth
              name="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputBase-root": {
                  color: "primary.main",
                },
                "& input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ebecec", // Normal state border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                },
              }}
            />
            <div className="error">{error.errorPassword}</div>
            <div className="d-flex align-items-center">
              <Checkbox
                // onChange={() => setType(type === PASSWORD ? TEXT : PASSWORD)}
                color="secondary"
                sx={{
                  color: "#ebecec",
                  "& .MuiIconButton-root": {
                    borderColor: "#ebecec", // Border color
                  },
                }}
              />
              <p className="text-small mt-3">show password</p>
            </div>
          </div>
          <div className="d-flex justify-content-right flex-column">
            <Button
              fullWidth
              variant="contained"
              color="info"
              type="submit"
              onClick={submit}
            >
              <Typography color="white" fontSize="14px">
                Log In
              </Typography>
            </Button>
            {/* <p className="mt-3 text-small link">
              <a
                className="link-offset-2 link-underline link-opacity-100-hover"
                onClick={() => {
                  //   controlShow();
                }}
              >
                Forgotten Password?
              </a>
            </p> */}
          </div>
        </div>
      </form>
    </Paper>
  );
}
