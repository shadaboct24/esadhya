import React, { useState } from "react";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";

export default function OTPInputPopup({ open, onClose }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    // Replace with your OTP validation logic
    if (otp === "123456") {
      // Example of correct OTP
      alert("OTP verified successfully!");
      setError("");
      onClose(); // Close the popup if OTP is correct
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Enter OTP
        </Typography>
        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" fullWidth onClick={handleVerify}>
          Verify
        </Button>
      </Box>
    </Modal>
  );
}
