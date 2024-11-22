import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Grid,
  Link,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function OtpPopup({ open, onClose, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(60); // Countdown timer for OTP expiration
  const [isRequestDisabled, setIsRequestDisabled] = useState(false); // Disable Request Again button
  const inputRefs = useRef([]); // Array of refs for each OTP input field

  // Function to generate a new OTP and reset states
  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    console.log("Generated OTP:", otpCode);
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setIsRequestDisabled(true); // Disable the request button for 60 seconds

    // Show toast notification
    toast.info("OTP sent to your mobile number!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  // Generate OTP when the modal opens
  useEffect(() => {
    if (open) {
      generateOtp(); // Generate an OTP when the popup opens
    }
  }, [open]);

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsRequestDisabled(false); // Enable the request button after 60 seconds
    }
  }, [timer]);

  // Handle OTP input changes
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Limit to one character
    setOtp(newOtp);

    // Move focus to the next input if a digit was entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      toast.success("OTP verified successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        style: { backgroundColor: "green", color: "white" },
      });
      onVerified();
    } else {
      toast.error("Incorrect OTP, please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  // Clear OTP fields
  const handleClearOtp = () => setOtp(["", "", "", "", "", ""]);

  return (
    <Modal
      open={open}
      onClose={(e, reason) => reason === "backdropClick" && e.stopPropagation()}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Verify OTP
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          OTP is sent to your Mobile Number: XXXXXX5077
        </Typography>

        {/* OTP Input Fields */}
        <Grid container spacing={1} justifyContent="center" mb={2}>
          {otp.map((digit, index) => (
            <Grid item key={index} xs={2}>
              <TextField
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        {/* Buttons and Timer */}
        <Stack direction="row" justifyContent="center" spacing={2} mb={2}>
          <Button variant="contained" color="success" onClick={handleVerifyOtp}>
            Verify
          </Button>
          <Button variant="outlined" onClick={handleClearOtp}>
            Clear
          </Button>
        </Stack>

        <Typography variant="caption" display="block" align="center">
          0:{timer < 10 ? `0${timer}` : timer}
        </Typography>

        {/* Link to Request Again */}
        <Typography variant="body2" align="center" mt={2}>
          Didn’t receive OTP?{" "}
          <Link
            href="#"
            underline="hover"
            onClick={() => {
              if (!isRequestDisabled) generateOtp();
            }}
            color={isRequestDisabled ? "text.disabled" : "primary"}
            sx={{ pointerEvents: isRequestDisabled ? "none" : "auto" }}
          >
            Request again
          </Link>
        </Typography>

        {/* Close Button */}
        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Button variant="text" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
