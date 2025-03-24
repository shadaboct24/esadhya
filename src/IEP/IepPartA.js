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
import React, { useEffect, useState } from "react";
import { API_URL } from "../Constants/api_url";
import axios from "axios";

function IepPartA({ selectedChild }) {
  const registrationNo = selectedChild.registrationNo;
  const intialFormState = {
    dateofitp: "",
    mothertounge: "",
    significantinformation: "",
    associatedcondition: "",
    referraltoservices: "",
  };

  const [formdata, setFormdata] = useState(intialFormState);
  const [errors, setErrors] = useState({});
  const [viewForm, setViewForm] = useState(false);
  const [annualGoals, setAnnualGoals] = useState([]); //all goals inside
  const [domain, setDomain] = useState(""); // adding domain
  const [annualgoal, setAnnualGoal] = useState(""); //  adding annual goal
  const [editIndex, setEditIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formId, setFormId] = useState("");

  const [subGoals, setSubGoals] = useState({});
  const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
  const [subGoalInput, setSubGoalInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [receivedShortTermGoals, setReceivedShortTermGoals] = useState({});

  useEffect(() => {
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
        if (response.data && Object.keys(response.data).length > 0) {
          const data = response.data;
          console.log("Fetched data:", data);

          // Update form data
          setFormdata({
            dateofitp: data.dateofitp ? data.dateofitp.split("T")[0] : "", // Format date
            mothertounge: data.mothertounge || "",
            significantinformation: data.significantinformation || "",
            associatedcondition: data.associatedcondition || "",
            referraltoservices: data.refferaltoservices || "",
          });

          // Update annual goals
          if (data.annualGoals && data.annualGoals.length > 0) {
            setAnnualGoals(
              data.annualGoals.map((goal) => ({
                domain: goal.domain,
                annualgoal: goal.annualGoal,
              }))
            );

            // Update subgoals
            const subGoalsObj = {};
            data.annualGoals.forEach((goal, index) => {
              if (
                goal.shorttermgoal &&
                Object.keys(goal.shorttermgoal).length > 0
              ) {
                subGoalsObj[index] = Object.keys(goal.shorttermgoal);
                Object.entries(goal.shorttermgoal).forEach(([key, value]) => {
                  setReceivedShortTermGoals((prv) => ({
                    ...prv,
                    [key]: value,
                  }));
                });
              }
            });

            setSubGoals(subGoalsObj);
          }

          // Set update flag and form ID
          setIsUpdate(true);
          setFormId(data.id || "");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, [registrationNo]); // Only run when registrationNo changes

  const validateField = (name, value) => {
    let error = "";
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

    // Also update subgoals
    const updatedSubGoals = { ...subGoals };
    delete updatedSubGoals[index];

    // Reindex subgoals
    const newSubGoals = {};
    Object.keys(updatedSubGoals).forEach((key) => {
      const numKey = parseInt(key);
      if (numKey > index) {
        newSubGoals[numKey - 1] = updatedSubGoals[numKey];
      } else {
        newSubGoals[numKey] = updatedSubGoals[numKey];
      }
    });

    setSubGoals(newSubGoals);
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
    setCurrentGoalIndex(null); // Close the subgoal input after adding
  };

  const handleDeleteSubGoal = (index, subIndex) => {
    const updatedSubGoals = { ...subGoals };
    updatedSubGoals[index].splice(subIndex, 1);
    setSubGoals(updatedSubGoals);
  };

  const handlesubmit = () => {
    if (!formdata.dateofitp) {
      alert("Date of ITP is required");
      return;
    }

    if (annualGoals.length < 1) {
      alert("Add Annual Goal");
      return;
    }

    const formattedgoals = annualGoals.map((goal, index) => {
      let subgoalPost = {}; // Reset inside map() to avoid shared reference

      subGoals[index].forEach((elem) => {
        subgoalPost[elem] = receivedShortTermGoals?.[elem] ?? false; // Directly add key-value pair
      });

      return {
        domain: goal.domain,
        annualGoal: goal.annualgoal,
        shorttermgoal: subgoalPost, // No need for `|| []`
      };
    });

    const data = {
      registrationNo: registrationNo,
      dateofitp: formdata.dateofitp,
      mothertounge: formdata.mothertounge,
      significantinformation: formdata.significantinformation,
      associatedcondition: formdata.associatedcondition,
      refferaltoservices: formdata.referraltoservices,
      annualGoals: formattedgoals,
    };

    // If it's an update, include the ID
    if (isUpdate && formId) {
      data.id = formId;
    }

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
        alert(
          isUpdate
            ? "Form updated successfully!"
            : "Form submitted successfully!"
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Error submitting form. Please try again.");
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
            <Typography variant="h5" gutterBottom>
              {isUpdate ? "Update IEP Part A" : "Create IEP Part A"}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Filling ITP"
                  name="dateofitp"
                  value={formdata.dateofitp || ""}
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      dateofitp: e.target.value,
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
                  value={formdata.mothertounge || ""}
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
                  value={formdata.significantinformation || ""}
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
                  value={formdata.associatedcondition || ""}
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
                  value={formdata.referraltoservices || ""}
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
                      setEditIndex(null);
                      setDomain("");
                      setAnnualGoal("");
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
                        display: "flex",
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
                        {editIndex !== null ? "Update" : "Add"}
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
                                sx={{ mr: 1 }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
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
              <Grid item xs={12} sm={12}>
                {/* <Typography variant="h6" gutterBottom>
                  Short Term Goals
                </Typography> */}
                {annualGoals.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        m: 1,
                        p: 1,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h6">
                        {item.domain}: {item.annualgoal}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentGoalIndex(
                            currentGoalIndex === index ? null : index
                          );
                          setSubGoalInput("");
                        }}
                      >
                        {currentGoalIndex === index ? "Cancel" : "Add Subgoal"}
                      </Button>
                    </Box>

                    {subGoals[index]?.length > 0 && (
                      <Box sx={{ ml: 3, mb: 2 }}>
                        <Typography variant="subtitle1">Subgoals:</Typography>
                        {subGoals[index].map((sub, subIndex) => (
                          <Box
                            key={subIndex}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              m: 1,
                              p: 1,
                              border: "1px solid #eee",
                              borderRadius: 1,
                            }}
                          >
                            <Typography>{sub}</Typography>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() =>
                                handleDeleteSubGoal(index, subIndex)
                              }
                            >
                              Delete
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {currentGoalIndex === index && (
                      <Box
                        sx={{ ml: 3, mt: 1, mb: 2, display: "flex", gap: 1 }}
                      >
                        <TextField
                          label="Subgoal"
                          value={subGoalInput}
                          onChange={(e) => setSubGoalInput(e.target.value)}
                          fullWidth
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
                <Button variant="contained" onClick={handlesubmit} size="large">
                  {isUpdate ? "Update Form" : "Submit Form"}
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
