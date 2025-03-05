import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Divider,
  Select,
  FormControl,
  InputLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile Icon
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const buttonStyle = {
  color: "black",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "black",
  },
  marginRight: 2,
};

function Navbar() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, to: "/" },
    { text: "About Us", icon: <InfoIcon />, to: "/aboutus" },
    { text: "Help", icon: <HelpIcon />, to: "/help" },
    { text: "Child Login", icon: <ChildCareIcon />, to: "/" },
    { text: "Login", icon: <LoginIcon />, to: "/signin" },
    { text: "New School Registration", icon: <SchoolIcon />, to: "/newreg" },
    { text: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
    // { text: "Assessments", icon: <DashboardIcon />, to: "/assessment_child" },
  ];

  const open = Boolean(anchorEl);

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(null);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    handleClose();
    // Add your navigation or action code here
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    handleClose();
    // Add your navigation or action code here
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
    handleClose();
    // Add your navigation or action code here
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Role");
    console.log("Logout clicked");
    handleClose();
    setSelectedRole("");
    navigate("/signin");
    // Add your logout logic here
  };

  useEffect(() => {
    //console.log(jwtDecode(localStorage.getItem("token")));
    if (localStorage.getItem("token")) {
      localStorage.setItem(
        "Role",
        jwtDecode(JSON.parse(localStorage.getItem("token")))?.role
      );
      setSelectedRole(localStorage.getItem("Role"));
    }
  }, [localStorage.getItem("token")]);

  //const rolesFunction = jwtDecode(localStorage.getItem("token")).rolesFunction

  const [selectedRole, setSelectedRole] = React.useState(
    localStorage.getItem("Role" || "")
  );

  const handlerolechnage = (event) => {
    setSelectedRole(event.target.value);
  };

  const extraComponent = {
    Assessment_child: { path: "/assessment_child", text: "Assessment" },
    checkup: { path: "/checkup", text: "Medical Checkup" },
  };
  const rolesFunction = {
    SpecialEducator: ["Assessment_child"],
    MedicalO: ["checkup"],
    Psy: ["nothing"],
    clinicalA: ["nothing"],
    Parent: ["nothing"],
    Admin: ["everything"],
  };

  const allowedItems = rolesFunction[selectedRole] || [];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#AC8968",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: 1200,
          justifyContent: "space-between",
        }}
      >
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Box sx={{ p: 2, width: 200 }}>
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      component={Link}
                      to={item.to}
                      onClick={handleMenuClose}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                  {localStorage.getItem("token") && (
                    <>
                      {allowedItems
                        .map((role) => extraComponent[role])
                        .filter(Boolean) // Remove null values
                        .map((item, index) => (
                          <ListItem
                            button
                            key={index}
                            component={Link}
                            to={item.path}
                          >
                            <ListItemText primary={item.text} />
                          </ListItem>
                        ))}
                    </>
                  )}
                </List>
              </Box>
            </Popover>
          </>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.to}
                sx={buttonStyle}
                variant="h6"
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
            {localStorage.getItem("token") && (
              <>
                {allowedItems
                  .map((role) => extraComponent[role])
                  .filter(Boolean) // Remove null values
                  .map((item, index) => (
                    <Button
                      button
                      key={index}
                      component={Link}
                      to={item.path}
                      sx={buttonStyle}
                      variant="h6"
                    >
                      {item.text}
                    </Button>
                  ))}
              </>
            )}
          </Box>
        )}

        {/* <Grid item xs={6}>
          <FormControl fullWidth>
            <Select
              placeholder="Role"
              size="small"
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  style: {
                    width: "15ch",
                  },
                },
              }}
              sx={{
                width: "10vw",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              value={selectedRole}
              onChange={handlerolechnage}
            >
              <MenuItem value="SpecialE">Special Educator</MenuItem>
              <MenuItem value="MedicalO">Medical Officer</MenuItem>
              <MenuItem value="Psy">psycologist</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        {localStorage.getItem("token") && (
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                value={selectedRole}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                  style: {
                    backgroundColor: "white",
                    borderRadius: "20px",
                    width: "10vw",
                  },
                }}
              />
            </FormControl>
          </Grid>
        )}
        {/* Profile Icon */}
        {localStorage.getItem("token") && (
          <>
            <IconButton
              color="inherit"
              onClick={handleClick}
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={anchorElProfile}
              open={openProfile}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "profile-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleSettingsClick}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleNotificationsClick}>
                <ListItemIcon>
                  <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Notifications</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
