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
import axios from "axios";

export default function OtpPopup({ open, onClose, onVerified, email1 }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60); // Countdown timer for OTP expiration
  const [isRequestDisabled, setIsRequestDisabled] = useState(false); // Disable Request Again button
  const inputRefs = useRef([]); // Array of refs for each OTP input field

  // Function to generate a new OTP
  const generateOtp = async () => {
    if (!email1) {
      toast.error("Email is required to send OTP.", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/api/otp/generate",
        { email: email1 }
      );
      toast.info(response.data || "OTP sent to your email.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setOtp(["", "", "", "", "", ""]);
      setTimer(60);
      setIsRequestDisabled(true);
    } catch (error) {
      toast.error(
        error.response?.data || "Failed to send OTP. Please try again.",
        { position: "top-right" }
      );
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/api/otp/validate",
        { email: email1, otp: enteredOtp }
      );
      const message = response.data;

      if (message.includes("valid")) {
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        onVerified();
      } else {
        toast.error(message, { position: "top-right", autoClose: 2000 });
      }
    } catch (error) {
      toast.error(
        error.response?.data || "Failed to verify OTP. Please try again.",
        { position: "top-right" }
      );
    }
  };

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

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsRequestDisabled(false); // Enable the request button after 60 seconds
    }
  }, [timer]);

  // Generate OTP when the modal opens
  useEffect(() => {
    if (true) {
      generateOtp();
    }
  }, [true]);

  // Clear OTP fields
  const handleClearOtp = () => setOtp(["", "", "", "", "", ""]);

  return (
    <Modal
      open={true}
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
          OTP is sent to your email: {email1}
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
