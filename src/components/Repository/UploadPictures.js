import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/api_url";
import axios from "axios";
import { useEffect, useState } from "react";

function UploadPictures() {
  const [formdata, setFormData] = React.useState({
    subject: "",
    category: "",
    description: "",
    instructorid: "",
    newCategory: "",
    picture: null,
  });
  const [allsubject, setAllSubject] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/caisubjects/getall`)
      .then((response) => setAllSubject(response.data))
      .catch((error) => console.error(error));

    if (token) {
      const decoded = jwtDecode(JSON.parse(token));
      const instructorId = decoded?.user;
      if (instructorId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          instructorid: instructorId,
        }));
      }
    }
  }, [token]);

  // Fetch categories when subject changes
  useEffect(() => {
    if (formdata.subject) {
      axios
        .get(
          `${API_URL}/api/caisubjectscategory/getbysubject/${formdata.subject}`
        )
        .then((response) => setSubjectCategory(response.data))
        .catch((error) => console.error(error));
    } else {
      setSubjectCategory([]);
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  }, [formdata.subject]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "subject") {
      setFormData((prev) => ({ ...prev, [name]: value, category: "" }));
      return;
    }
    if (name === "picture") {
      // Handle file upload separately
      setFormData((prev) => ({ ...prev, picture: event.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlesubmit = () => {
    alert("Form submitted successfully!");
    if (formdata.category === "others") {
      formdata.category = formdata.newCategory;
    }
    delete formdata.newCategory;
    console.log(formdata);
    setFormData({
      subject: "",
      category: "",
      description: "",
      newCategory: "",
      picture: null,
      instructorid: formdata.instructorid,
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "60%",
        margin: "16px",
        gap: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <TextField
        fullWidth
        select
        label="Select a Subject"
        name="subject"
        value={formdata.subject}
        onChange={handleChange}
      >
        {allsubject.map((subject, index) => (
          <MenuItem key={subject} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Select a Category"
        name="category"
        value={formdata.category}
        onChange={handleChange}
      >
        {subjectCategory.map((category, index) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
        <MenuItem value="others">others</MenuItem>
      </TextField>
      {formdata.category === "others" && (
        <TextField
          fullWidth
          label="New Category name"
          name="newCategory"
          value={formdata.newCategory}
          onChange={handleChange}
        />
      )}
      <Typography>Upload the Image</Typography>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        color="neutral"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          name="picture"
          onChange={handleChange}
        />
      </Button>
      {formdata.picture && (
        <Typography variant="body2">
          Selected file: {formdata.picture.name}
        </Typography>
      )}
      <TextField
        fullWidth
        placeholder="Write the file description [Text that is used in child environment for a image]*"
        label="Description"
        name="description"
        value={formdata.description}
        onChange={handleChange}
        multiline
        rows={3}
      />
      <Button variant="contained" onClick={handlesubmit}>
        SUBMIT
      </Button>
    </Box>
  );
}

export default UploadPictures;
