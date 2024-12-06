import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";
import { toast } from "react-toastify";
import { FormatBoldTwoTone } from "@mui/icons-material";

const NewAdmissionForm = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/countries`)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => console.error("error fetching data:", error));
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    setFormData((prevData) => ({
      ...prevData,
      schoolCountry: country,
    }));
    formErrors.schoolCountry = "";

    const countrydata = locations.find((loc) => loc.country === country);
    setStates(countrydata?.states || []);
    setSelectedState("");
    setDistricts([]);
    setSelectedDistrict("");
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    formData.schoolState = state;
    formErrors.schoolState = "";

    const statedata = states.find((st) => st.state === state);
    setDistricts(statedata?.districts || []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    formData.schooldistrict = event.target.value;
    formErrors.schooldistrict = "";
  };

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
    schooldistrict: "",
    schoolState: "",
    schoolCountry: "",
    schoolCityOrMandal: "",
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

  const validateForm = () => {
    const errors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    const pinCodeRegex = /^\d{6}$/; // 6-digit pin code
    const passcodeRegex = /^[0-9]{4,6}$/; // 4 to 6 digit numeric passcode

    if (!formData.adminName.trim()) {
      errors.adminName = "Admin name is required";
    } else if (!nameRegex.test(formData.adminName)) {
      errors.adminName = "Admin name should only contain letters and spaces";
    }

    if (!formData.adminEmail.trim()) {
      errors.adminEmail = "Admin email is required";
    } else if (!emailRegex.test(formData.adminEmail)) {
      errors.adminEmail = "Email is not valid";
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!formData.adminPasscode.trim()) {
      errors.adminPasscode = "Admin passcode is required";
    } else if (!passcodeRegex.test(formData.adminPasscode)) {
      errors.adminPasscode = "Admin passcode should be 4 to 6 digits";
    }

    if (!formData.adminContactNumber.trim()) {
      errors.adminContactNumber = "Admin contact number is required";
    } else if (!phoneRegex.test(formData.adminContactNumber)) {
      errors.adminContactNumber =
        "Admin contact number must be a valid 10-digit number";
    }

    if (!formData.schoolId.trim()) {
      errors.schoolId = "School ID is required";
    }

    if (!formData.schoolName.trim()) {
      errors.schoolName = "School name is required";
    }

    if (!formData.schoolAdminId.trim()) {
      errors.schoolAdminId = "School admin ID is required";
    }

    if (!formData.schoolAddress.trim()) {
      errors.schoolAddress = "School address is required";
    }

    if (!formData.schooldistrict.trim()) {
      errors.schooldistrict = "School district is required";
    }

    if (!formData.schoolState.trim()) {
      errors.schoolState = "School state is required";
    }

    if (!formData.schoolCountry.trim()) {
      errors.schoolCountry = "School country is required";
    }

    if (!formData.schoolCityOrMandal.trim()) {
      errors.schoolCityOrMandal = "School city or mandal is required";
    }

    if (!formData.schoolRegNumber.trim()) {
      errors.schoolRegNumber = "School registration number is required";
    }

    if (!formData.schoolPasscode.trim()) {
      errors.schoolPasscode = "School passcode is required";
    } else if (!passcodeRegex.test(formData.schoolPasscode)) {
      errors.schoolPasscode = "School passcode should be 4 to 6 digits";
    }

    if (!formData.schoolType.trim()) {
      errors.schoolType = "School type is required";
    }

    if (!formData.schoolLandline.trim()) {
      errors.schoolLandline = "School landline is required";
    } else if (!phoneRegex.test(formData.schoolLandline)) {
      errors.schoolLandline = "School landline must be a valid 10-digit number";
    }

    if (!formData.schoolContactNumber.trim()) {
      errors.schoolContactNumber = "School contact number is required";
    } else if (!phoneRegex.test(formData.schoolContactNumber)) {
      errors.schoolContactNumber =
        "School contact number must be a valid 10-digit number";
    }

    if (!formData.schoolPinCode.trim()) {
      errors.schoolPinCode = "School pin code is required";
    } else if (!pinCodeRegex.test(formData.schoolPinCode)) {
      errors.schoolPinCode = "School pin code must be a valid 6-digit number";
    }

    if (!formData.schoolLogo.trim()) {
      errors.schoolLogo = "School logo is required";
    }

    if (!formData.schoolStreet.trim()) {
      errors.schoolStreet = "School street is required";
    }

    if (!formData.schoolBuildingNumber.trim()) {
      errors.schoolBuildingNumber = "School building number is required";
    }

    return errors;
  };

  // State for the dialog visibility
  const [openDialog, setOpenDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [emailError, setEmailError] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Define regex patterns for validation
    const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
    const numberRegex = /^\d*$/; // Only digits
    const phoneRegex = /^\d{0,10}$/; // Up to 10 digits

    if (
      ["adminName", "schoolName", "schoolType", "schoolCityOrMandal"].includes(
        name
      )
    ) {
      // Validate names: allow only letters and spaces
      if (nameRegex.test(value)) {
        setFormData((prevdata) => ({ ...prevdata, [name]: value }));
        setFormErrors((preverrors) => ({ ...preverrors, [name]: "" }));
      }
    } else if (
      ["adminContactNumber", "schoolContactNumber", "schoolLandline"].includes(
        name
      )
    ) {
      // Validate phone numbers: allow only up to 10 digits
      if (phoneRegex.test(value)) {
        setFormData((prevdata) => ({ ...prevdata, [name]: value }));
        setFormErrors((preverrors) => ({ ...preverrors, [name]: "" }));
      }
    } else if (["schoolPinCode"].includes(name)) {
      // Validate pin codes: allow only digits
      if (numberRegex.test(value)) {
        setFormData((prevdata) => ({ ...prevdata, [name]: value }));
        setFormErrors((preverrors) => ({ ...preverrors, [name]: "" }));
      }
    } else {
      // Default case: directly update other fields
      setFormData((prevdata) => ({ ...prevdata, [name]: value }));
      setFormErrors((preverrors) => ({ ...preverrors, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setOpenDialog(true);
  };

  // Handle dialog confirmation
  const handleDialogConfirm = async () => {
    console.log("befre Submission", formData);
    try {
      const response = await axios.post(`${API_URL}/registerschool`, formData);

      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      resetForm();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Registration Failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
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
      schooldistrict: "",
      schoolState: "",
      schoolCountry: "",
      schoolCityOrMandal: "",
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
    setSelectedCountry("");
    setSelectedState("");
    setSelectedDistrict("");
    setFormErrors({});
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
            required
            autoComplete="off"
            sx={{ m: 2 }}
            onSubmit={handleSubmit}
          >
            {/* Admin Details Section */}
            <Typography variant="h5" gutterBottom>
              Admin Details
            </Typography>
            <Stack spacing={2} required>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Admin Name"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  error={!!formErrors.adminName}
                  helperText={formErrors.adminName}
                />
                <TextField
                  required
                  fullWidth
                  label="Admin Email"
                  name="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  error={!!formErrors.adminEmail}
                  helperText={formErrors.adminEmail}
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
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
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
                  error={!!formErrors.adminPasscode}
                  helperText={formErrors.adminPasscode}
                />
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="adminContactNumber"
                  value={formData.adminContactNumber}
                  onChange={handleChange}
                  error={!!formErrors.adminContactNumber}
                  helperText={formErrors.adminContactNumber}
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
                  error={!!formErrors.schoolId}
                  helperText={formErrors.schoolId}
                />
                <TextField
                  required
                  fullWidth
                  label="School Name"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  error={!!formErrors.schoolName}
                  helperText={formErrors.schoolName}
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
                  error={!!formErrors.schoolAdminId}
                  helperText={formErrors.schoolAdminId}
                />
                <TextField
                  required
                  fullWidth
                  label="School Address"
                  name="schoolAddress"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                  error={!!formErrors.schoolAddress}
                  helperText={formErrors.schoolAddress}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <FormControl fullWidth error={!!formErrors.schoolCountry}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    label="country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc.country} value={loc.country}>
                        {loc.country}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.schoolCountry}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  disabled={!states.length}
                  error={!!formErrors.schoolState}
                >
                  <InputLabel>State</InputLabel>
                  <Select
                    label="country"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    {states.map((st) => (
                      <MenuItem key={st.state} value={st.state}>
                        {st.state}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.schoolState}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  disabled={!districts.length}
                  error={formErrors.schooldistrict}
                >
                  <InputLabel>District</InputLabel>
                  <Select
                    label="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    {districts.map((dt) => (
                      <MenuItem key={dt} value={dt}>
                        {dt}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.schooldistrict}</FormHelperText>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Enter city/ Mandal"
                  name="schoolCityOrMandal"
                  value={formData.schoolCityOrMandal}
                  onChange={handleChange}
                  error={!!formErrors.schoolCityOrMandal}
                  helperText={formErrors.schoolCityOrMandal}
                />
                <TextField
                  required
                  fullWidth
                  label="Registration Number"
                  name="schoolRegNumber"
                  value={formData.schoolRegNumber}
                  onChange={handleChange}
                  error={!!formErrors.schoolRegNumber}
                  helperText={formErrors.schoolRegNumber}
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
                  error={!!formErrors.schoolPasscode}
                  helperText={formErrors.schoolPasscode}
                />
                <TextField
                  required
                  fullWidth
                  label="School Type"
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                  error={!!formErrors.schoolType}
                  helperText={formErrors.schoolType}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  fullWidth
                  label="School Landline"
                  name="schoolLandline"
                  value={formData.schoolLandline}
                  onChange={handleChange}
                  error={!!formErrors.schoolLandline}
                  helperText={formErrors.schoolLandline}
                />
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="schoolContactNumber"
                  value={formData.schoolContactNumber}
                  onChange={handleChange}
                  error={!!formErrors.schoolContactNumber}
                  helperText={formErrors.schoolContactNumber}
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
                  error={!!formErrors.schoolPinCode}
                  helperText={formErrors.schoolPinCode}
                />
                <TextField
                  fullWidth
                  label="School Logo (URL)"
                  name="schoolLogo"
                  value={formData.schoolLogo}
                  onChange={handleChange}
                  error={!!formErrors.schoolLogo}
                  helperText={formErrors.schoolLogo}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Street"
                  name="schoolStreet"
                  value={formData.schoolStreet}
                  onChange={handleChange}
                  error={!!formErrors.schoolStreet}
                  helperText={formErrors.schoolStreet}
                />
                <TextField
                  required
                  fullWidth
                  label="Building Number"
                  name="schoolBuildingNumber"
                  value={formData.schoolBuildingNumber}
                  onChange={handleChange}
                  error={!!formErrors.schoolBuildingNumber}
                  helperText={formErrors.schoolBuildingNumber}
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
