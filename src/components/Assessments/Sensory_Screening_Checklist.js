import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ChildDropdown = () => {
  // Hardcoded child details
  const children = [
    { id: 1, name: "Alice", age: 7, grade: "2nd Grade" },
    { id: 2, name: "Bob", age: 9, grade: "4th Grade" },
    { id: 3, name: "Charlie", age: 6, grade: "1st Grade" },
  ];

  const [selectedChildId, setSelectedChildId] = useState("");

  // Handle selection change
  const handleChange = (event) => {
    setSelectedChildId(event.target.value);
  };

  // Get the selected child's details
  const selectedChild = children.find((child) => child.id === selectedChildId);

  // Hardcoded questionnaire sections
  const questions = {
    AuditoryProcessing: [
      "Doesn't respond when name is called but hearing is OK",
      "Enjoys strange noises/seeks to make noise for noise's sake",
      "Becomes upset with loud or unexpected noises",
      "Become easily distracted by noises",
      "Covers ears with hands to screen louder sounds",
    ],
    VisualProcessing: [
      "Becomes frustrated when trying to find objects in competing backgrounds",
      "Has difficulty putting puzzles together",
      "Looks carefully or intensely at objects/people",
      "Appear uncomfortable in strong sunlight",
      "Appear sensitive to changes in lighting",
    ],
    VideoColorSpaceestibularProcessing: [
      "Dislikes activities where head is upside down",
      "Dislikes riding a car",
      "Seeks all kinds of movements and this interferes with daily routines",
      "Rocks unconsciously",
      "Appear fearful of heights or stair climbing",
    ],
    TouchProcessing: [
      "Avoids getting 'messy'",
      "Expresses distress during grooming",
      "Avoids certain textures of clothing",
      "Distressed by dental work or toothbrushing",
      "Seeks excessive touching of objects or people",
    ],
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "20px auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Select a Child
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="child-select-label">Child</InputLabel>
        <Select
          labelId="child-select-label"
          label="Child"
          value={selectedChildId}
          onChange={handleChange}
          //   displayEmpty
        >
          <MenuItem value="" disabled>
            Choose a child
          </MenuItem>
          {children.map((child) => (
            <MenuItem key={child.id} value={child.id}>
              {child.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedChild && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6">Details:</Typography>
              <Typography>Name: {selectedChild.name}</Typography>
              <Typography>Age: {selectedChild.age}</Typography>
              <Typography>Grade: {selectedChild.grade}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              {Object.entries(questions).map(([section, sectionQuestions]) => (
                <Accordion key={section} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                      {section.replace(/([A-Z])/g, " $1").trim()}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {sectionQuestions.map((question, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography>{question}</Typography>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                          <InputLabel id={`dropdown-${section}-${index}`}>
                            Select
                          </InputLabel>
                          <Select
                            labelId={`dropdown-${section}-${index}`}
                            label="select"
                          >
                            <MenuItem value="">Choose an option</MenuItem>
                            <MenuItem value="Never">Never</MenuItem>
                            <MenuItem value="Sometimes">Sometimes</MenuItem>
                            <MenuItem value="Often">Often</MenuItem>
                            <MenuItem value="Always">Always</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ChildDropdown;
