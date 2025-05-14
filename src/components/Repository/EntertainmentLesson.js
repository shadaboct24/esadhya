import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/api_url";
import axios from "axios";
import { useEffect, useState } from "react";

function EntertainmentLesson() {
  const [domains, setDomains] = useState([
    "Gross motor",
    "To Greet and Bid Farewell",
    "To Use language courtesesis",
  ]);
  const [activities, setActivities] = useState([
    "activiti1",
    "activiti2",
    "activiti3",
  ]);
  const [formdata, setFormData] = useState({
    domain: "",
    activity: "",
    picture: null,
    description: "",
    instructorid: "",
  });

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
    if (name === "picture") {
      // Handle file upload separately
      setFormData((prev) => ({ ...prev, picture: event.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlesubmit = () => {
    alert("Form submitted successfully!");
    console.log(formdata);
    setFormData({
      domain: "",
      activity: "",
      description: "",
      picture: null,
      instructorid: formdata.instructorid,
    });
  };
  return (
    <Box
      sx={{
        maxWidth: "100%",
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
        label="Select a Domain"
        name="Domain"
        value={formdata.domain}
        onChange={handleChange}
      >
        {domains.map((domain, index) => (
          <MenuItem key={domain} value={domain}>
            {domain}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Select a Activity"
        name="activity"
        value={formdata.activity}
        onChange={handleChange}
      >
        {activities.map((activity, index) => (
          <MenuItem key={activity} value={activity}>
            {activity}
          </MenuItem>
        ))}
      </TextField>
      <Typography>Upload the Reinforcement</Typography>
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

export default EntertainmentLesson;
