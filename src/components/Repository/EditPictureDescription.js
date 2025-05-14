import {
  Button,
  Box,
  TextField,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../Constants/api_url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function EditPictureDescription() {
  const [allsubject, setAllSubject] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [formdata, setFormData] = useState({
    subject: "",
    category: "",
    items: null,
    description: "",
    instructorid: "",
  });
  useEffect(() => {
    axios
      .get(`${API_URL}/api/caisubjects/getall`)
      .then((response) => setAllSubject(response.data))
      .catch((error) => console.error(error));

    const token = localStorage.getItem("token");
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
  }, []);

  // Fetch categories when subject changes
  useEffect(() => {
    if (formdata.subject) {
      axios
        .get(
          `${API_URL}/api/caisubjectscategory/getbysubject/${formdata.subject}`
        )
        .then((response) => setSubjectCategory(response.data))
        .catch((error) => console.error(error));
      setSelectedImage("");
    } else {
      setSubjectCategory([]);
      setFormData((prev) => ({ ...prev, category: "", items: [] }));
    }
  }, [formdata.subject]);
  useEffect(() => {
    if (formdata.category) {
      // Reset selected items before new data comes
      setFormData((prev) => ({ ...prev, items: [] }));
      setCategoryItems([]); // Optional: clear previous items before new load

      axios
        .get(
          `${API_URL}/api/caisubjectcategoryitems/getall/${formdata.category}`
        )
        .then((response) => {
          setCategoryItems(response.data || []);
        })
        .catch((error) => console.error(error));
      setSelectedImage("");
    } else {
      setFormData((prev) => ({ ...prev, items: [] }));
      setCategoryItems([]);
    }
  }, [formdata.category]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "items") {
      setSelectedImage(value.filename);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = () => {
    alert("Form submitted successfully!");
    console.log(formdata);
    setFormData({
      subject: "",
      category: "",
      items: null,
      description: "",
      instructorid: formdata.instructorid,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        margin: "16px",
        gap: "16px",
        padding: "16px",
      }}
    >
      {/* Form Box - First Child */}
      <Box
        sx={{
          flex: 1, // This makes the box take equal space
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
        }}
      >
        <TextField
          select
          fullWidth
          name="subject"
          label="Select Subject"
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
          select
          fullWidth
          name="category"
          label="Select Category"
          value={formdata.category}
          onChange={handleChange}
          disabled={!formdata.subject}
        >
          {subjectCategory.map((category, index) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          name="items"
          label="Select Item"
          value={formdata.items}
          onChange={handleChange}
          disabled={!formdata.category}
        >
          {categoryItems.map((item, index) => (
            <MenuItem key={item.description} value={item}>
              {item.description}
            </MenuItem>
          ))}
        </TextField>

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
          Save Chnages
        </Button>
      </Box>

      {/* Image Box - Second Child */}
      <Box
        sx={{
          flex: 1, // This makes the box take equal space
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {selectedImage && (
          <img
            src={`LearningImages/${selectedImage}`}
            alt="Selected"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default EditPictureDescription;
