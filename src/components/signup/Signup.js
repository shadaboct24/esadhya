import React from "react";
import { Box } from "@mui/material";
import SignupForm from "./SignupForm";

function SignupPage() {
  //const isMobile = useMediaQuery('(max-width:1200px)'); // Define mobile screen size (600px or less)
  return (
    <Box
      sx={{
        //width:'150vh',
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for large screens
        justifyContent: "center", // Center items horizontally in row mode
        alignItems: "center", // Align items vertically
        gap: "60px", // Space between the boxes
        margin: "50px", // Margin from all sides
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding: "20px", // Padding inside the box for spacing
        borderRadius: "12px", // Optional: Add rounded corners
        boxShadow: "0 4px 12px rgba(0, 0, 0, 1)", // Optional: Shadow for elevation
      }}
    >
      <SignupForm />
    </Box>
  );
}

export default SignupPage;
