import React, { useState } from "react";
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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Home,
  Person,
  Settings,
  Description,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import ReinforceAssessment from "./Reinforcement_assessment";

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
}));

export default function AssessmentChild() {
  const navItems = [
    { name: "ISAA", path: "/", icon: <Home /> },
    { name: "Sensory Checklist", path: "/profile", icon: <Person /> },
    { name: "Reinforce Assessment", path: "/settings", icon: <Settings /> },
    { name: "IEP", path: "/documents", icon: <Description /> },
    { name: "MDPS", path: "/logout", icon: <Logout /> },
  ];
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

  const handleChildChange = (event) => {
    const childId = event.target.value;
    const child = children.find((child) => child.id === childId);
    setSelectedChild(child);
  };

  const confirmChild = () => {
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

  return (
    <Box
      sx={{
        margin: 2,
        p: 4,
        minHeight: "55vh",
        width: "200vh",
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
        <>
          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              width: "50%",
              marginRight: 4,
            }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Child ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Grade</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {children
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((child) => (
                    <StyledTableRow key={child.id}>
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
              count={children.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          {/* Dropdown */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
            <FormControl
              fullWidth
              sx={{
                maxWidth: 400,
                // bgcolor: "white",
                // p: 2,
                // borderRadius: 2,
                // boxShadow: 3,
                // mb: 2,
              }}
            >
              <InputLabel>Select Child</InputLabel>
              <Select
                value={selectedChild ? selectedChild.id : ""}
                onChange={handleChildChange}
                label="Select Child"
                sx={{
                  "& .MuiSelect-select": {
                    p: 2,
                  },
                }}
              >
                {children.map((child) => (
                  <MenuItem key={child.id} value={child.id}>
                    {child.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Child Details Below Dropdown */}
            {selectedChild && (
              <>
                <Card
                  sx={{
                    maxWidth: 400,
                    mt: 2,
                    mb: 2,
                    textAlign: "center",
                    borderRadius: 4,
                    boxShadow: 5,
                    bgcolor: "#e0f7fa",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#006064", mb: 1 }}>
                      {selectedChild.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#004d40", mb: 1 }}
                    >
                      Age: {selectedChild.age}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#004d40" }}>
                      Grade: {selectedChild.grade}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#00695c",
                      "&:hover": { bgcolor: "#004d40" },
                    }}
                    onClick={confirmChild}
                  >
                    Continue with {selectedChild.name}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "#00695c", color: "#00695c" }}
                    onClick={() => setSelectedChild(null)}
                  >
                    Change Child
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </>
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
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#1e293b",
                color: "white",
                borderRadius: "24px",
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
                AssessMents
              </Typography>
            </Toolbar>
            <List>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
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
          <Card
            sx={{
              textAlign: "center",
              borderRadius: 4,
              boxShadow: 5,
              bgcolor: "#e0f7fa",
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ color: "#006064", mb: 2 }}>
                {selectedChild.name}
              </Typography>
              <Typography variant="h6" sx={{ color: "#004d40", mb: 1 }}>
                Age: {selectedChild.age}
              </Typography>
              <Typography variant="h6" sx={{ color: "#004d40", mb: 3 }}>
                Grade: {selectedChild.grade}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#00695c",
                  color: "white",
                  "&:hover": { bgcolor: "#004d40" },
                }}
                onClick={resetSelection}
              >
                Back to Select Child
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
