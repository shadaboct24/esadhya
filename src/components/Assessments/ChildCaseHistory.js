import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

function ChildCaseHistory() {
  const [formdata, setFormdata] = useState({});
  const [section, setSection] = useState(1);
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: { xs: "100%", sm: "500px", md: "700px", lg: "900px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Case Record Proforma</Typography>
        <Typography variant="h6">Section {section}</Typography>
      </Box>

      {section === 1 && (
        <Box component="form">
          <Typography variant="h6">Identification data (case)</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="select child"
                label="select child"
                value={formdata.child}
              >
                <MenuItem value="">Select child</MenuItem>
                <MenuItem value="abhishek">abhishek</MenuItem>
                <MenuItem value="shadab">shadab</MenuItem>
              </TextField>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date"
                  value={formdata.date}
                  sx={{ flex: 1, width: "100%" }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                value={formdata.name}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date of birth"
                  value={formdata.dob}
                  sx={{ flex: 1, width: "100%" }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="registyration no"
                label="Registration No"
                value={formdata.regNo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                name="gender"
                label="Gender"
                value={formdata.gender}
              >
                <MenuItem value="">Choose One</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="informant"
                label="Informant"
                value={formdata.informant}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name=" education"
                label="Education"
                value={formdata.education}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="ref by"
                label="Ref By"
                value={formdata.refby}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="occupation"
                label="Occupation"
                value={formdata.occupation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name=" language spoken"
                label="Language Spoken"
                value={formdata.languagespoken}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="any other language"
                label="Any other Language Spoken"
                value={formdata.otherlanguagespoken}
              />
            </Grid>
            {/* <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setSection((section % 7) + 1)}
            >
              next
            </Button>
          </Grid> */}
          </Grid>
        </Box>
      )}
      {section === 2 && (
        <Box component="form">
          <Typography variant="h6">
            Demoghraphic Data (Parent/Guardian)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="fathername"
                label="Father Name"
                value={formdata.fathername}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="fatheroccupation"
                label="Father Occupation"
                value={formdata.fatheroccupation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="fathereducation"
                label="Father Eduaction"
                value={formdata.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="mothername"
                label="Mother Name"
                value={formdata.mothername}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="motheroccupation"
                label="Mother Occupation"
                value={formdata.motheroccupation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="mothereducation"
                label="Mother Education"
                value={formdata.mothereducation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="localaddress"
                label="Local Address"
                value={formdata.localaddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="permanentaddress"
                label="Permanent Address"
                value={formdata.permanentaddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="income"
                label="Family Income"
                value={formdata.income}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {section === 3 && (
        <Box>
          <Grid item xs={12}>
            <Typography variant="h6">
              Family, Development History and Pedigree Chart
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="presentingcomplaints"
                label="Presenting Complaints"
                value={formdata.presentingcomplaints}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="historypre-natal"
                label="History Pre-natal, Natal, Postnatal"
                value={formdata.historyprenatal}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="familyhistory"
                label="Family History"
                value={formdata.familyhistory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label">
                Upload Pedigree Chart
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  // onChange={handleFileChange}
                />
              </Button>
              {/* {errors.file && (
                <Typography color="error" variant="caption" display="block">
                  {errors.file}
                </Typography>
              )} */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Development History</Typography>
            </Grid>

            {/* <Grid container spacing={3}> */}
            <Grid item xs={8}>
              <Typography>a) Neck Holdings (2-6 Months)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.neckHolding || ""}
              />
            </Grid>

            <Grid item xs={8}>
              <Typography>b) Sitting (5-10 Months)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.sitting || ""}
              />
            </Grid>

            <Grid item xs={8}>
              <Typography>c) Walking (9-14 Months)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.walking || ""}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>d) First Words (7-12 Months)</Typography>
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="For Autism"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>e) Two Words Phrases (16-30 Months)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="For Autism"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>f) Sentences (3-4 Year)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="For Autism"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.firstWords || ""}
              />
            </Grid>

            <Grid item xs={8}>
              <Typography>g) Toilet Control (3-4 Year)</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                value={formdata.developmentHistory?.toiletControl || ""}
              />
            </Grid>

            <Grid item xs={8}>
              <Typography>h) Monetary Transaction</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={
                  formdata.developmentHistory?.monetaryTransaction?.toString() ||
                  "false"
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <Typography>i) Avoids simple hazards</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={
                  formdata.developmentHistory?.avoidsHazards?.toString() ||
                  "false"
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <Typography>
                j) Problems in School / Scholastic Backwardness
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={
                  formdata.developmentHistory?.schoolProblems?.toString() ||
                  "false"
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <Typography>k) Physical deformity</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={
                  formdata.developmentHistory?.physicalDeformity?.toString() ||
                  "false"
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <Typography>l) Sensory Impairments</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={
                  formdata.developmentHistory?.sensoryImpairments?.toString() ||
                  "false"
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <Typography>m) Fits</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                value={formdata.developmentHistory?.fits?.toString() || "false"}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="schoolhistory"
                label="School History"
                value={formdata.schoolhistory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="occupationalhistory"
                label="Occupational History"
                value={formdata.occupationalhistory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="behaviourproblem"
                label="Behaviour Problems, if any"
                value={formdata.behaviourproblem}
                multiline
                maxRows={5}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {section === 4 && (
        <Box component="form">
          <Grid item xs={12}>
            <Typography variant="h6">Assessment</Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="motor"
                label="Motor"
                value={formdata.motor}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="selfhelp"
                label="Self Help"
                value={formdata.selfhelp}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="communication"
                label="Communication"
                value={formdata.communication}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="academics"
                label="Academics"
                value={formdata.academics}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="socialization"
                label="Socialization"
                value={formdata.socialization}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="educationstatus"
                label="Education Status"
                value={formdata.educationstatus}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="vocationalstatus"
                label="Vocational Status"
                value={formdata.vocationalstatus}
                multiline
                maxRows={5}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {section === 5 && (
        <Box component="form">
          <Grid item xs={12}>
            <Typography variant="h6">Medical Examination</Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="height"
                label="Height"
                value={formdata.height}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="weight"
                label="Weight"
                value={formdata.weight}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="headcircumference"
                label="Head Circumference"
                value={formdata.headcircumference}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>General Appearance</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Physical Appearance-------</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="healthstatus"
                label="Health Status"
                value={formdata.healthstatus}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="hygiene"
                label="Hygiene"
                value={formdata.hygiene}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="cvs"
                label="CVS"
                value={formdata.cvs}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="respiratory"
                label="Respiratory"
                value={formdata.respiratory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="abdomen"
                label="Abdomen"
                value={formdata.abdomen}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="cnssensory"
                label="CNS-Sensory"
                value={formdata.cnssensory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="visual"
                label="Visual"
                value={formdata.visual}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="auditory"
                label="Auditory"
                value={formdata.auditory}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Motor-------</Typography>
            </Grid>
            <>
              <Grid item xs={12}>
                <Typography>RUL</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  required
                  fullWidth
                  name="tone"
                  label="Tone"
                  value={formdata.rultone}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="hypertonic">Hypertonic</MenuItem>
                  <MenuItem value="hypotonic">Hypotonic</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  required
                  name="power"
                  label="Power"
                  value={formdata.rulpower}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="age appropriate">Age Appropriate</MenuItem>
                  <MenuItem value="Corresponding to Bodty Mass Index(BMI)">
                    Corresponding to Bodty Mass Index(BMI)
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="nutrition"
                  label="Nutrition"
                  value={formdata.rulnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Co-ordination"
                  label="Co-ordination"
                  value={formdata.rulCoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Abnormal involuntary movement"
                  label="Abnormal involuntary movement"
                  value={formdata.rulAbnormalinvoluntarymovement}
                />
              </Grid>
            </>

            <>
              <Grid item xs={12}>
                <Typography>RLL</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  required
                  fullWidth
                  name="tone"
                  label="Tone"
                  value={formdata.rlltone}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="hypertonic">Hypertonic</MenuItem>
                  <MenuItem value="hypotonic">Hypotonic</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  required
                  name="power"
                  label="Power"
                  value={formdata.rllpower}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="age appropriate">Age Appropriate</MenuItem>
                  <MenuItem value="Corresponding to Bodty Mass Index(BMI)">
                    Corresponding to Bodty Mass Index(BMI)
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="nutrition"
                  label="Nutrition"
                  value={formdata.rllnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Co-ordination"
                  label="Co-ordination"
                  value={formdata.rllCoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Abnormal involuntary movement"
                  label="Abnormal involuntary movement"
                  value={formdata.rllAbnormalinvoluntarymovement}
                />
              </Grid>
            </>
            <>
              <Grid item xs={12}>
                <Typography>LUL</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  required
                  fullWidth
                  name="tone"
                  label="Tone"
                  value={formdata.lultone}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="hypertonic">Hypertonic</MenuItem>
                  <MenuItem value="hypotonic">Hypotonic</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  required
                  name="power"
                  label="Power"
                  value={formdata.lulpower}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="age appropriate">Age Appropriate</MenuItem>
                  <MenuItem value="Corresponding to Bodty Mass Index(BMI)">
                    Corresponding to Bodty Mass Index(BMI)
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="nutrition"
                  label="Nutrition"
                  value={formdata.lulnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Co-ordination"
                  label="Co-ordination"
                  value={formdata.lulCoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Abnormal involuntary movement"
                  label="Abnormal involuntary movement"
                  value={formdata.lulAbnormalinvoluntarymovement}
                />
              </Grid>
            </>
            <>
              <Grid item xs={12}>
                <Typography>LLL</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  select
                  required
                  fullWidth
                  name="tone"
                  label="Tone"
                  value={formdata.llltone}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="hypertonic">Hypertonic</MenuItem>
                  <MenuItem value="hypotonic">Hypotonic</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  required
                  name="power"
                  label="Power"
                  value={formdata.lllpower}
                >
                  <MenuItem value="">Please Select</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="age appropriate">Age Appropriate</MenuItem>
                  <MenuItem value="Corresponding to Bodty Mass Index(BMI)">
                    Corresponding to Bodty Mass Index(BMI)
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="nutrition"
                  label="Nutrition"
                  value={formdata.lllnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Co-ordination"
                  label="Co-ordination"
                  value={formdata.lllCoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="Abnormal involuntary movement"
                  label="Abnormal involuntary movement"
                  value={formdata.lllAbnormalinvoluntarymovement}
                />
              </Grid>
            </>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                required
                name="gait"
                label="Gait"
                value={formdata.gait}
              >
                <MenuItem value="">Please Select</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="A-typical">A-typical</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="anyotherinformation"
                label="Any Other Information"
                value={formdata.anyotherinformation}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="investigations"
                label="Investigations"
                value={formdata.investigations}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="treatment"
                label="Treatment"
                value={formdata.treatment}
                multiline
                maxRows={5}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {section === 6 && (
        <Box component="form">
          <Grid item xs={12}>
            <Typography variant="h6">
              Intellectual/Psychological Assessment
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="General behavior during assessment	"
                label="General behavior during assessment	"
                value={formdata.generalbehaviorduringassessment}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="Attention and concentration"
                label="Attention and concentration"
                value={formdata.attentionandconcentration}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="Activity level"
                label="Activity level"
                value={formdata.Aativitylevel}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="Comprehension"
                label="Comprehension"
                value={formdata.comprehension}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="Emotionality and behavior"
                label="Emotionality and behavior"
                value={formdata.emotionalityandbehavior}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="Relationship within/outside family(Significant stressors)"
                label="Relationship within/outside family(Significant stressors)"
                value={formdata.relationshipwithinoutside}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Psychological tests used(Please tick)</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="DST" />
                <FormControlLabel control={<Checkbox />} label="VSMS" />
                <FormControlLabel control={<Checkbox />} label="GDS" />
                <FormControlLabel control={<Checkbox />} label="GDT" />
                <FormControlLabel control={<Checkbox />} label="SFB" />
                <FormControlLabel control={<Checkbox />} label="MISIC" />
                <FormControlLabel control={<Checkbox />} label="BSB" />
                <FormControlLabel control={<Checkbox />} label="BKT" />
              </FormGroup>
              <TextField
                fullWidth
                name="anyothertest"
                label="Any other Specify"
                value={formdata.anyothertest}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Results</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultda" label="DA" value={formdata.resultda} />
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultsa" label="SA" value={formdata.resultsa} />
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultma" label="MA" value={formdata.resultma} />
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultdq" label="DQ" value={formdata.resultdq} />
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultsq" label="SQ" value={formdata.resultsq} />
            </Grid>
            <Grid item xs={2}>
              <TextField name="resultiq" label="IQ" value={formdata.resultiq} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="anyotherinformation"
                label="Any other Information"
                value={formdata.anyotherinformation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="furthertesting"
                label="Further testing(If required)"
                value={formdata.furthertesting}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {section === 7 && (
        <Box component="form">
          <Typography variant="h6">Management Plan</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="provisionaldiagnosis"
                label="Provisional Diagnosis"
                value={formdata.provisionaldiagnosis}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="managementplan"
                label="Management Plan"
                value={formdata.managementplan}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Team Recommended for Placement</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Medical" />
                <FormControlLabel control={<Checkbox />} label="Psycological" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Physiotherapy"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Occupational Therapy"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Speech Pthalogy & Audiology"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Special Education"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="signature"
                label="Signature"
                value={formdata.signature}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="student"
                label="Student"
                value={formdata.child}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="clinicalassistant"
                label="Clinical Assistant"
                value={formdata.clinicalassistant}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Consultants</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="consultant1"
                label="1."
                value={formdata.consultant1}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="consultant2"
                label="2."
                value={formdata.consultant2}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="consultant3"
                label="3."
                value={formdata.consultant3}
                fullWidth
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date"
                  value={formdata.managementplandate}
                  sx={{ flex: 1, width: "100%" }}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: section === 1 ? "flex-end" : "space-between",
          mt: 2,
        }}
      >
        {section !== 1 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setSection((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        {section !== 7 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setSection((prev) => prev + 1)}
          >
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default ChildCaseHistory;
