import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const ChildRegistration = ({ selectedChild }) => {
  const [locations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const mapBackendToFormData = (backendData) => {
    // Create a new object based on initialFormState structure
    // and fill it with backend data where available
    return {
      fullname: backendData.fullname || "",
      username: backendData.username || "",
      password: backendData.password || "",
      confirmPassword: backendData.password || "", // Note: you might want to handle this differently
      gender: backendData.gender || "",
      dateOfBirth: backendData.dateOfBirth
        ? dayjs(backendData.dateOfBirth)
        : null,
      registrationNo: backendData.registrationNo || "",
      email: backendData.email || "",
      contactNo: backendData.contactNo || "",
      street: backendData.street || "",
      country: backendData.country || "",
      state: backendData.state || "",
      district: backendData.district || "",
      belonging: backendData.belonging || "",
      cityOrMandal: backendData.cityOrMandal || "",
      houseNo: backendData.houseNo || "",
      address: backendData.address || "",
      class_s: backendData.class_s || "",
      academicYear: backendData.academicYear || "",
      parentId: backendData.parentId || "",
    };
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/countries`)
      .then((response) => {
        setLocations(response.data);
        const locat = response.data;
        axios
          .get(`${API_URL}/api/ischildexist/${selectedChild.id}`)
          .then((response) => {
            if (response.data) {
              const mappedData = mapBackendToFormData(response.data);
              setFormData(mappedData);
              setSelectedCountry(mappedData.country);
              setSelectedState(mappedData.state);
              setSelectedDistrict(mappedData.district);

              const countrydata = locat.find(
                (loc) => loc.country == mappedData.country
              );
              setStates(countrydata?.states || []);
              const statedata = countrydata?.states.find(
                (st) => st.state == mappedData.state
              );
              setDistricts(statedata?.districts || []);
            }
          })
          .catch((error) => {
            console.error("Error fetching child data:", error);
          });
      })
      .catch((error) => console.error("error fetching data:", error));
  }, [selectedChild.id]);

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/countries`)
  //     .then((response) => {
  //       setLocations(response.data);
  //     })
  //     .catch((error) => console.error("error fetching data:", error));
  // }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    setFormData((prevData) => ({
      ...prevData,
      country: country,
    }));
    errors.country = "";

    const countrydata = locations.find((loc) => loc.country === country);
    setStates(countrydata?.states || []);
    setSelectedState("");
    setDistricts([]);
    setSelectedDistrict("");
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    formData.state = state;
    errors.state = "";

    const statedata = states.find((st) => st.state === state);
    setDistricts(statedata?.districts || []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    formData.district = event.target.value;
    errors.district = "";
  };
  const initialFormState = {
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: null,
    registrationNo: "",
    email: "",
    contactNo: "",
    street: "",
    // pincode: "248171",
    country: "",
    state: "",
    district: "",
    belonging: "",
    cityOrMandal: "",
    houseNo: "",
    address: "",
    class_s: "",
    academicYear: "",
    parentId: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [ischildexist, setIsChildExist] = useState(false);
  const [isupdating, setIsUpdating] = useState(false);

  // Validation patterns
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{10}$/,
    // pincode: /^\d{6}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullname":
        error = value.length < 3 ? "Name must be at least 3 characters" : "";
        break;
      case "email":
        error = !patterns.email.test(value) ? "Invalid email address" : "";
        break;
      case "contactNo":
        error = !patterns.phone.test(value)
          ? "Contact number must be 10 digits"
          : "";
        break;
      case "password":
        error = !patterns.password.test(value)
          ? "Password must be at least 8 characters with letters and numbers"
          : "";
        break;
      case "confirmPassword":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      // case "pincode":
      //   error = !patterns.pincode.test(value) ? "Invalid pincode" : "";
      //   break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        // 15MB limit
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 15MB",
        }));
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          file: "Only JPG, PNG, and GIF files are allowed",
        }));
        return;
      }
      setFile(file);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    if (Object.keys(formErrors).length > 0) {
      alert("there are errors");
      console.log(formErrors);
      setErrors(formErrors);
      return;
    }

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      if (file) {
        submitData.append("childImage", file);
      }
      let data = formData;

      console.log("form data", formData);
      console.log("submit data", submitData);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_URL}/api/registerchild`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data) {
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

      // setFormData(initialFormState);
      setFile(null);
      setErrors({});

      // Show success message
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit form. Please try again.",
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto", my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Child Registration Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Student Specific Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Student Specific Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="fullname"
                label="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                error={!!errors.fullname}
                helperText={errors.fullname}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, dateOfBirth: newValue }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ flex: 1, width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="registrationNo"
                label="Registration Number"
                value={formData.registrationNo}
                onChange={handleChange}
                error={!!errors.registrationNo}
                helperText={errors.registrationNo}
              />
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="contactNo"
                label="Contact Number"
                value={formData.contactNo}
                onChange={handleChange}
                error={!!errors.contactNo}
                helperText={errors.contactNo}
              />
            </Grid>

            {/* Address Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address Details
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.country}>
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
                <FormHelperText>{errors.country}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                disabled={!states.length}
                error={!!errors.state}
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
                <FormHelperText>{errors.state}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                disabled={!districts.length}
                error={errors.district}
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
                <FormHelperText>{errors.district}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Belonging radio group */}
            <Grid item xs={12}>
              <FormControl required error={errors.belonging}>
                <FormLabel>You Are Belonging To</FormLabel>
                <RadioGroup
                  row
                  name="belonging"
                  value={formData.belonging}
                  onChange={handleChange}
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
                <FormHelperText>{errors.belonging}</FormHelperText>
              </FormControl>
            </Grid>

            {/* City/Mandal, Street, House No row */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label={`Enter ${formData.belonging === "city" ? "City" : "Mandal"}`}
                    name="cityOrMandal"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.cityOrMandal}
                    onChange={handleChange}
                    helperText={errors.cityOrMandal}
                    error={!!errors.cityOrMandal}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Street"
                    name="street"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.street}
                    onChange={handleChange}
                    helperText={errors.street}
                    error={!!errors.street}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="House No"
                    name="houseNo"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.houseNo}
                    onChange={handleChange}
                    helperText={errors.houseNo}
                    error={!!errors.houseNo}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Address field */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                variant="outlined"
                fullWidth
                required
                value={formData.address}
                onChange={handleChange}
                helperText={errors.address}
                error={!!errors.address}
              />
            </Grid>

            {/* Placement Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Placement Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="class_s"
                label="Select Class"
                value={formData.class_s}
                onChange={handleChange}
              >
                <MenuItem value="">Select Class</MenuItem>
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="II">II</MenuItem>
                {/* Add class options */}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="academicYear"
                label="Academic Year"
                value={formData.academicYear}
                onChange={handleChange}
              >
                <MenuItem value="">Select Academic Year</MenuItem>
                <MenuItem value="2001-2002">2001-2002</MenuItem>
                <MenuItem value="2002-2003">2002-2003</MenuItem>
                {/* Add academic year options */}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Child's Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {errors.file && (
                <Typography color="error" variant="caption" display="block">
                  {errors.file}
                </Typography>
              )}
            </Grid>

            {/* Parent Linking */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Parent Linking (Optional)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="parentId"
                label="Select Parent"
                value={formData.parentId}
                onChange={handleChange}
              >
                <MenuItem value="">Select Parent</MenuItem>
                <MenuItem value="shadab">shadab</MenuItem>
                <MenuItem value="samad">samad</MenuItem>
                {/* Add parent options */}
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit Registration
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ChildRegistration;
