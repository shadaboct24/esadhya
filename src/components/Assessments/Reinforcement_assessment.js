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
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_URL } from "../../Constants/api_url";

const ReinforceAssessment = ({ selectedChild }) => {
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

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/assessments/type/ASSESSTYPE_6`
        );
        setQuestions(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const handlechange = async () => {
      try {
        setSelectedChildId(selectedChild.id);
        setResponses({});
        setIsUpdating(false);
        console.log("id is:", selectedChildId);
        await checkExistingAssessment(selectedChild.id);
      } catch (error) {
        console.log(error);
      }
    };
    handlechange();
  }, []);

  // Fetch existing assessment for a child
  const fetchExistingAssessment = async (selectedChildId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/reinforce-assessments/child/${selectedChildId}`
      );

      // if (response.data && response.data.responses) {
      //   // Convert array of responses to object format for easier handling
      //   const responseObject = response.data.responses.reduce((acc, item) => {
      //     acc[item.subsecid] = item.option;
      //     return acc;
      //   }, {});
      if (response.data.responses) {
        const responseObject = {};
        response.data.responses.response.forEach((response) => {
          responseObject[response.subsecid] = response.option;
        });
        setResponses(responseObject);
        setHasExistingAssessment(true);
      } else {
        setResponses({});
        setHasExistingAssessment(false);
      }
    } catch (error) {
      console.error("Error fetching existing assessment:", error);
      setHasExistingAssessment(false);
    }
  };

  // Check if child has existing assessment
  const checkExistingAssessment = async (selectedChildId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/reinforce-assessments/child/${selectedChildId}`
      );
      const hasExisting = response.data.responses.response.length > 0;
      setHasExistingAssessment(hasExisting);
      console.log(hasExisting, response.data);
    } catch (error) {
      console.error("Error checking existing assessment:", error);
      setHasExistingAssessment(false);
    }
  };

  const handleChange = async (event) => {
    const childId = event.target.value;
    setSelectedChildId(childId);
    setResponses({});
    setIsUpdating(false);
    console.log("id is:", childId);
    await checkExistingAssessment(childId);
  };

  const handleStartUpdate = async () => {
    setIsUpdating(true);
    await fetchExistingAssessment(selectedChildId);
  };

  const handleResponseChange = (subsecId, value, type) => {
    setResponses((prev) => ({
      ...prev,
      [subsecId]: type === "selective" ? (value ? "yes" : "no") : value,
    }));
  };

  const handleViewReport = async () => {
    try {
      // const selectedChild = children.find(
      //   (child) => child.id === selectedChildId
      // );
      const response = await axios.get(
        `${API_URL}/api/reinforce-assessments/generate/${selectedChildId}?childName=${selectedChild.name}`, //chnages it
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

  const handleSubmit = async () => {
    // Convert responses object back to array format
    const formattedResponses = Object.entries(responses).map(
      ([subsecid, option]) => ({
        subsecid,
        option,
      })
    );

    const submitData = {
      childId: selectedChildId,
      response: formattedResponses,
    };

    try {
      if (isUpdating) {
        console.log("this is the data before submission", submitData);
        await axios.post(
          `${API_URL}/api/reinforce-assessments/update/${selectedChildId}`,
          submitData
        );
        alert("Assessment updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/reinforce-assessments/submit`,
          submitData
        );
        alert("Assessment submitted successfully!");
      }
      setResponses({});
      setHasExistingAssessment(true);
      setIsUpdating(false);
      await checkExistingAssessment(selectedChildId);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Error submitting assessment. Please try again.");
    }
  };

  // Render descriptive question with text input
  const renderDescriptiveQuestion = (question) => (
    <Box key={question.subsecid} sx={{ mb: 3 }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {question.subsecname}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={1}
        variant="outlined"
        value={responses[question.subsecid] || ""}
        onChange={(e) =>
          handleResponseChange(question.subsecid, e.target.value, "descriptive")
        }
        placeholder="Enter your response here"
      />
    </Box>
  );

  // Render selective questions as checkboxes
  const renderSelectiveQuestions = (questions) => (
    <FormGroup>
      <Typography variant="h6">
        Info: Use a Check mark to indicate the items preferred
      </Typography>
      {questions.map((question) => (
        <FormControlLabel
          key={question.subsecid}
          control={
            <Checkbox
              checked={responses[question.subsecid] === "yes"}
              onChange={(e) =>
                handleResponseChange(
                  question.subsecid,
                  e.target.checked,
                  "selective"
                )
              }
            />
          }
          label={question.subsecname}
        />
      ))}
    </FormGroup>
  );

  // Group questions by type within each section
  const renderSectionQuestions = (sectionQuestions) => {
    const descriptiveQuestions = sectionQuestions.filter(
      (q) => q.typeofsubsection === "descriptive"
    );
    const selectiveQuestions = sectionQuestions.filter(
      (q) => q.typeofsubsection === "selective"
    );

    return (
      <>
        {descriptiveQuestions.map(renderDescriptiveQuestion)}
        {selectiveQuestions.length > 0 && (
          <Box sx={{ mt: 3, minWidth: "800px" }}>
            {renderSelectiveQuestions(selectiveQuestions)}
          </Box>
        )}
      </>
    );
  };

  //const selectedChild = children.find((child) => child.id === selectedChildId);

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        minWidth: "800px",
        maxWidth: "1200px",
        margin: "20px auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {/* {isUpdating ? "Update Assessment" : "Choose One"} */}
        This is Reinforce Assessment
      </Typography>

      {/* <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Child</InputLabel>
        <Select
          label="child select"
          value={selectedChildId}
          onChange={handleChange}
          disabled={isUpdating}
        >
          {children.map((child) => (
            <MenuItem key={child.id} value={child.id}>
              {child.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {selectedChild && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
              {/* <Typography variant="h6">Child Details</Typography>
              <Typography>Name: {selectedChild.name}</Typography>
              <Typography>Age: {selectedChild.age}</Typography>
              <Typography>Grade: {selectedChild.grade}</Typography> */}

              {hasExistingAssessment && !isUpdating && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleViewReport}
                    sx={{ mb: 2 }}
                  >
                    View Report
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleStartUpdate}
                  >
                    Update Assessment
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
          ) : !hasExistingAssessment || isUpdating ? (
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
                {Object.entries(questions).map(
                  ([section, sectionQuestions]) => (
                    <Accordion
                      key={section}
                      defaultExpanded={isUpdating}
                      sx={{ mb: 2 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{section}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {renderSectionQuestions(sectionQuestions)}
                      </AccordionDetails>
                    </Accordion>
                  )
                )}

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  {isUpdating && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsUpdating(false);
                        setResponses({});
                      }}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={Object.keys(responses).length === 0}
                  >
                    {isUpdating ? "Update Assessment" : "Submit Assessment"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          ) : null}
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

export default ReinforceAssessment;
