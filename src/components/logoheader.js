import React from "react";
import { Box } from "@mui/material";

function LogoHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#F3F1F1",
        height: 120,
        position: "static",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          marginTop: "1vh",
          width: 100,
          height: 100,
          backgroundImage: `url(${"https://eservices.uk.gov.in/indian-emblem.svg"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginLeft: "10px",
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          marginTop: "4vh",
        }}
      >
        <span style={{ color: "black", fontWeight: "bold" }}>E-Sadhya</span>
        <span style={{ color: "black" }}>By CDAC</span>
      </Box>
      <Box
        sx={{
          marginTop: "1vh",
          width: 100,
          height: 100,
          backgroundImage: `url(${"Images/esadhya_logo.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Box>
  );
}

export default LogoHeader;
