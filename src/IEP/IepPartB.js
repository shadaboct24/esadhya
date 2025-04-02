import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import { API_URL } from "../Constants/api_url";
import axios from "axios";

const IepPartB = ({ selectedChild }) => {
  const registrationNo = selectedChild.registrationNo;

  // Initial state for the form data
  const initialState = {
    itpno: "",
    dateofprogramming: "",
    dateofevaluation: "",
    personresponsible: "",
    domain: "",
    shorttermgoal: "",
    annualgoal: "",
    presentfunctioninglevel: "",
    specificobjectives: "",
    materialneeded: "",
    procedure: "",
    reinforcement: "",
    evaluation: "",
  };

  const [formdata, setFormdata] = useState(initialState);
  const [formerror, setFormerror] = useState({});
  const [availableShortTermGoals, setAvailableShortTermGoals] = useState([]);
  const [completedShortTermGoals, setCompletedShortTermGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [mode, setMode] = useState(null); // null, 'create', or 'update'

  // Fetch available short-term goals and completed short-term goals
  const fetchShortTermGoals = () => {
    setLoading(true);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/getiepparta/${registrationNo}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // Fetch available (incomplete) short-term goals
        const availableGoals = [];
        const completedGoals = [];

        response.data.annualGoals.forEach((goal) => {
          Object.entries(goal.shorttermgoal).forEach(([key, value]) => {
            const goalObject = {
              shortGoal: key,
              domain: goal.domain,
              annualGoal: goal.annualGoal,
            };

            if (value === false) {
              availableGoals.push(goalObject);
            } else {
              completedGoals.push(goalObject);
            }
          });
        });

        if (availableGoals.length < 1) setCompleted(true);

        setAvailableShortTermGoals(availableGoals);
        setCompletedShortTermGoals(completedGoals);

        setFormdata((prevdata) => ({
          ...prevdata,
          ["dateoffilingitp"]: response.data.dateofitp,
        }));

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Fetch existing IEP Part B for update
  const fetchExistingIepPartB = (shortTermGoal) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/getieppartb/completed/${registrationNo}/${shortTermGoal}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setFormdata(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShortTermGoals();
  }, [registrationNo]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "itpno":
        error = value.length < 1 ? "Itp No required" : "";
        break;
      case "dateofprogramming":
      case "dateofevaluation":
        error = !value ? "Date is required" : "";
        break;
      case "domain":
        error = value.length < 1 ? "Domain is required" : "";
        break;
      case "shorttermgoal":
        error = value.length < 1 ? "Short term Goal is required" : "";
        break;
      case "annualgoal":
        error = value.length < 1 ? "Annual Goal is required" : "";
        break;
      case "presentfunctioninglevel":
        error = value.length < 1 ? "Functioning level is required" : "";
        break;
      case "specificobjectives":
        error = value.length < 1 ? "Specific Objective is required" : "";
        break;
      case "materialneeded":
        error = value.length < 1 ? "Material needed is required" : "";
        break;
      case "procedure":
        error = value.length < 1 ? "Procedure is required" : "";
        break;
      case "reinforcement":
        error = value.length < 1 ? "Reinforcement is required" : "";
        break;
      case "evaluation":
        error = value.length < 1 ? "Evaluation is required" : "";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "shorttermgoal") {
      // If in update mode, fetch the existing IEP Part B for this short-term goal
      if (mode === "update") {
        fetchExistingIepPartB(value);
      }

      // Find the matching short term goal from our available goals
      const selectedGoalData = (
        mode === "create" ? availableShortTermGoals : completedShortTermGoals
      ).find((goal) => goal.shortGoal === value);

      if (selectedGoalData) {
        // Auto-fill domain and annual goal based on the selected short term goal
        setFormdata((prev) => ({
          ...prev,
          shorttermgoal: value,
          domain: selectedGoalData.domain,
          annualgoal: selectedGoalData.annualGoal,
        }));

        // Clear errors for these fields since they're now filled
        setFormerror((prev) => {
          const newErrors = { ...prev };
          delete newErrors.shorttermgoal;
          delete newErrors.domain;
          delete newErrors.annualgoal;
          return newErrors;
        });
      } else {
        setFormdata((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      // Regular field handling
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }

    // Validate the field
    const error = validateField(name, value);

    if (error) {
      setFormerror((prev) => ({ ...prev, [name]: error }));
    } else {
      setFormerror((prev) => {
        const newerrors = { ...prev };
        delete newerrors[name];
        return newerrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    let newErrors = {};
    Object.keys(formdata).forEach((field) => {
      const error = validateField(field, formdata[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormerror(newErrors);
      return;
    }

    // Prepare data for submission
    const submissionData = {
      ...formdata,
      registrationNo: registrationNo,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/ieppartb/save`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(submissionData),
    };
    console.log("data submit", submissionData);

    axios
      .request(config)
      .then((response) => {
        alert(
          mode === "update"
            ? "Form updated successfully!"
            : "Form submitted successfully!"
        );
        // Reset form and refetch goals
        setFormdata(initialState);
        fetchShortTermGoals();
        setMode(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Error submitting form");
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (completed) {
    return <Typography>All Short Term Goals are Completed</Typography>;
  }

  // Mode Selection Buttons
  if (!mode) {
    return (
      <Grid container spacing={2} sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        {availableShortTermGoals.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setMode("create")}
            >
              Create New IEP Part B
            </Button>
          </Grid>
        )}
        {completedShortTermGoals.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setMode("update")}
            >
              Update Existing IEP Part B
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }

  // Form Rendering
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {mode === "update" ? "Update IEP Part B" : "Create IEP Part B"}
      </Typography>

      <Grid container spacing={2} sx={{ maxWidth: 800, margin: "auto" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ITP NO."
            name="itpno"
            value={formdata.itpno}
            error={!!formerror.itpno}
            helperText={formerror.itpno}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Programming"
            type="date"
            name="dateofprogramming"
            value={formdata.dateofprogramming}
            InputLabelProps={{ shrink: true }}
            error={!!formerror.dateofprogramming}
            helperText={formerror.dateofprogramming}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Evaluation"
            type="date"
            name="dateofevaluation"
            value={formdata.dateofevaluation}
            InputLabelProps={{ shrink: true }}
            error={!!formerror.dateofevaluation}
            helperText={formerror.dateofevaluation}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Persons Responsible"
            name="personresponsible"
            value={formdata.personresponsible}
            error={!!formerror.personresponsible}
            helperText={formerror.personresponsible}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>
              {mode === "create"
                ? "Select Task / Skill / Activity to Create"
                : "Select Task / Skill / Activity to Update"}
            </InputLabel>
            <Select
              label="Select Task / Skill / Activity to Create"
              name="shorttermgoal"
              value={formdata.shorttermgoal}
              error={!!formerror.shorttermgoal}
              onChange={handleChange}
            >
              {(mode === "create"
                ? availableShortTermGoals
                : completedShortTermGoals
              ).map((goal, index) => (
                <MenuItem key={index} value={goal.shortGoal}>
                  {goal.shortGoal}
                </MenuItem>
              ))}
            </Select>
            {formerror.shorttermgoal && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.75rem",
                  marginLeft: "14px",
                }}
              >
                {formerror.shorttermgoal}
              </p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Area / Domain"
            name="domain"
            value={formdata.domain}
            error={!!formerror.domain}
            helperText={formerror.domain}
            onChange={handleChange}
            InputProps={{
              readOnly: !!formdata.shorttermgoal,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Annual Goal"
            name="annualgoal"
            value={formdata.annualgoal}
            error={!!formerror.annualgoal}
            helperText={formerror.annualgoal}
            onChange={handleChange}
            InputProps={{
              readOnly: !!formdata.shorttermgoal,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Present Functioning Level"
            name="presentfunctioninglevel"
            value={formdata.presentfunctioninglevel}
            error={!!formerror.presentfunctioninglevel}
            helperText={formerror.presentfunctioninglevel}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Specific Objectives"
            name="specificobjectives"
            value={formdata.specificobjectives}
            error={!!formerror.specificobjectives}
            helperText={formerror.specificobjectives}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Materials Needed"
            name="materialneeded"
            value={formdata.materialneeded}
            error={!!formerror.materialneeded}
            helperText={formerror.materialneeded}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Procedure"
            name="procedure"
            value={formdata.procedure}
            error={!!formerror.procedure}
            helperText={formerror.procedure}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reinforcement"
            name="reinforcement"
            value={formdata.reinforcement}
            error={!!formerror.reinforcement}
            helperText={formerror.reinforcement}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Evaluation"
            name="evaluation"
            value={formdata.evaluation}
            error={!!formerror.evaluation}
            helperText={formerror.evaluation}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Upload Signature
            <input
              type="file"
              hidden
              accept="image/jpeg, image/gif, image/png"
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            {mode === "update" ? "Update Form" : "Submit Form"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              setFormdata(initialState);
              setMode(null);
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default IepPartB;
