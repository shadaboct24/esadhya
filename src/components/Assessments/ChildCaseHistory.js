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
                value={formdata.child} // put the value from selected child prop
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
                  name="assessmentdate"
                  value={formdata.assessmentdate} // enter mannualy
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
                value={formdata.name} // from selected child
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date of birth"
                  value={formdata.dob} // from selected child
                  sx={{ flex: 1, width: "100%" }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="registrationNo"
                label="Registration No"
                value={formdata.registrationNo}
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
                name="education"
                label="Education"
                value={formdata.education}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="refBy"
                label="Ref By"
                value={formdata.refBy}
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
                name=" languagespoken"
                label="Language Spoken"
                value={formdata.languagespoken}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="otherlanguagespoken"
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
                value={formdata.fathereducation}
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
                name="familyincome"
                label="Family Income"
                value={formdata.familyincome}
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
                name="natalhistory"
                label="History Pre-natal, Natal, Postnatal"
                value={formdata.natalhistory}
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
                  accept="image/*" //configure the file to be upload
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
                name="nectholdingage"
                value={formdata.neckholdingage}
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
                name="sittingage"
                value={formdata.sittingage}
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
                name="walkingage"
                value={formdata.walkingage}
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
                name="firstwordautism"
                value={formdata.firstwordautism}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                name="firstwordage"
                value={formdata.firstwordage}
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
                name="twowordphrasesautism"
                value={formdata.twowordphrasesautism}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                name="twowordphrasesage"
                value={formdata.twowordphrasesage}
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
                name="sentenceautism"
                value={formdata.sentenceautism}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Age"
                name="sentenceage"
                value={formdata.sentenceage}
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
                name="toiletcontrolage"
                value={formdata.toiletcontrolage}
              />
            </Grid>

            <Grid item xs={8}>
              <Typography>h) Monetary Transaction</Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup
                row
                name="monetarytranc"
                value={formdata.monetarytranc}
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
                name="avoidsimplehazard"
                value={formdata.avoidsimplehazard}
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
                name="probleminschool"
                value={formdata.probleminschool}
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
                name="physicaldeformity"
                value={formdata.physicaldeformity}
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
                name="sensoryimpairments"
                value={formdata.sensoryimpairments}
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
              <RadioGroup row name="fits" value={formdata.fits}>
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
                  name="rultone"
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
                  name="rulpower"
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
                  name="rulnutrition"
                  label="Nutrition"
                  value={formdata.rulnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="rulcoordination"
                  label="Co-ordination"
                  value={formdata.rulcoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="rulabnormalinvoluntarymovement"
                  label="Abnormal involuntary movement"
                  value={formdata.rulabnormalinvoluntarymovement}
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
                  name="rlltone"
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
                  name="rllpower"
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
                  name="rllnutrition"
                  label="Nutrition"
                  value={formdata.rllnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="rllcoordination"
                  label="Co-ordination"
                  value={formdata.rllcoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="rllabnormalinvoluntarymovement"
                  label="Abnormal involuntary movement"
                  value={formdata.rllabnormalinvoluntarymovement}
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
                  name="lultone"
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
                  name="lulpower"
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
                  name="lulnutrition"
                  label="Nutrition"
                  value={formdata.lulnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="lulcoordination"
                  label="Co-ordination"
                  value={formdata.lulcoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="lulabnormalinvoluntarymovement"
                  label="Abnormal involuntary movement"
                  value={formdata.lulabnormalinvoluntarymovement}
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
                  name="llltone"
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
                  name="lllpower"
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
                  name="lllnutrition"
                  label="Nutrition"
                  value={formdata.lllnutrition}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="lllcoordination"
                  label="Co-ordination"
                  value={formdata.lllCoordination}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="lllabnormalinvoluntarymovement"
                  label="Abnormal involuntary movement"
                  value={formdata.lllabnormalinvoluntarymovement}
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
                name="generalbehaviourduringassessment"
                label="General behavior during assessment	"
                value={formdata.generalbehaviourduringassessment}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="attentionandconcentration"
                label="Attention and concentration"
                value={formdata.attentionandconcentration}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="activitylevel"
                label="Activity level"
                value={formdata.activitylevel}
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
                name="emotionalityandbehavior"
                label="Emotionality and behavior"
                value={formdata.emotionalityandbehavior}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="relationshipwithinfamily"
                label="Relationship within/outside family(Significant stressors)"
                value={formdata.relationshipwithinfamily}
              />
            </Grid>

            {/* //store the value into a string of all */}
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

            {/* combine all selection into one string then send to back */}
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
                value={formdata.child} // from selected child
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
            {/* today date  */}
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
