import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { API_URL } from "../Constants/api_url";
import axios from "axios";

function IepPartA({ selectedChild }) {
  const registrationNo = selectedChild.registrationNo;
  const intialFormState = {
    dateofitp: "",
    mothertounge: "",
    significantinformation: "",
  };
  const [formdata, setFormdata] = useState(intialFormState);
  const [errors, setErrors] = useState({});
  const [viewForm, setViewForm] = useState(false);
  const [annualGoals, setAnnualGoals] = useState([]); //all goals inside
  const [domain, setDomain] = useState(""); // adding domain
  const [annualgoal, setAnnualGoal] = useState(""); //  adding annual goal
  const [editIndex, setEditIndex] = useState(null);

  const [subGoals, setSubGoals] = useState({});
  const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
  const [subGoalInput, setSubGoalInput] = useState("");

  const validateField = (name, value) => {
    let error;
    switch (name) {
      case "mothertounge":
        error = value.length < 1 ? "Mother Tounge required" : "";
        break;
      case "significantinformation":
        error = value.length < 1 ? "significant information required" : "";
        break;
      case "associatedcondition":
        error = value.length < 1 ? "Associated condition required" : "";
        break;
      case "referraltoservices":
        error = value.length < 1 ? "Refferal to services required" : "";
        break;
      // case "dateofitp":
      //   error = value == null ? "Date of itp is required" : "";
      //   break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    const error = validateField(name, value);

    //console.log(error.length);

    if (error.length > 0) {
      setErrors((preverror) => ({ ...preverror, [name]: error }));
    } else {
      setErrors((preverrors) => {
        const newerrors = { ...preverrors };
        delete newerrors[name];
        return newerrors;
      });
    }
  };

  const handleAddGoal = () => {
    if (domain !== "" && annualgoal !== "") {
      if (editIndex !== null) {
        // Update the existing goal based on index
        const updatedGoals = [...annualGoals];
        updatedGoals[editIndex] = { domain, annualgoal };
        setAnnualGoals(updatedGoals);
        setEditIndex(null);
      } else {
        // Add new goal
        setAnnualGoals((prev) => [...prev, { domain, annualgoal }]);
      }
    } else {
      alert("Please enter value into domain and Annual goal");
      return;
    }
    setDomain("");
    setAnnualGoal("");
    setViewForm(false);
    console.log(annualGoals);
  };
  const handleEditGoal = (index) => {
    setDomain(annualGoals[index].domain);
    setAnnualGoal(annualGoals[index].annualgoal);
    setEditIndex(index);
    setViewForm(true);
  };

  const handleDeleteGoal = (index) => {
    const updatedGoals = annualGoals.filter((_, i) => i !== index);
    setAnnualGoals(updatedGoals);
  };

  const handleAddSubGoal = (index) => {
    if (subGoalInput === "") {
      alert("Please enter a subgoal");
      return;
    }

    const updatedSubGoals = { ...subGoals };
    if (!updatedSubGoals[index]) updatedSubGoals[index] = [];
    updatedSubGoals[index].push(subGoalInput);
    setSubGoals(updatedSubGoals);
    setSubGoalInput("");
  };

  const handleDeleteSubGoal = (index, subIndex) => {
    const updatedSubGoals = { ...subGoals };
    updatedSubGoals[index].splice(subIndex, 1);
    setSubGoals(updatedSubGoals);
  };

  const handlesubmit = () => {
    if (formdata.dateofitp == null) {
      let error = validateField("dateofitp", formdata.dateofitp);
      console.log(error);
      alert(error);
      return;
    }
    if (annualGoals.length < 1) {
      alert("Add Annual Goal");
      return;
    }

    // if (subGoals.length < 1 && subGoals.length !== annualGoals.length) {
    //   alert("Add SubGoals");
    //   return;
    // }

    const formattedgoals = annualGoals.map((goal, index) => ({
      domain: goal.domain,
      annualGoal: goal.annualgoal,
      shorttermgoal: subGoals[index] || [],
    }));
    const data = {
      registrationNo: registrationNo,
      dateofitp: formdata.dateofitp,
      mothertounge: formdata.mothertounge,
      significantinformation: formdata.significantinformation,
      associatedcondition: formdata.associatedcondition,
      refferaltoservices: formdata.refferaltoservices,
      annualGoals: formattedgoals,
    };

    console.log("data to be sent is", data);
    let config = {
      method: "post",
      url: `${API_URL}/api/iepparta/save`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: "10vh",
          backgroundColor: "transparent",
        }}
      >
        <Card
          sx={{
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            width: { xs: "100%", sm: "500px", md: "700px", lg: "900px" },
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Filling ITP"
                  name="dateofitp"
                  value={formdata.dateofitp || ""} // Ensure it's an empty string if null
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      dateofitp: e.target.value, // Extract value from event
                    }));
                  }}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother tongue/Language(s) Spoken by person with MR/Autism"
                  fullWidth
                  name="mothertounge"
                  value={formdata.mothertounge}
                  onChange={handleChange}
                  error={!!errors.mothertounge}
                  helperText={errors.mothertounge}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Significant information about the person with MR/Autism"
                  name="significantinformation"
                  value={formdata.significantinformation}
                  onChange={handleChange}
                  error={!!errors.significantinformation}
                  helperText={errors.significantinformation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Associated Condition if any"
                  name="associatedcondition"
                  value={formdata.associatedcondition}
                  onChange={handleChange}
                  error={!!errors.associatedcondition}
                  helperText={errors.associatedcondition}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Referral to other services"
                  name="referraltoservices"
                  value={formdata.referraltoservices}
                  onChange={handleChange}
                  error={!!errors.referraltoservices}
                  helperText={errors.referraltoservices}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  gap={2}
                >
                  <Typography>Annual Goals</Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setViewForm(true);
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
              {viewForm && (
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "ButtonFace",
                      p: 2,
                    }}
                  >
                    <FormControl fullWidth sx={{ backgroundColor: "white" }}>
                      <InputLabel>Select Domain</InputLabel>
                      <Select
                        value={domain}
                        label="Select domain"
                        onChange={(e) => setDomain(e.target.value)}
                      >
                        <MenuItem value="Motor">Motor</MenuItem>
                        <MenuItem value="Cognitive">Cognitive</MenuItem>
                        <MenuItem value="Personal/SelfHelp">
                          Personal/SelfHelp
                        </MenuItem>
                        <MenuItem value="Social/Communication">
                          Social/Communication
                        </MenuItem>
                        <MenuItem value="Academic">Academic</MenuItem>
                        <MenuItem value="Occupational">Occupational</MenuItem>
                        <MenuItem value="Recreational">Recreational</MenuItem>
                        <MenuItem value="Functional Behaviour">
                          Functional Behaviour
                        </MenuItem>
                        <MenuItem value="Sensory">Sensory</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Annual Goal"
                      value={annualgoal}
                      onChange={(e) => {
                        setAnnualGoal(e.target.value);
                      }}
                      sx={{ backgroundColor: "white", mt: 2 }}
                    />
                    <Box
                      sx={{
                        mt: 1,
                        display: " flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          setViewForm(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={handleAddGoal}>
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} sm={12}>
                {annualGoals.length > 0 && (
                  <TableContainer component={Paper} sx={{}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Domain</TableCell>
                          <TableCell>Annual Goal</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {annualGoals.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.domain}</TableCell>
                            <TableCell>{item.annualgoal}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                onClick={() => handleEditGoal(index)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleDeleteGoal(index)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
              <Grid item xs={12} sm={9}>
                {annualGoals.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        m: 1,
                      }}
                    >
                      <Typography variant="h6">
                        {item.domain}: {item.annualgoal}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setCurrentGoalIndex(index)}
                      >
                        Add Subgoal
                      </Button>
                    </Box>
                    {subGoals[index]?.map((sub, subIndex) => (
                      <Box
                        key={subIndex}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          m: 1,
                        }}
                      >
                        <Typography>{sub}</Typography>
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteSubGoal(index, subIndex)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}

                    {currentGoalIndex === index && (
                      <Box>
                        <TextField
                          label="Subgoal"
                          value={subGoalInput}
                          onChange={(e) => setSubGoalInput(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleAddSubGoal(index)}
                        >
                          Add
                        </Button>
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={handlesubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}

export default IepPartA;
