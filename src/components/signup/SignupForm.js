import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Stack,
  Typography,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OtpPopup from "./otppopup";
import LoadingButton from "@mui/lab/LoadingButton";
import { API_URL } from "../../Constants/api_url";

const ResponsiveForm = () => {
  // State management
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
    dob: null,
    role: "",
    occupation: "",
    email: "",
    contactNumber: "",
    schoolSelected: "",
    schoolRegNumber: "",
    schoolPasscode: "",
    country: "",
    state: "",
    district: "",
    belonging: "",
    cityOrMandal: "",
    street: "",
    houseNo: "",
    address: "",
  });

  const [openDialog, setOpenDialog] = useState(false); // confirm submission dialogue
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // these are for enabling and diabling otp
  const [sentOtp, setSentOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailotp, setEmailOtp] = useState("");

  const handleSendOtp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    // Check if email is entered
    if (!formData.email) {
      alert("Please enter an email address.");
      return;
    }
    // Validate email format
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // setSentOtp(true);
    setLoading(true);

    let data = {
      email: formData.email,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/otp/generate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    if (!loading) {
      axios
        .request(config)
        .then((response) => {
          //console.log("Response received:", response);
          if (response.data === true) {
            toast.success("Success! Verification Code is sent .", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setSentOtp(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          toast.error("Error! " + error.response.data.error_message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        });
    }
  };

  const verifyEmail = () => {
    let data = {
      email: formData.email,
      otp: emailotp,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/otp/validate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    console.log("otp is", emailotp);
    axios
      .request(config)
      .then((response) => {
        if (response.data === true) {
          toast.success("Success! Your Email Verified ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerified(true);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error_message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setPasswordError(formData.password !== value); // Set error if passwords don’t match
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert("Password should match");
      return; // Prevent submission if passwords don't match
    }
    setOpenDialog(true); // Show the dialog
  };

  // Function to handle actual submission after dialog confirmation
  const confirmSubmit = async () => {
    console.log("before submission", formData);
    try {
      const response = await axios.post("http://localhost:8089/registeruser", {
        ...formData,
        password: formData.password, // Only send the password
      });

      console.log("Response:", response.data);

      // Reset the form
      setFormData({
        fullName: "",
        username: "",
        password: "",
        gender: "",
        dob: null,
        role: "",
        occupation: "",
        email: "",
        contactNumber: "",
        schoolSelected: "",
        schoolRegNumber: "",
        schoolPasscode: "",
        country: "",
        state: "",
        district: "",
        belonging: "",
        cityOrMandal: "",
        street: "",
        houseNo: "",
        address: "",
      });
      setConfirmPassword(""); // Clear confirm password as well
    } catch (error) {
      console.error("Error:", error);
    }
    // Close the dialog after submission
    setOpenDialog(false);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Signup Form
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ m: 2 }}
          onSubmit={handleSubmit}
        >
          {/* Personal Details Section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Personal Details
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Full Name"
                name="fullName"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
                value={confirmPassword}
                error={passwordError}
                helperText={passwordError ? "Passwords do not match" : ""}
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <FormControl sx={{ flex: 1 }} required>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" onChange={handleInputChange}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(newValue) =>
                    setFormData((prevData) => ({ ...prevData, dob: newValue }))
                  }
                  TextFiledComponent={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                  sx={{ flex: 1 }} // This ensures the date picker scales properly with other fields
                />
              </LocalizationProvider>
            </Stack>

            <FormControl fullWidth required>
              <InputLabel>Role of Applicant</InputLabel>
              <Select
                label="Role of applicant" // in the label we can write anything it will prevent line over text
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <MenuItem value="SpecialE">Special educator</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="MedicalO">Medical officer</MenuItem>
                <MenuItem value="Psy">Psychologist</MenuItem>
                <MenuItem value="ClinicalA">Clinical Assistant</MenuItem>
                <MenuItem value="Sclp">School Parent</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Occupation"
              name="occupation"
              variant="outlined"
              fullWidth
              required
              onChange={handleInputChange}
            />
          </Stack>

          {/* Contact Details Section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Contact Details
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Email ID"
                name="email"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
                sx={{ maxWidth: 400 }}
              />
              {/* <Button
                variant="contained"
                disabled={verified}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button> */}
              <LoadingButton
                onClick={handleSendOtp}
                loading={loading}
                variant="contained"
                disabled={verified || sentOtp}
              >
                send OTP
              </LoadingButton>
              {/* this otppopup for sending otp  */}
              {/* <OtpPopup
                open={sentOtp}
                onClose={handleClosePopup}
                onVerified={handleVerificationSuccess}
                email1={formData.email}
              /> */}
            </Stack>
            {sentOtp && !verified && (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Enter OTP"
                  name="otpnumber"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, "");
                    setEmailOtp(input);
                  }}
                  value={emailotp}
                  sx={{ maxWidth: 400 }}
                />
                <Button
                  variant="contained"
                  disabled={verified}
                  onClick={verifyEmail}
                >
                  Verify OTP
                </Button>
              </Stack>
            )}

            <Stack direction="row" spacing={2}>
              <TextField
                label="Contact Number"
                name="contactNumber"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
                sx={{ maxWidth: 400 }}
              />
              <Button variant="contained">send otp</Button>
            </Stack>
          </Stack>

          {/* School Details Section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            School Details
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel>School</InputLabel>
                <Select
                  label="School"
                  name="schoolSelected"
                  value={formData.schoolSelected}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                >
                  <MenuItem value="school1">KV Madras Road</MenuItem>
                  <MenuItem value="school2">KV Mahadevapura</MenuItem>
                  <MenuItem value="school3">JNV Mandya</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="School Registration Number"
                name="schoolRegNumber"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Stack>
            <TextField
              label="School Passcode"
              name="schoolPasscode"
              variant="outlined"
              fullWidth
              required
              disabled={!formData.schoolSelected}
              onChange={handleInputChange}
            />
          </Stack>

          {/* Address Details Section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Address Details
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Country"
                name="country"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="State"
                name="state"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="District"
                name="district"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Stack>
            <FormControl required>
              <FormLabel>You Are Belonging To</FormLabel>
              <RadioGroup
                row
                name="belonging"
                value={formData.belonging}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="city"
                  control={<Radio />}
                  label="City"
                />
                <FormControlLabel
                  value="mandal"
                  control={<Radio />}
                  label="Mandal"
                />
              </RadioGroup>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <TextField
                label={`Enter ${formData.belonging === "city" ? "City" : "Mandal"}`}
                name="cityOrMandal"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="Street"
                name="street"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <TextField
                label="House No"
                name="houseNo"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Stack>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              required
              onChange={handleInputChange}
            />
          </Stack>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-submission-dialog"
      >
        <DialogTitle id="form-submission-dialog">Form Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your form has been successfully submitted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmSubmit} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResponsiveForm;
