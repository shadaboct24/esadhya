import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const LoginDetails = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8089/api/login", {
        username: email,
        password,
      });

      const userData = response.data;

      if (userData) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/profile"); // Redirect to profile page
      } else {
        setError("Login failed: No user data returned");
      }
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        justifyContent: "center",
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: "40px", color: "#007bff" }} />
      <Typography component="h1" variant="h5" sx={{ margin: "20px 0" }}>
        Sign in
      </Typography>
      <Typography
        component="p"
        color="textSecondary"
        sx={{ marginBottom: "20px" }}
      >
        Welcome, please sign in to continue
      </Typography>

      <Box
        component="form"
        noValidate
        sx={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": { backgroundColor: "#0056b3" },
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          Sign In
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link component={RouterLink} to="/forgotpassword" variant="body2">
            Forgot password?
          </Link>
          <Link component={RouterLink} to="/signup" variant="body2">
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginDetails;
