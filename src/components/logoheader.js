import React from "react";
import { Box, Typography } from "@mui/material";

function LogoHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F3F1F1",
        padding: "10px 20px",
        flexWrap: "nowrap", // Prevent wrapping
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* Left Logo */}
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundImage: `url(${"https://eservices.uk.gov.in/indian-emblem.svg"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginLeft: "10px",
          flexShrink: 0,
        }}
      />

      {/* Center Text */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: "bold",
            fontSize: { xs: "18px", sm: "24px", md: "30px" }, // Responsive font size
            lineHeight: 1.2, // Adjust line height for better spacing
          }}
        >
          e-Saadhya - An Adaptable & Accessible e-Learning Framework
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive font size
            marginTop: "5px",
          }}
        >
          For the children with Mild Mental Retardation & Autism
        </Typography>
      </Box>

      {/* Right Logo */}
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundImage: `url(${"Images/esadhya_logo.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginRight: "10px",
          flexShrink: 0, // Prevents the logo from resizing on smaller screens
        }}
      />
    </Box>
  );
}

export default LogoHeader;
