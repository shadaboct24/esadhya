import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Paper,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import { API_URL } from "../Constants/api_url";
import axios from "axios";

const SubtaskManager = ({ selectedChild }) => {
  const registrationNo = selectedChild.registrationNo;
  const [formdata, setFormData] = useState({});
  const [allgoals, setAllGoals] = useState([]);
  const [selectedgoaldata, setSelectedGoalData] = useState({
    domain: "",
    annualgoal: "",
    shorttermgoal: "",
  });
  const [flag, setFlag] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    if (!registrationNo) return; // Prevent API call if registrationNo is undefined

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/getieppartb/shorttermgoals/${registrationNo}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("API Response:", response.data);
        setAllGoals(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [registrationNo]);

  const setselectedgoals = (e) => {
    const { name, value } = e.target;

    if (name === "shorttermgoal") {
      const selecteddata = allgoals.find(
        (goal) => goal.shorttermgoal === value
      );

      setSelectedGoalData(
        selecteddata || { domain: "", annualgoal: "", shorttermgoal: "" }
      );

      setFormData((prev) => ({ ...prev, shorttermgoal: value }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks((prev) => [...prev, newSubtask]); // Append new subtask
      setNewSubtask(""); // Clear input field
    }
  };

  const handleDeleteSubtask = (index) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index)); // Remove subtask at index
  };

  const handlesubmit = () => {
    if (subtasks.length < 1) {
      alert("Enter subtasks");
      return;
    }
    if (selectedgoaldata.shorttermgoal === "") {
      alert("select a ShortTerm goal");
      return;
    }
    let data = JSON.stringify({
      registrationNo: registrationNo,
      domain: selectedgoaldata.domain,
      annualgoal: selectedgoaldata.annualgoal,
      shorttermgoal: selectedgoaldata.shorttermgoal,
      subtasks: subtasks,
    });
    console.log("data is", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/iepsubtasks/save`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Subtasks added successfully");
        setSubtasks([]);
        setNewSubtask("");
        setSelectedGoalData({ domain: "", annualgoal: "", shorttermgoal: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (allgoals.length < 1) {
    return (
      <>
        <Typography>No Short Term Goal Available</Typography>
      </>
    );
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Create Subtasks for Short-Term Goals
      </Typography>

      <TextField
        label="Short Term Goal"
        name="shorttermgoal"
        select
        value={selectedgoaldata.shorttermgoal || ""}
        onChange={setselectedgoals}
        fullWidth
        variant="outlined"
        margin="normal"
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

      {/* Toggle Add Subtask Field */}
      <Button
        onClick={() => setFlag(!flag)}
        style={{ marginTop: "10px" }}
        variant="contained"
      >
        {flag ? "Hide Subtask Field" : "Add Subtask"}
      </Button>

      {flag && (
        <>
          <TextField
            label="Subtask"
            name="subtasks"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            onClick={handleAddSubtask}
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Add
          </Button>
        </>
      )}

      {/* Display Added Subtasks with Delete Button */}
      {subtasks.length > 0 && (
        <List>
          {subtasks.map((task, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={task} />
              <IconButton
                onClick={() => handleDeleteSubtask(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Button
        onClick={handlesubmit}
        variant="contained"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "right",
        }}
      >
        SUBMIT
      </Button>
    </Paper>
  );
};

export default SubtaskManager;
