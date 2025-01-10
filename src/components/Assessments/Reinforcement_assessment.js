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

const ReinforceAssessment = () => {
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
        `${API_URL}/api/reinforce-assessments/child/${childId}`
      );
      const hasExisting = response.data && response.data.length > 0;
      setHasExistingAssessment(hasExisting);

      if (hasExisting) {
        // If there's existing data, enable the update/view options
        const pdfResponse = await axios.get(
          `${API_URL}/api/pdf/generatereinforce/${childId}?childName=${children.find((c) => c.id === childId)?.name}`,
          { responseType: "blob" }
        );
        const pdfUrl = URL.createObjectURL(pdfResponse.data);
        setPdfUrl(pdfUrl);
      }
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
    await checkExistingAssessment(childId);
  };

  const handleResponseChange = (subsecId, value, type) => {
    setResponses((prev) => ({
      ...prev,
      [subsecId]: type === "selective" ? (value ? "yes" : "no") : value,
    }));
  };

  const handleViewReport = () => {
    if (pdfUrl) {
      setShowPdfDialog(true);
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
          <Box sx={{ mt: 3 }}>
            {renderSelectiveQuestions(selectiveQuestions)}
          </Box>
        )}
      </>
    );
  };

  const handleSubmit = async () => {
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
      console.log("data is :", submitData);
      const endpoint = isUpdating
        ? `${API_URL}/api/assessments/updatereinforceassessment/${selectedChildId}`
        : `${API_URL}/api/reinforce-assessments/submit`;

      await axios.post(endpoint, submitData);

      alert(
        isUpdating
          ? "Assessment updated successfully!"
          : "Assessment submitted successfully!"
      );
      setResponses({});
      setHasExistingAssessment(true);
      setIsUpdating(false);
      await checkExistingAssessment(selectedChildId); // Refresh PDF URL after submission
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Error submitting assessment. Please try again.");
    }
  };

  const selectedChild = children.find((child) => child.id === selectedChildId);

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

      <FormControl fullWidth sx={{ mb: 3 }}>
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
      </FormControl>

      {selectedChild && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6">Child Details</Typography>
              <Typography>Name: {selectedChild.name}</Typography>
              <Typography>Age: {selectedChild.age}</Typography>
              <Typography>Grade: {selectedChild.grade}</Typography>

              {hasExistingAssessment && !isUpdating && (
                <Box>
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
                    sx={{ mt: 2 }}
                    onClick={() => setIsUpdating(true)}
                  >
                    Update Assessment
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          {/* <Grid item xs={12} md={8}> */}
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
                      onClick={() => setIsUpdating(false)}
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
          {/* </Grid> */}
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
