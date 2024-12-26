import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      // If no user data is found, redirect to login
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/signin");
  };

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 500, padding: "20px", boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "15px" }}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "10px" }}
          >
            Email: {user.email}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "10px" }}
          >
            Occupation: {user.occupation}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "10px" }}
          >
            Contact: {user.contactNumber}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "10px" }}
          >
            Address: {user.address}
          </Typography>
          {/* Logout Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ marginTop: "20px" }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
