import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";

const getKeywords = (text) => {
  return [...new Set(text.match(/\b\w+\b/g))]; // basic keyword extraction
};

export default function ComprehensionBuilder() {
  const [lessonName, setLessonName] = useState("");
  const [passages, setPassages] = useState([{ passage: "", image: null }]);
  const [keywords, setKeywords] = useState([]);
  const [wordData, setWordData] = useState({});
  const [createdId, setCreatedId] = useState(null);

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

  const handleCreate = async () => {
    const fullPassage = passages.map((p) => p.passage).join(" ");
    const allKeywords = getKeywords(fullPassage);

    // Dummy saving: You can loop for multiple image uploads if required
    const payload = {
      lessonid: lessonName,
      srlNo: 1,
      pictureid: passages[0].image?.name ?? "",
      passage: fullPassage,
    };

    const { data } = await axios.post(
      `${API_URL}/api/comprehension/create`,
      payload
    );
    setKeywords(allKeywords);
    setCreatedId(data.id);
  };

  const handleMeaningChange = (word, field, value) => {
    setWordData((prev) => ({
      ...prev,
      [word]: { ...prev[word], [field]: value },
    }));
  };

  const handleDone = async () => {
    const meanings = Object.entries(wordData)
      .map(([k, v]) => `${k}=${v.meaning}`)
      .join("^");

    const sentences = Object.entries(wordData)
      .map(([k, v]) => `${k}=${v.sentence}`)
      .join("^");

    await axios.put(`${API_URL}/api/comprehension/${createdId}`, {
      boundaryConditionRangeOrKeywords: meanings,
      passageModelSentence: sentences,
    });

    alert("Comprehension Updated with Meanings & Sentences!");
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
          Remove the current passage
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create Comprehension
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
          <Button variant="contained" onClick={handleDone}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
}
