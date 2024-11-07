import React, { useState } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const NewAdmissionForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    username: "",
    password: "",
    adminPasscode: "",
    adminContactNumber: "",
    schoolId: "",
    schoolName: "",
    schoolAdminId: "",
    schoolAddress: "",
    schoolCity: "",
    schoolState: "",
    schoolCountry: "",
    schoolRegNumber: "",
    schoolPasscode: "",
    schoolType: "",
    schoolLandline: "",
    schoolContactNumber: "",
    schoolPinCode: "",
    schoolLogo: "",
    schoolStreet: "",
    schoolBuildingNumber: "",
  });

  // State for the dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply different validation rules based on the field
    if (
      [
        "adminName",
        "schoolName",
        "schoolState",
        "schoolCountry",
        "schoolType",
        "schoolCity",
      ].includes(name)
    ) {
      // Allow only alphabets and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (
      [
        "adminContactNumber",
        "schoolId",
        "schoolAdminId",
        "schoolRegNumber",
        "schoolLandline",
        "schoolContactNumber",
        "schoolPinCode",
        "schoolBuildingNumber",
      ].includes(name)
    ) {
      // Allow only numbers and restrict to specific length for contact numbers
      if (/^\d*$/.test(value)) {
        if (name === "adminContactNumber" || name === "schoolContactNumber") {
          if (value.length <= 10) {
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      }
    } else if (name === "adminEmail") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Simple email validation
      setEmailError(!emailRegex.test(value));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      alert("Please enter a valid email.");
      return;
    }
    setOpenDialog(true); // Open the dialog on submit
  };

  // Handle dialog confirmation
  const handleDialogConfirm = async () => {
    console.log("Submitted Data:", formData); // Log the form data to console

    // Simulate backend request with Axios
    try {
      await axios.post("https://false-url.com/api/newAdmission", formData);
      alert("Form submitted successfully!"); // This can be used as a second alert after closing dialog if needed
    } catch (error) {
      console.error("Failed to submit data:", error);
    }

    setOpenDialog(false); // Close the dialog
    setFormData({
      adminName: "",
      adminEmail: "",
      username: "",
      password: "",
      adminPasscode: "",
      adminContactNumber: "",
      schoolId: "",
      schoolName: "",
      schoolAdminId: "",
      schoolAddress: "",
      schoolCity: "",
      schoolState: "",
      schoolCountry: "",
      schoolRegNumber: "",
      schoolPasscode: "",
      schoolType: "",
      schoolLandline: "",
      schoolContactNumber: "",
      schoolPinCode: "",
      schoolLogo: "",
      schoolStreet: "",
      schoolBuildingNumber: "",
    }); // Reset form fields
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "4vh",
        }}
      >
        Welcome To New School Registration
      </Typography>
      <Paper
        elevation={5}
        sx={{
          width: "80vw",
          marginTop: "5vh",
          backgroundColor: "#e1e0d9",
          marginLeft: "10vw",
        }}
      >
        <Container maxWidth="md" sx={{ marginTop: "5vh" }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ m: 2 }}
            onSubmit={handleSubmit}
          >
            {/* Admin Details Section */}
            <Typography variant="h5" gutterBottom>
              Admin Details
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Admin Name"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Admin Email"
                  name="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  error={emailError}
                  helperText={emailError ? "Enter valid Email Format" : ""}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Admin Passcode"
                  name="adminPasscode"
                  type="password"
                  value={formData.adminPasscode}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="adminContactNumber"
                  value={formData.adminContactNumber}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>

            {/* School Details Section */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              School Details
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="School ID"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="School Name"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="School Admin ID"
                  name="schoolAdminId"
                  value={formData.schoolAdminId}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="School Address"
                  name="schoolAddress"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="City / Mandal"
                  name="schoolCity"
                  value={formData.schoolCity}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="State"
                  name="schoolState"
                  value={formData.schoolState}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Country"
                  name="schoolCountry"
                  value={formData.schoolCountry}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Registration Number"
                  name="schoolRegNumber"
                  value={formData.schoolRegNumber}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="School Passcode"
                  name="schoolPasscode"
                  type="password"
                  value={formData.schoolPasscode}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="School Type"
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  fullWidth
                  label="School Landline"
                  name="schoolLandline"
                  value={formData.schoolLandline}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="schoolContactNumber"
                  value={formData.schoolContactNumber}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Pin Code"
                  name="schoolPinCode"
                  value={formData.schoolPinCode}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="School Logo (URL)"
                  name="schoolLogo"
                  value={formData.schoolLogo}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  fullWidth
                  label="Street"
                  name="schoolStreet"
                  value={formData.schoolStreet}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Building Number"
                  name="schoolBuildingNumber"
                  value={formData.schoolBuildingNumber}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>

            {/* Submit Button */}
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Dialog for confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Form Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your form has been submitted successfully. Press OK to confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewAdmissionForm;
