import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_URL } from "../../Constants/api_url";
// import { TextField } from "@headlessui/react";

const ISAA = () => {
  const children = [
    { id: 1, name: "Abhishek", age: 7, grade: "2nd Grade" },
    { id: 2, name: "Babita", age: 9, grade: "4th Grade" },
    { id: 3, name: "Savita", age: 6, grade: "1st Grade" },
  ];

  const [selectedChildId, setSelectedChildId] = useState("");
  const [questions, setQuestions] = useState({});
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasExistingAssessment, setHasExistingAssessment] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [recommendation, setRecommendation] = useState("");

  // Fetch initial questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/assessments/type/ASSESSTYPE_1`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Check if child has existing assessment
  const checkExistingAssessment = async (childId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/isaa-assessment/child/${childId}`
      );
      setHasExistingAssessment(response.data && response.data.length > 0);
    } catch (error) {
      console.error("Error checking existing assessment:", error);
    }
  };

  // Handle child selection change
  const handleChange = async (event) => {
    const childId = event.target.value;
    setSelectedChildId(childId);
    setResponses({});
    setRecommendation("");
    setIsUpdating(false);
    await checkExistingAssessment(childId);
  };

  // Handle update button click
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/isaa-assessment/existing-isaaAssessment/${selectedChildId}`
      );

      if (response.data) {
        // Update questions if needed
        if (response.data.questions) {
          setQuestions(response.data.questions);
        }

        // Set existing responses
        if (response.data.responses) {
          const responseObject = {};
          response.data.responses.responses.forEach((response) => {
            responseObject[response.subsecid] = response.option;
          });
          setResponses(responseObject);
        }

        if (response.data.recommendation)
          setRecommendation(response.data.recommendation);

        setIsUpdating(true);
      }
    } catch (error) {
      console.error("Error fetching existing assessment:", error);
      alert("Error loading existing assessment. Please try again.");
    }
    setLoading(false);
  };

  // Handle response selection
  const handleResponseChange = (subsecId, value) => {
    setResponses((prev) => ({
      ...prev,
      [subsecId]: value,
    }));
  };

  // Generate and show PDF report
  const handleViewReport = async () => {
    try {
      const selectedChild = children.find(
        (child) => child.id === selectedChildId
      );
      const response = await axios.get(
        `${API_URL}/api/isaa-assessment/generate/${selectedChildId}?childName=${selectedChild.name}`, //chnages it
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setShowPdfDialog(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating report. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formattedResponses = Object.entries(responses).map(
      ([subsecid, option]) => ({
        subsecid,
        option,
      })
    );

    const submitData = {
      childId: selectedChildId,
      responses: formattedResponses,
      recommendation: recommendation,
    };

    try {
      if (isUpdating)
        await axios.post(
          `${API_URL}/api/isaa-assessment/updateIsaaAssessment/${selectedChildId}`,
          submitData
        );
      else
        await axios.post(`${API_URL}/api/isaa-assessment/submit`, submitData);
      alert("Assessment updated successfully!");
      setResponses({});
      setHasExistingAssessment(true);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating assessment:", error);
      alert("Error updating assessment. Please try again.");
    }
  };

  const selectedChild = children.find((child) => child.id === selectedChildId);

  const responseOptions = [
    "Rarely Upto 0-20%",
    "Sometimes 21-40%",
    "Frequently 41-60%",
    "Mostly 61-80%",
    "Always 81-100%",
  ];

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
        {isUpdating ? "Update Assessment" : "Select a Child"}
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="child-select-label">Child</InputLabel>
        <Select
          labelId="child-select-label"
          label="Child"
          value={selectedChildId}
          onChange={handleChange}
          disabled={isUpdating}
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
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6">Details:</Typography>
              <Typography>Name: {selectedChild.name}</Typography>
              <Typography>Age: {selectedChild.age}</Typography>
              <Typography>Grade: {selectedChild.grade}</Typography>

              {hasExistingAssessment && !isUpdating && (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleViewReport}
                  >
                    View Report
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          {loading ? (
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            (isUpdating || !hasExistingAssessment) && (
              <Grid item xs={12} md={8}>
                <Box
                  sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}
                >
                  {Object.entries(questions).map(
                    ([section, sectionQuestions]) => (
                      <Accordion
                        key={section}
                        defaultExpanded={isUpdating}
                        sx={{ mb: 2 }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle1">{section}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {sectionQuestions.map((question) => (
                            <Box key={question.subsecid} sx={{ mb: 2 }}>
                              <Typography>{question.subsecname}</Typography>
                              <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Select Response</InputLabel>
                                <Select
                                  value={responses[question.subsecid] || ""}
                                  onChange={(e) =>
                                    handleResponseChange(
                                      question.subsecid,
                                      e.target.value
                                    )
                                  }
                                  label="Select Response"
                                >
                                  <MenuItem value="">Choose an option</MenuItem>
                                  {responseOptions.map((option) => (
                                    <MenuItem
                                      key={option}
                                      value={option.toLowerCase()}
                                    >
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )
                  )}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Recommendation:
                    </Typography>
                    <TextField
                      value={recommendation}
                      onChange={(e) => setRecommendation(e.target.value)} // Directly setting value inside the onChange prop
                      label="Type your sentence here"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    {isUpdating && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setIsUpdating(false);
                          setResponses({});
                        }}
                        sx={{ mr: 2 }}
                      >
                        Cancel Update
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={
                        !selectedChildId || Object.keys(responses).length === 0
                      }
                    >
                      {isUpdating ? "Save Updates" : "Submit Assessment"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      )}

      <Dialog
        open={showPdfDialog}
        onClose={() => {
          setShowPdfDialog(false);
          URL.revokeObjectURL(pdfUrl);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="Assessment Report"
            style={{ border: "none" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ISAA;
