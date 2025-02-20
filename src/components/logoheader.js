import React from "react";
import { Box, Typography } from "@mui/material";

function LogoHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F1F1",
        padding: "10px 20px",
        position: "relative",
        zIndex: 1000,
        gap: 2, // Ensures equal spacing
      }}
    >
      {/* Left Logo */}
      <Box
        sx={{
          width: 100, // Reduce size to match the text height
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://eservices.uk.gov.in/indian-emblem.svg"
          alt="Left Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Center Text */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "50%", // Prevents text from stretching
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: "bold",
            fontSize: { xs: "18px", sm: "24px", md: "30px" },
            lineHeight: 1.2,
          }}
        >
          e-Saadhya - An Adaptable & Accessible e-Learning Framework
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            marginTop: "5px",
          }}
        >
          For the children with Mild Mental Retardation & Autism
        </Typography>
      </Box>

      {/* Right Logo */}
      <Box
        sx={{
          width: 100, // Match the size of the left logo
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="Images/esadhya_logo.png"
          alt="Right Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}

export default LogoHeader;
