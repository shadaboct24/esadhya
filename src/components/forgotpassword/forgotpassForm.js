import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { API_URL } from "../../Constants/api_url";

// backend of checkemail is in loginService

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [generatedId, setGeneratedId] = useState("");
  const [email, setEmail] = useState("");

  // these are for enabling and diabling otp
  const [sentOtp, setSentOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailotp, setEmailOtp] = useState("");

  // this function is for sending otp to mail
  const handleSendOtp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    // Check if email is entered
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    // Validate email format
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // setSentOtp(true);
    setLoading(true);

    let data = {
      email: email,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/checkemail`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    if (!loading) {
      axios
        .request(config)
        .then((response) => {
          //console.log("Response received:", response);
          if (response.data === true) {
            toast.success("Success! Verification Code is sent .", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setSentOtp(true);
            setLoading(false);
          } else if (response.data === false) {
            // toast.success("email is wrong .", {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            // });
            alert("Email is not exist in the system.");
            setLoading(false);
            return;
          }
        })
        .catch((error) => {
          const errormessage = error?.response?.data || "An Error";
          toast.error("Error! " + errormessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        });
    }
  };

  //for verifying email otp
  const verifyEmail = () => {
    let data = {
      email: email,
      otp: emailotp,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/otp/validate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    // console.log("otp is", emailotp);
    axios
      .request(config)
      .then((response) => {
        if (response.data === true) {
          toast.success("Success! Your Email Verified ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerified(true);
        }
      })
      .catch((error) => {
        const errormessage = error?.response?.data || "An Error";
        toast.error("Error! " + errormessage, {
          position: "top-right",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleChangePassword = () => {
    if (email === "") {
      alert("Please enter the email first.");
      return;
    }
    if (!verified) {
      alert("Email is not verified");
      return;
    }
    if (password !== confirmPassword) {
      alert("password is not matching");
      return;
    }
    let data = {
      email: email,
      password: password,
    };

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/forgotpassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data === true) {
          toast.success("Success! Your password is changed ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        const errormessage = error?.response?.data || "An Error";
        toast.error("Error! " + errormessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Handle input changes
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        justifyContent: "center",
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: "40px", color: "#007bff" }} />
      <Typography component="h1" variant="h5" sx={{ margin: "20px 0" }}>
        Forgot Password
      </Typography>

      <Box
        component="form"
        noValidate
        sx={{
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled={verified}
            value={email}
            onChange={handleEmailChange}
          />
          <LoadingButton
            onClick={handleSendOtp}
            loading={loading}
            variant="contained"
            disabled={verified || sentOtp}
          >
            send OTP
          </LoadingButton>
        </Stack>
        {sentOtp && !verified && (
          <Stack direction="row" spacing={2}>
            <TextField
              label="Enter OTP"
              name="otpnumber"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                setEmailOtp(input);
              }}
              value={emailotp}
              sx={{ maxWidth: 400 }}
            />
            <Button
              variant="contained"
              disabled={verified}
              onClick={verifyEmail}
            >
              Verify OTP
            </Button>
          </Stack>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  disabled={password === ""}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  disabled={confirmPassword === ""}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            padding: "10px",
            fontSize: "16px",
            marginTop: "20px",
          }}
          onClick={handleChangePassword}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
