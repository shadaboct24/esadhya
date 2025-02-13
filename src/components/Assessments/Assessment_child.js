import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import {
  Home,
  Person,
  Settings,
  Description,
  Logout,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ProgressStepper from "../ProgressBar";
import ReinforceAssessment from "./Reinforcement_assessment";
import ShowAssessment from "./ShowAssessment";
import ChildRegistration from "./ChildRegistration";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light + "33", // Adding transparency
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "& .MuiTableCell-body": {
      color: "black", // Maintaining text color on hover
    },
  },
}));

const SearchTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
});

export default function AssessmentChild() {
  const navigationConfig = {
    "child-profiling": {
      title: "Child Profiling",
      items: [
        {
          name: "Update Child Details",
          path: "/registration",
          icon: <Home />,
        },
        { name: "Case History", path: "/case-history", icon: <Home /> },
      ],
    },
    assessments: {
      title: "Assessments",
      items: [
        { name: "ISAA", path: "/isaa", icon: <Home /> },
        { name: "Reinforce", path: "/reinforce", icon: <Logout /> },
        { name: "Sensory Assessment", path: "/sensory", icon: <Logout /> },
        { name: "MDPS", path: "/mdps", icon: <Person /> },
        { name: "FACP", path: "/facp", icon: <Settings /> },
        { name: "GLAD", path: "/glad", icon: <Description /> },
      ],
    },
    diagnosis: {
      title: "Diagnosis",
      items: [
        { name: "MCHAT", path: "/mchat", icon: <Home /> },
        { name: "Pedigree Chart", path: "/pedigree", icon: <Home /> },
        { name: "DST Chart", path: "/dst", icon: <Home /> },
      ],
    },
    iep: {
      title: "IEP",
      items: [
        { name: "Lesson Plan", path: "/lesson-plan", icon: <Home /> },
        { name: "Annual Plan", path: "/annual-plan", icon: <Home /> },
        {
          name: "Semi Annual Plan",
          path: "/semi-annual-plan",
          icon: <Home />,
        },
      ],
    },
  };
  const children = [
    { id: 1, name: "Abhishek", age: 7, grade: "2nd Grade" },
    { id: 2, name: "Babita", age: 9, grade: "4th Grade" },
    { id: 3, name: "Savita", age: 6, grade: "1st Grade" },
    { id: 4, name: "Saurabh", age: 8, grade: "3rd Grade" },
    { id: 5, name: "Shivam", age: 10, grade: "5th Grade" },
    { id: 6, name: "Shanti", age: 11, grade: "6th Grade" },
    { id: 7, name: "Simran", age: 12, grade: "7th Grade" },
    { id: 8, name: "Kavita", age: 13, grade: "8th Grade" },
    { id: 9, name: "Minal", age: 14, grade: "9th Grade" },
    { id: 10, name: "Priya", age: 15, grade: "10th Grade" },
  ];

  const [selectedChild, setSelectedChild] = useState(null);
  const [isChildConfirmed, setIsChildConfirmed] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChildren, setFilteredChildren] = useState(children);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [currentSection, setCurrentSection] = useState("child-profiling");
  const [assessmentType, setAssessmentType] = useState("Reinforce");

  useEffect(() => {
    const filtered = children.filter((child) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesId = child.id.toString().includes(searchTerm);
      const matchesName = child.name.toLowerCase().includes(searchLower);
      return matchesId || matchesName;
    });
    setFilteredChildren(filtered);
    setPage(0); // Reset to first page when searching
  }, [searchTerm]);

  const handleChildChange = (event) => {
    const childId = event.target.value;
    const child = children.find((child) => child.id === childId);
    setSelectedChild(child);
  };

  const confirmChild = (child) => {
    setSelectedChild(child);
    setIsChildConfirmed(true);
  };

  const resetSelection = () => {
    setSelectedChild(null);
    setIsChildConfirmed(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRowClick = (child) => {
    confirmChild(child);
    setAssessmentType("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90%", // On extra-small devices
      sm: "80%", // On small devices
      md: "70%", // On medium devices
      lg: "60%", // On large devices
    },
    maxHeight: "90vh", // Maximum height of 90% of viewport height
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    overflowY: "auto", // Enable vertical scrolling
    "&:focus": {
      outline: "none", // Remove focus outline
    },
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        margin: 2,
        p: 4,
        minHeight: "55vh",
        //width: "200vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        bgcolor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      {!isChildConfirmed ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              width: "50%",
            }}
          >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={3} sx={{ padding: 1 }}>
                    <SearchTextField
                      size="small"
                      placeholder="Search by ID or Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        width: "75%",
                        "& .MuiOutlinedInput-root": {
                          height: "35px",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleOpen}
                      sx={{ ml: 1, backgroundColor: "#000000" }}
                    >
                      Register New Child
                    </Button>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Child ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Grade</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredChildren
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((child) => (
                    <StyledTableRow
                      key={child.id}
                      onClick={() => handleRowClick(child)}
                      sx={{
                        "&:hover td": {
                          backgroundColor: "primary.light",
                          opacity: 1,
                          color: "black !important",
                        },
                      }}
                    >
                      <StyledTableCell>{child.id}</StyledTableCell>
                      <StyledTableCell align="left">
                        {child.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {child.grade}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredChildren.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          <div>
            {/* <Button onClick={handleOpen}>
              <ControlPointIcon />
            </Button> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <ChildRegistration handleClose={handleClose} />
              </Box>
            </Modal>
          </div>
        </Box>
      ) : (
        // Child Details Card
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              flexGrow: 1,
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#1e293b",
                color: "white",
                borderRadius: "24px",
                maxHeight: "500px",
                ml: 2,
                mt: 2,
              },
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mx: "auto" }}
              >
                {navigationConfig[currentSection].title}
              </Typography>
            </Toolbar>
            <List>
              {navigationConfig[currentSection].items.map((item) => (
                <Link
                  key={item.name}
                  //to={item.path}
                  onClick={() => setAssessmentType(item.name)}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    button
                    sx={{ "&:hover": { backgroundColor: "#374151" } }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ ml: "300px" }}
          >
            <Paper
              elevation={1}
              sx={{
                padding: 2,
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                backgroundColor: "background.paper",
                minWidth: "70vh",
              }}
            >
              <Typography variant="body1">
                Name: {selectedChild.name}
              </Typography>
              <Typography variant="body1">Age: {selectedChild.age}</Typography>
              <Typography variant="body1">
                Grade: {selectedChild.grade}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              onClick={() => {
                setIsChildConfirmed(false);
                setCurrentSection("child-profiling");
              }}
              sx={{ mt: 1 }}
            >
              Change child
            </Button>
            <Box
              sx={{
                minWidth: "900px",
                borderRadius: 30,
                gap: 4,
                mt: 2,
                backgroundColor: "background.paper",
              }}
            >
              <ProgressStepper setCurrentSection={setCurrentSection} />
            </Box>
            {/* <ReinforceAssessment selectedChild={selectedChild} /> */}
            <Typography>
              {currentSection} {assessmentType}
            </Typography>
            {/* {currentSection === "assessments" && ( */}
            <ShowAssessment
              assessmentType={assessmentType}
              selectedChild={selectedChild}
              currentSection={currentSection}
            />
            {/* )} */}
            {/* <ChildRegistration /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
}
