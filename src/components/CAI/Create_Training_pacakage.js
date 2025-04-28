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

function Create_Training_Package() {
  const [allsubject, setAllSubject] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [formdata, setFormData] = useState({
    subject: "",
    category: "",
    items: [],
    description: "",
  });

  // Fetch all subjects on mount
  useEffect(() => {
    axios
      .get(`${API_URL}/api/caisubjects/getall`)
      .then((response) => setAllSubject(response.data))
      .catch((error) => console.error(error));
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

  // Fetch items when category changes
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      items: checked
        ? Array.from(new Set([...prev.items, value]))
        : prev.items.filter((item) => item !== value),
    }));

    if (checked) {
      setSelectedImage(value); // Set image when checked
    } else {
      setSelectedImage(""); // Clear image when unchecked (optional: you can improve this later)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formdata);

    // You can post the formdata like this:
    // axios.post(`${API_URL}/api/trainingpackages/create`, formdata)
    //   .then(res => console.log('Success:', res.data))
    //   .catch(err => console.error('Error:', err));
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "16px",
        margin: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: { xs: "100%", sm: "600px", md: "800px" },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Button variant="outlined">Matching</Button>
        <Button variant="outlined">Comprehension</Button>
      </Box>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          sx={{ marginTop: "16px" }}
          disabled={!formdata.subject}
        >
          {subjectCategory.map((category, index) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <Divider sx={{ margin: "16px 0" }} />
        <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          {/* Left side - Checkboxes */}
          <Box>
            {categoryItems.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <input
                  type="checkbox"
                  id={`item-${index}`}
                  value={item.filename}
                  checked={formdata.items.includes(item.filename)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`item-${index}`} style={{ marginLeft: "8px" }}>
                  {item.description}
                </label>
              </Box>
            ))}
          </Box>

          {/* Right side - Selected Image */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedImage && (
              <img
                src={`LearningImages/${selectedImage}`}
                alt="Selected"
                style={{
                  width: "200px",
                  height: "auto",
                  border: "1px solid gray",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ margin: "16px 0" }} />
        <TextField
          fullWidth
          name="description"
          label="Description"
          value={formdata.description}
          onChange={handleChange}
          multiline
          rows={1}
          sx={{ marginTop: "16px" }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "16px" }}
          disabled={
            !formdata.subject ||
            !formdata.category ||
            formdata.items.length === 0
          }
        >
          Create
        </Button>
      </form>
    </Box>
  );
}

export default Create_Training_Package;
