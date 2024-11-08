import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import LoginSide from "./loginside";
import LoginDetails from "./loginform";

function LoginPage() {

  const isMobile = useMediaQuery('(max-width:1200px)'); // Define mobile screen size (600px or less)
  return (
    <Box
    sx={{
        //width:'150vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for large screens
        justifyContent: 'center', // Center items horizontally in row mode
        alignItems: 'center', // Align items vertically
        gap: '60px', // Space between the boxes
        margin: '50px', // Margin from all sides
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: '20px', // Padding inside the box for spacing
        borderRadius: '12px', // Optional: Add rounded corners
        boxShadow: '0 4px 12px rgba(0, 0, 0, 1)', // Optional: Shadow for elevation
      }}
    >
      <Box 
          sx={{
            width: '400px',    // Set the desired width for the box
            height: '400px',   // Set the desired height for the box
            overflow: 'hidden', // Ensures the image stays within the box
            //alignItems:'center',
          }}
        >
          <img 
            src="Images\1729836545435rxtizcqo.webp" 
            alt="image1" 
            style={{ width: '100%', height: '100%', }} // Adjust the image size
          />
     </Box>

      <Box>
        <LoginDetails/>
      </Box> 
      {/* Conditionally render image Box based on screen size */}
      {!isMobile && (
        <>
      <Box
          sx={{
            width: '1px',          // Line width (thin vertical line)
            height: '500px',        // Line height (adjust as needed)
            backgroundColor: '#979594', // Line color
            margin: '0 20px',       // Optional: Margin around the line for spacing
          }}
      />

      
        <Box>
          <LoginSide/>
        </Box>
        </>
      )}
    </Box>
  );
}

export default LoginPage;
