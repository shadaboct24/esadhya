import {
  TextField,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  TableBody,
  Button,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_URL } from "../Constants/api_url";
import axios from "axios";

function TaskAnalysisRecord({ selectedChild }) {
  const registrationNo = selectedChild?.registrationNo;
  const [allgoals, setAllGoals] = useState([]);
  const [subtasks, setSubtasks] = useState([]); // subtasks from backend
  const [sessions, setSessions] = useState([]); // All previous sessions
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});
  const [selectedgoaldata, setSelectedGoalData] = useState({
    domain: "",
    annualgoal: "",
    shorttermgoal: "",
  });
  const [currentResponses, setCurrentResponses] = useState({}); // Current session responses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candone, setCanDone] = useState(true); // Check if the session can be done or not

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch all goals when component mounts or registrationNo changes
  useEffect(() => {
    if (!registrationNo) return; // Prevent API call if registrationNo is undefined

    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/getieppartb/shorttermgoals/completed/${registrationNo}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("API Response:", response.data);
        setAllGoals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, [registrationNo]);

  // Fetch subtasks whenever the selectedgoaldata.shorttermgoal changes
  useEffect(() => {
    if (!registrationNo || !selectedgoaldata.shorttermgoal) return;

    console.log("Fetching subtasks for:", selectedgoaldata.shorttermgoal);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/get/iep/shorttermgoal/completetiondate/${registrationNo}/${selectedgoaldata.shorttermgoal}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const completionDate = new Date(response.data);
        completionDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
        if (today > completionDate) {
          setCanDone(false);
        } else {
          setCanDone(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(true);

    // Reset current responses when goal changes
    setCurrentResponses({});

    // Get subtasks
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/iepsubtasks/getsubtasks/${registrationNo}/${selectedgoaldata.shorttermgoal}`,
      headers: {},
    };

    axios
      .request(config1)
      .then((response) => {
        const responseData = response.data;
        console.log("Subtasks response:", JSON.stringify(responseData));

        // Handle different response formats
        if (Array.isArray(responseData)) {
          setSubtasks(responseData);
        } else if (responseData && typeof responseData === "object") {
          // If it's an object with a data property
          setSubtasks(responseData.data || []);
        } else {
          setSubtasks([]);
        }

        // After getting subtasks, fetch previous assessment sessions
        fetchPreviousSessions();
      })
      .catch((error) => {
        console.log("Error fetching subtasks:", error);
        setSubtasks([]);
        setLoading(false);
      });
  }, [registrationNo, selectedgoaldata.shorttermgoal]);

  // Fetch previous sessions for this goal
  const fetchPreviousSessions = () => {
    if (!registrationNo || !selectedgoaldata.shorttermgoal) {
      setLoading(false);
      return;
    }

    axios
      .get(
        `${API_URL}/api/sessions/${registrationNo}/${selectedgoaldata.shorttermgoal}`
      )
      .then((response) => {
        console.log("Previous sessions:", response.data);
        setSessions(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching previous sessions:", error);
        setSessions([]); // Reset on error
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalSelection = (e) => {
    const { value } = e.target;

    // Find the selected goal data
    const selectedGoal = allgoals.find((goal) => goal.shorttermgoal === value);

    if (selectedGoal) {
      // Update both the selectedgoaldata and formdata states
      setSelectedGoalData({
        domain: selectedGoal.domain || "",
        annualgoal: selectedGoal.annualgoal || "",
        shorttermgoal: selectedGoal.shorttermgoal || "",
      });

      setFormData((prev) => ({
        ...prev,
        domain: selectedGoal.domain || "",
        annualgoal: selectedGoal.annualgoal || "",
        shorttermgoal: selectedGoal.shorttermgoal || "",
      }));
    } else {
      // Reset if no goal was found
      setSelectedGoalData({
        domain: "",
        annualgoal: "",
        shorttermgoal: "",
      });
    }

    // Reset current responses when changing goals
    setCurrentResponses({});
  };

  const handleResponseChange = (subtaskId, value) => {
    setCurrentResponses((prev) => ({
      ...prev,
      [subtaskId]: value,
    }));
  };

  const handleSubmitSession = () => {
    if (!registrationNo || !selectedgoaldata.shorttermgoal) return;

    // Check if at least one subtask has a response
    const hasAtLeastOneResponse = Object.keys(currentResponses).length > 0;

    if (!hasAtLeastOneResponse) {
      alert("Please provide at least one response");
      return;
    }

    setIsSubmitting(true);

    // Prepare the submission data
    const sessionData = {
      registrationNo: registrationNo,
      shorttermgoal: selectedgoaldata.shorttermgoal,
      sessionDate: new Date().toISOString(),
      responses: subtasks
        .map((subtask) => {
          const subtaskId = getSubtaskId(subtask);
          return {
            subtaskId: subtaskId,
            subtaskText: getSubtaskText(subtask),
            response: currentResponses[subtaskId] || "",
          };
        })
        .filter((response) => response.response), // Only include subtasks with responses
    };

    // Submit to backend
    axios
      .post(`${API_URL}/api/submit-session`, sessionData)
      .then((response) => {
        console.log("Session submitted successfully:", response.data);
        // Refresh sessions after submission
        fetchPreviousSessions();
        // Clear current responses for next session
        setCurrentResponses({});
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting session:", error);
        alert("Failed to submit session. Please try again.");
        setIsSubmitting(false);
      });
  };

  // Helper to get the subtask ID consistently
  const getSubtaskId = (subtask) => {
    if (typeof subtask === "string") return subtask;
    return (
      subtask._id || subtask.id || subtask.subtaskId || JSON.stringify(subtask)
    );
  };

  // Helper to get the subtask text consistently
  const getSubtaskText = (subtask) => {
    if (typeof subtask === "string") return subtask;
    return subtask.subtask || subtask.name || subtask.text || "N/A";
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <TextField
        label="Short Term Goal"
        name="shorttermgoal"
        select
        value={selectedgoaldata.shorttermgoal || ""}
        onChange={handleGoalSelection}
        fullWidth
        variant="outlined"
        margin="normal"
        disabled={loading}
      >
        {allgoals.length > 0 ? (
          allgoals.map((goal, index) => (
            <MenuItem key={index} value={goal.shorttermgoal}>
              {goal.shorttermgoal}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No goals available</MenuItem>
        )}
      </TextField>

      <TextField
        label="Domain"
        name="domain"
        value={selectedgoaldata.domain || ""}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          readOnly: true, // Make it read-only since it's auto-filled
        }}
      />

      <TextField
        label="Annual Goal"
        name="annualgoal"
        value={selectedgoaldata.annualgoal || ""}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          readOnly: true, // Make it read-only since it's auto-filled
        }}
      />
      {!candone && (
        <>
          <Typography color="error">
            The completetion date is expired so can not do any further session.
          </Typography>
          <Typography>
            If you want to update the completetion date GO TO IEP PART-B
          </Typography>
        </>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : selectedgoaldata.shorttermgoal ? (
        <>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6">Task Analysis Sessions</Typography>
            <Typography variant="body2" color="text.secondary">
              {sessions.length > 0
                ? `Previous sessions: ${sessions.length}`
                : "No previous sessions recorded"}
            </Typography>
          </Box>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <TableContainer component={Paper}>
              <Table aria-label="subtasks table">
                <TableHead>
                  <TableRow>
                    <TableCell>SrNo</TableCell>
                    <TableCell align="left">Subtasks</TableCell>
                    {/* Display headers for previous sessions */}
                    {sessions.map((session, idx) => (
                      <TableCell key={idx} align="center">
                        Session {idx + 1}
                        <br />
                        {new Date(session.sessionDate).toLocaleDateString()}
                      </TableCell>
                    ))}
                    {candone && (
                      <TableCell align="center">Current Session</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subtasks.length > 0 ? (
                    subtasks.map((subtask, index) => {
                      const subtaskId = getSubtaskId(subtask);
                      return (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{getSubtaskText(subtask)}</TableCell>

                          {/* Previous session responses */}
                          {sessions.map((session, sessionIdx) => {
                            const response = session.responses?.find(
                              (r) =>
                                r.subtaskId === subtaskId ||
                                r.subtaskText === getSubtaskText(subtask)
                            );
                            return (
                              <TableCell key={sessionIdx} align="center">
                                {response ? response.response : "-"}
                              </TableCell>
                            );
                          })}

                          {/* Current session input */}
                          {candone && (
                            <TableCell align="center">
                              <TextField
                                select
                                value={currentResponses[subtaskId] || ""}
                                onChange={(e) =>
                                  handleResponseChange(
                                    subtaskId,
                                    e.target.value
                                  )
                                }
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <MenuItem value="">Select</MenuItem>
                                {["+", "C", "VP", "GP", "MP", "PP"].map(
                                  (option, idx) => (
                                    <MenuItem key={idx} value={option}>
                                      {option}
                                    </MenuItem>
                                  )
                                )}
                              </TextField>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={sessions.length + 3} align="center">
                        No subtasks available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            {candone && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitSession}
                disabled={isSubmitting || subtasks.length === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Session"}
              </Button>
            )}
          </Box>
          <Box sx={{ mt: 2, p: 2 }}>
            <Typography fontWeight="bold">Keys :</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>+ = Yes</Typography>
                <Typography>C = Occasional cues</Typography>
                <Typography>VP = Verbal Prompt</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>GP = Gestural Prompt</Typography>
                <Typography>MP = Modelling Prompt</Typography>
                <Typography>PP = Physical Prompt</Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : null}
    </div>
  );
}

export default TaskAnalysisRecord;
