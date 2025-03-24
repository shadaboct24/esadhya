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
  const [fetchedData, setFetchedData] = useState(null);
  const [availableShortTermGoals, setAvailableShortTermGoals] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFormdata((prevdata) => ({
      ...prevdata,
      ["registrationNo"]: registrationNo,
    }));
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/getiepparta/${registrationNo}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        setFetchedData(response.data);

        // Extract all short-term goals from the fetched data
        const allShortTermGoals = [];
        response.data.annualGoals.forEach((goal) => {
          Object.entries(goal.shorttermgoal).forEach(([key, value]) => {
            if (value === false) {
              // Filter only where value is false
              allShortTermGoals.push({
                shortGoal: key, // Short-term goal key
                domain: goal.domain,
                annualGoal: goal.annualGoal,
              });
            }
          });
        });
        if (allShortTermGoals.length < 1) setCompleted(true);
        setAvailableShortTermGoals(allShortTermGoals);
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

    //this is for fetching data of irppartB
    // let config1 = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: `${API_URL}/api/getieppartb/${registrationNo}`,
    //   headers: {},
    // };

    // axios
    //   .request(config1)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     setFormdata(response.data);
    //     setLoading(false);
    //     setIsUpdate(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
      // Find the matching short term goal from our available goals
      const selectedGoalData = availableShortTermGoals.find(
        (goal) => goal.shortGoal === value
      );

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

  // Handle form submission
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

    // Send data to backend
    // This is where you would add your API call to submit the data
    console.log("Form submitted:", formdata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/ieppartb/save`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formdata),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(
          isUpdate
            ? "Form updated successfully!"
            : "Form submitted successfully!"
        );
        setFormdata(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (completed) {
    return <Typography>All Short Term Goals are Completed</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {isUpdate ? "Update IEP Part B" : "Create IEP Part B"}
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
            <InputLabel>Task / Skill / Activity</InputLabel>
            <Select
              label="Task / Skill / Activity"
              name="shorttermgoal"
              value={formdata.shorttermgoal}
              error={!!formerror.shorttermgoal}
              onChange={handleChange}
            >
              {availableShortTermGoals.map((goal, index) => (
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
            {isUpdate ? "Update Form" : "Submit Form"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default IepPartB;
