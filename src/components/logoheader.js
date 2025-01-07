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
          alignItems: "center",
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
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
          marginTop: "2vh",
        }}
      >
        <span style={{ color: "black", fontWeight: "bold", fontSize: "30px" }}>
          e-Saadhya - An Adaptable & Accessible e-Learning Framework
        </span>
        <span style={{ fontSize: "20px" }}>
          For the children with Mild Mental Retardation & Autism
        </span>
      </Box>
      <Box
        sx={{
          marginTop: "1vh",
          width: 100,
          height: 100,
          backgroundImage: `url(${"Images/esadhya_logo.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginLeft: "10px",
        }}
      />
    </Box>
  );
}

export default LogoHeader;
