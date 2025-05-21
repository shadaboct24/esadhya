import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";
import { IoSend } from "react-icons/io5";

// CSS styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  accordionItem: {
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  accordionButton: {
    width: "100%",
    padding: "15px",
    fontSize: "16px",
    backgroundColor: "#f5f5f5",
    border: "none",
    textAlign: "left",
    fontWeight: "600",
    color: "#444",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#e9e9e9",
  },
  arrow: {
    transition: "transform 0.3s",
  },
  arrowRotated: {
    transform: "rotate(180deg)",
  },
  content: {
    padding: "15px",
    lineHeight: "1.5",
    color: "#666",
    borderTop: "1px solid #eee",
  },
};

function FACP({ selectedChild }) {
  const [groups, setGroups] = useState([]);
  const [years, setYears] = useState([]);
  const [terms, setTerms] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    childId: "",
    groupId: "",
    year: "",
    termName: "",
    academicYears: "",
  });
  const responseOptions = [
    "+=Yes",
    "C=Occasional clues",
    "NA=Not Applicable",
    "NE=No Exposure",
    "PP=Physical Prompting",
    "VP=Verbal Prompting",
    "GP=Gestural Prompting",
    "M=Modelling",
    "-(minus)=No",
  ];

  const [expanded, setExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleResponseChange = (subsecId, value) => {
    setResponses((prev) => ({
      ...prev,
      [subsecId]: value,
    }));
  };

  const fetchsectionid = async (groupid, section) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/facp/getsectionId/${groupid}/${section}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching section ID:", error);
      return null;
    }
  };

  const handleAccordionClick = async (panelId, section) => {
    setLoading(true);
    setExpanded(expanded === panelId ? false : panelId);
    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: `${API_URL}/api/facp/getquestionsbygroupandsectionname/${formdata.groupId}/${section}`,
    //   headers: {},
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     //console.log(JSON.stringify(response.data));
    //     setCurrentSection(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const sectionid = await fetchsectionid(formdata.groupId, section);
    let data = {
      childId: formdata.childId,
      groupId: formdata.groupId,
      year: formdata.year,
      termName: formdata.termName,
      sectionId: sectionid,
      sectionName: section,
    };
    console.log("Form Data:", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8082/api/facp/getquestionorresponses",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.message === "questions") {
          setCurrentSection(response.data.response);
        } else if (response.data.message === "responses") {
          // setResponses(response.data.response.responses);
          setCurrentSection(response.data.questions);
          const rawResponses = response.data.response.responses;

          const formattedResponses = rawResponses.reduce((acc, curr) => {
            acc[curr.subsecid] = curr.option;
            return acc;
          }, {});

          setResponses(formattedResponses);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setFormData({
      ...formdata,
      childId: selectedChild.registrationNo,
    });
    fetchgroups();
    fetchyears();
    fetchterms();
    setAcademicYears(getAcademicYears());
  }, []);

  const fetchgroups = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/facp/getallgroups`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchyears = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/facp/getallyears`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setYears(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchterms = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/api/facp/getalltermnames`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setTerms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const years = [];

    for (let i = startYear; i <= currentYear + 1; i++) {
      years.push(`${i}-${i + 1}`);
    }
    return years;
  };

  const handlesubmitQuery = () => {
    console.log("Form Data:", formdata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8082/api/facp/getquestions",
      headers: { "Content-Type": "application/json" },
      data: formdata,
    };

    axios
      .request(config)
      .then((response) => {
        alert("helloo jii");
        setSectionNames(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handlesubmitsection = () => {
    const data = {
      childId: formdata.childId,
      groupId: formdata.groupId,
      year: formdata.year,
      termName: formdata.termName,
      academicYears: formdata.academicYears,
      sectionId: currentSection.sectionid,
      responses: null,
      noofactivity: currentSection.subsection_details.length,
      score: null,
    };
    //in response only those subsectionid and option which are in curentsection
    const filteredResponses = currentSection.subsection_details
      .filter((question) => responses[question.subsecid])
      .map((question) => ({
        subsecid: question.subsecid,
        option: responses[question.subsecid],
      }));
    // score will be number of option have +=yes
    data.score = filteredResponses.filter(
      (response) => response.option === "+=yes"
    ).length;

    //if number of responses is not equal to number of questions
    if (filteredResponses.length !== currentSection.subsection_details.length) {
      alert("Please answer all questions before submitting the form.");
      return;
    }

    data.responses = filteredResponses;
    console.log("Form Data:", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8082/api/facp/submitassessmentofsection",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setExpanded(false);
        setResponses({});
        setCurrentSection({});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Box
        style={styles.container}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Typography style={styles.title}>
            Functional Assessment Checklist For Programming
          </Typography>
        </Box>
        {!sectionNames.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              gap: 4,
              flexDirection: "row",
              mt: 2,
              border: "1px solidrgb(10, 10, 10)",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            <FormControl sx={{ minWidth: "100px" }} variant="standard">
              <InputLabel id="group-label">Group</InputLabel>
              <Select
                labelId="group-label"
                id="group-select"
                value={formdata.groupId}
                onChange={(e) =>
                  setFormData({ ...formdata, groupId: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>Select Group</em>
                </MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.groupName}>
                    {group.groupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "100px" }} variant="standard">
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                id="year-select"
                value={formdata.year}
                onChange={(e) =>
                  setFormData({ ...formdata, year: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>Select Year</em>
                </MenuItem>
                {years.map((year, index) => (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "100px" }} variant="standard">
              <InputLabel id="term-label">Term</InputLabel>
              <Select
                labelId="term-label"
                id="term-select"
                value={formdata.termName}
                onChange={(e) =>
                  setFormData({ ...formdata, termName: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>Select Term</em>
                </MenuItem>
                {terms.map((term, index) => (
                  <MenuItem key={index} value={term}>
                    {term}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "140px" }} variant="standard">
              <InputLabel id="term-label">Academic Year</InputLabel>
              <Select
                labelId="academicyear-label"
                id="academicyear-select"
                value={formdata.academicYears}
                onChange={(e) =>
                  setFormData({ ...formdata, academicYears: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>Select Academic Year</em>
                </MenuItem>
                {academicYears.map((year, index) => (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handlesubmitQuery}
                disableRipple
                sx={{
                  padding: 0,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <IoSend size={28} />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            <div>
              {sectionNames.map((section, index) => (
                <div key={index} style={styles.accordionItem}>
                  <button
                    style={{
                      ...styles.accordionButton,
                      ...(hoveredButton === index ? styles.buttonHover : {}),
                    }}
                    onClick={() =>
                      handleAccordionClick(`panel${index}`, section)
                    }
                    aria-expanded={expanded === `panel${index}`}
                    aria-controls={`panel${index}-content`}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <span>{section}</span>
                    <span
                      style={{
                        ...styles.arrow,
                        ...(expanded === `panel${index}`
                          ? styles.arrowRotated
                          : {}),
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {expanded === `panel${index}` && (
                    <div id={`panel${index}-content`} style={styles.content}>
                      {loading ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          py={2}
                        >
                          <CircularProgress />
                        </Box>
                      ) : (
                        <>
                          {currentSection.subsection_details.map((question) => (
                            <Box key={question.subsecid} mb={2}>
                              <Typography>{question.subsecname}</Typography>
                              <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Select Response</InputLabel>
                                <Select
                                  value={responses[question.subsecid] || ""}
                                  onChange={(e) =>
                                    handleResponseChange(
                                      question.subsecid,
                                      e.target.value
                                    )
                                  }
                                  label="Select Response"
                                >
                                  <MenuItem value="">Choose an option</MenuItem>
                                  {responseOptions.map((option) => (
                                    <MenuItem
                                      key={option}
                                      value={option.toLowerCase()}
                                    >
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          ))}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              mt: 2,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button variant="outlined">cancel</Button>
                            <Button
                              variant="contained"
                              onClick={handlesubmitsection}
                            >
                              Submit
                            </Button>
                          </Box>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Box>
        )}
      </Box>
    </>
  );
}

export default FACP;
