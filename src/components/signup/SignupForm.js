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
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    } else if (formData.username.length < 5) {
      errors.username = "Username must be at least 5 characters.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required.";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required.";
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.dob);
      if (selectedDate >= today) {
        errors.dob = "Date of Birth must be in the past.";
      }
    }

    if (!formData.role.trim()) {
      errors.role = "Role is required.";
    }

    if (!formData.occupation.trim()) {
      errors.occupation = "Occupation is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is not valid.";
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact Number must be 10 digits.";
    }

    if (!formData.schoolSelected.trim()) {
      errors.schoolSelected = "School selection is required.";
    }

    if (!formData.schoolRegNumber.trim()) {
      errors.schoolRegNumber = "School Registration Number is required.";
    }

    if (!formData.schoolPasscode.trim()) {
      errors.schoolPasscode = "School Passcode is required.";
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required.";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required.";
    }

    if (!formData.district.trim()) {
      errors.district = "District is required.";
    }

    if (!formData.belonging.trim()) {
      errors.belonging = "Belongs to city or mandal is required.";
    }

    if (!formData.cityOrMandal.trim()) {
      errors.cityOrMandal = "City or Mandal is required.";
    }

    if (!formData.street.trim()) {
      errors.street = "Street is required.";
    }

    if (!formData.houseNo.trim()) {
      errors.houseNo = "House Number is required.";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }

    return errors;
  };

  const [openDialog, setOpenDialog] = useState(false); // confirm submission dialogue
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formerrors, setFormerrors] = useState({});

  // these are for enabling and diabling otp
  const [sentOtp, setSentOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailotp, setEmailOtp] = useState("");

  //states for mobile otp
  const [sentOtpSMS, setSentOtpSMS] = useState(false);
  const [verifiedSMS, setVerifiedSMS] = useState(false);
  const [loadingSMS, setLoadingSMS] = React.useState(false);
  const [smsotp, setSmsOtp] = useState("");

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
          const errormessage = error?.response?.data || "An Error";
          toast.error("Error! " + errormessage, {
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
    // console.log("otp is", emailotp);
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
        const errormessage = error?.response?.data || "An Error";
        toast.error("Error! " + errormessage, {
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

  const handleSmsOtp = () => {
    const phoneregx = /^[0-9]{10}$/;

    if (!formData.contactNumber) {
      alert("Please enter mobile number first");
      return;
    }

    if (!phoneregx.test(formData.contactNumber)) {
      alert("Enter a valid phone number");
      return;
    }

    setLoadingSMS(true);

    let data = {
      phoneNumber: formData.contactNumber,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/sendmobileotp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    if (!loadingSMS) {
      axios
        .request(config)
        .then((response) => {
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
            setSentOtpSMS(true);
            setLoadingSMS(false);
          }
        })
        .catch((error) => {
          const errormessage = error?.response?.data || "An Error";
          toast.error("Error! " + errormessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoadingSMS(false);
        });
    }
  };

  const verifySmsOtp = () => {
    let data = {
      phoneNumber: formData.contactNumber,
      otp: smsotp,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/mobileotpvalidate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data === true) {
          toast.success("Success! Your Number Verified ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerifiedSMS(true);
        }
      })
      .catch((error) => {
        const errormessage = error?.response?.data || "An Error";
        toast.error("Error! " + errormessage, {
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
      //setPasswordError(formData.password !== value); // Set error if passwords don’t match
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    setFormerrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormerrors(errors);
      alert("Please complete the required fields");
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Password should match");
      return; // Prevent submission if passwords don't match
    }

    if (!verified) {
      alert("email is not verfied");
      return;
    }
    setOpenDialog(true); // Show the dialog
  };

  // Function to handle actual submission after dialog confirmation
  const confirmSubmit = async () => {
    console.log("before submission", formData);
    try {
      const response = await axios.post(`${API_URL}/registeruser`, {
        ...formData,
        password: formData.password, // Only send the password
      });

      console.log("Response:", response.data);

      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Reset the form
      resetForm();

      setOpenDialog(false);
      // setConfirmPassword("");
    } catch (error) {
      console.error("Error:", error);

      toast.error("Registration Failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    // Close the dialog after submission
    // setOpenDialog(false);
  };

  const resetForm = () => {
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
    setConfirmPassword("");
    setSentOtp(false);
    setEmailOtp("");
    setLoading(false);
    setVerified(false);
    setFormerrors({});
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
                value={formData.fullName}
                onChange={handleInputChange}
                helperText={formerrors.fullName}
                error={!!formerrors.fullName}
              />
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                required
                value={formData.username}
                onChange={handleInputChange}
                helperText={formerrors.username}
                error={!!formerrors.username}
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
                value={formData.password}
                onChange={handleInputChange}
                helperText={formerrors.password}
                error={!!formerrors.password}
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
                error={formData.password !== confirmPassword}
                helperText={
                  formData.password !== confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <FormControl
                sx={{ flex: 1 }}
                required
                error={!!formerrors.gender}
              >
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
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
                <FormHelperText>{formerrors.gender}</FormHelperText>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(newValue) =>
                    setFormData((prevData) => ({ ...prevData, dob: newValue }))
                  }
                  slotProps={{
                    textField: {
                      value: formData.dob,
                      error: !!formerrors.dob,
                      helperText: formerrors.dob,
                      fullWidth: true,
                      required: true,
                    },
                  }}
                  sx={{ flex: 1 }} // This ensures the date picker scales properly with other fields
                />
              </LocalizationProvider>
            </Stack>

            <FormControl fullWidth required error={!!formerrors.role}>
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
              <FormHelperText>{formerrors.role}</FormHelperText>
            </FormControl>
            <TextField
              label="Occupation"
              name="occupation"
              variant="outlined"
              fullWidth
              required
              value={formData.occupation}
              onChange={handleInputChange}
              helperText={formerrors.occupation}
              error={!!formerrors.occupation}
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
                value={formData.email}
                disabled={verified}
                onChange={handleInputChange}
                sx={{ maxWidth: 400 }}
                helperText={formerrors.email}
                error={!!formerrors.email}
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
                value={formData.contactNumber}
                onChange={handleInputChange}
                sx={{ maxWidth: 400 }}
                helperText={formerrors.contactNumber}
                error={!!formerrors.contactNumber}
              />
              <LoadingButton
                onClick={handleSmsOtp}
                loading={loadingSMS}
                variant="contained"
                disabled={verifiedSMS || sentOtpSMS}
              >
                send OTP
              </LoadingButton>
            </Stack>
            {sentOtpSMS && !verifiedSMS && (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Enter OTP"
                  name="otpnumber"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, "");
                    setSmsOtp(input);
                  }}
                  value={smsotp}
                  sx={{ maxWidth: 400 }}
                />
                <Button
                  variant="contained"
                  disabled={verifiedSMS}
                  onClick={verifySmsOtp}
                >
                  Verify OTP
                </Button>
              </Stack>
            )}
          </Stack>

          {/* School Details Section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            School Details
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                error={!!formerrors.schoolSelected}
              >
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
                <FormHelperText>{formerrors.schoolSelected}</FormHelperText>
              </FormControl>
              <TextField
                label="School Registration Number"
                name="schoolRegNumber"
                variant="outlined"
                fullWidth
                required
                value={formData.schoolRegNumber}
                onChange={handleInputChange}
                helperText={formerrors.schoolRegNumber}
                error={!!formerrors.schoolRegNumber}
              />
            </Stack>
            <TextField
              label="School Passcode"
              name="schoolPasscode"
              variant="outlined"
              fullWidth
              required
              value={formData.schoolPasscode}
              disabled={!formData.schoolSelected}
              onChange={handleInputChange}
              helperText={formerrors.schoolPasscode}
              error={!!formerrors.schoolPasscode}
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
                value={formData.country}
                onChange={handleInputChange}
                helperText={formerrors.country}
                error={!!formerrors.country}
              />
              <TextField
                label="State"
                name="state"
                variant="outlined"
                fullWidth
                required
                value={formData.state}
                onChange={handleInputChange}
                helperText={formerrors.state}
                error={!!formerrors.state}
              />
              <TextField
                label="District"
                name="district"
                variant="outlined"
                fullWidth
                required
                value={formData.district}
                onChange={handleInputChange}
                helperText={formerrors.district}
                error={!!formerrors.district}
              />
            </Stack>
            <FormControl required error={formerrors.belonging}>
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
              <FormHelperText>{formerrors.belonging}</FormHelperText>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <TextField
                label={`Enter ${formData.belonging === "city" ? "City" : "Mandal"}`}
                name="cityOrMandal"
                variant="outlined"
                fullWidth
                required
                value={formData.cityOrMandal}
                onChange={handleInputChange}
                helperText={formerrors.cityOrMandal}
                error={!!formerrors.cityOrMandal}
              />
              <TextField
                label="Street"
                name="street"
                variant="outlined"
                fullWidth
                required
                value={formData.street}
                onChange={handleInputChange}
                helperText={formerrors.street}
                error={!!formerrors.street}
              />
              <TextField
                label="House No"
                name="houseNo"
                variant="outlined"
                fullWidth
                required
                value={formData.houseNo}
                onChange={handleInputChange}
                helperText={formerrors.houseNo}
                error={!!formerrors.houseNo}
              />
            </Stack>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              required
              value={formData.address}
              onChange={handleInputChange}
              helperText={formerrors.address}
              error={!!formerrors.address}
            />
          </Stack>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
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
