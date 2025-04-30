import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";
import { jwtDecode } from "jwt-decode";
const getKeywords = (text) => {
  return [...new Set(text.match(/\b\w+\b/g))]; // basic keyword extraction
};

export default function ComprehensionBuilder() {
  const [lessonName, setLessonName] = useState("");
  const [passages, setPassages] = useState([{ passage: "", image: null }]);
  const [keywords, setKeywords] = useState([]);
  const [wordData, setWordData] = useState({});
  const [instructorId, setInstructorId] = useState("");

  const handleChangePassage = (index, field, value) => {
    const updated = [...passages];
    updated[index][field] = value;
    setPassages(updated);
  };

  const addPassage = () => {
    setPassages([...passages, { passage: "", image: null }]);
  };

  const removePassage = () => {
    if (passages.length > 1) {
      setPassages(passages.slice(0, -1));
    } else {
      setPassages([{ passage: "", image: null }]);
    }
  };

  const extractKeywords = () => {
    const fullPassage = passages.map((p) => p.passage).join(" ");
    const allKeywords = getKeywords(fullPassage);
    setKeywords(allKeywords);
  };

  const handleMeaningChange = (word, field, value) => {
    setWordData((prev) => ({
      ...prev,
      [word]: { ...prev[word], [field]: value },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Extract all meanings and sentences from wordData
      const meanings = Object.entries(wordData)
        .map(([k, v]) => `${k}=${v.meaning || ""}`)
        .join("^");

      const sentences = Object.entries(wordData)
        .map(([k, v]) => `${k}=${v.sentence || ""}`)
        .join("^");

      // Prepare passages array for submission
      const passagesArray = passages.map((p) => p.passage);

      // Image handling - store image file names in the same order as passages
      const imageFiles = passages.map((p) => p.image?.name || "");

      // Create the payload with all data
      const payload = {
        lessonname: lessonName,
        passages: passagesArray,
        images: imageFiles,
        boundaryConditionRangeOrKeywords: meanings,
        passageModelSentence: sentences,
        instructorid: instructorId, // The instructor ID is here
      };

      // Single API call to submit everything
      // Get token for authorization if needed
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(JSON.parse(token));
        const instructorId = decoded?.user;
        if (instructorId) {
          payload.instructorid = instructorId;
          setInstructorId(instructorId);
        }
      }
      const { data } = await axios.post(
        `${API_URL}/api/comprehension/create`,
        payload
      );

      alert("Comprehension created successfully!");

      // Optional: Clear form or redirect after successful submission
      setLessonName("");
      setPassages([{ passage: "", image: null }]);
      setKeywords([]);
      setWordData({});
    } catch (error) {
      console.error("Error submitting comprehension:", error);
      alert("Error creating comprehension. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <TextField
        label="Lesson Name"
        fullWidth
        margin="normal"
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
      />

      {passages.map((item, idx) => (
        <Paper key={idx} sx={{ p: 2, my: 2 }}>
          <Typography variant="subtitle1">Passage {idx + 1}</Typography>
          <TextField
            label={`Passage ${idx + 1}`}
            fullWidth
            multiline
            rows={4}
            value={item.passage}
            onChange={(e) =>
              handleChangePassage(idx, "passage", e.target.value)
            }
          />
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) =>
              handleChangePassage(idx, "image", e.target.files[0])
            }
            style={{ marginTop: "10px" }}
          />
        </Paper>
      ))}

      <Box mt={2} display="flex" gap={2}>
        <Button variant="outlined" onClick={addPassage}>
          Add more passage
        </Button>
        <Button variant="outlined" onClick={removePassage}>
          Remove last passage
        </Button>
        <Button variant="contained" onClick={extractKeywords}>
          Extract Keywords
        </Button>
      </Box>

      {keywords.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Add Meaning and Model Sentence</Typography>
          {keywords.map((word, i) => (
            <Paper key={i} sx={{ p: 1, my: 1 }}>
              <Typography>{word}</Typography>
              <TextField
                label="Meaning"
                fullWidth
                onChange={(e) =>
                  handleMeaningChange(word, "meaning", e.target.value)
                }
                sx={{ my: 1 }}
              />
              <TextField
                label="Model Sentence"
                fullWidth
                onChange={(e) =>
                  handleMeaningChange(word, "sentence", e.target.value)
                }
              />
            </Paper>
          ))}
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit Comprehension
          </Button>
        </Box>
      )}
    </Box>
  );
}
