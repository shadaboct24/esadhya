import React, { useState } from "react";
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
} from "@mui/material";
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
    { text: "Assessments", icon: <DashboardIcon />, to: "/assessment_child" },
  ];

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#AC8968", alignItems: "center" }}
    >
      <Toolbar
        sx={{ width: "100%", maxWidth: 1200, justifyContent: "space-between" }}
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
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        {/* Profile Icon */}
        <IconButton color="inherit">
          <AccountCircleIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
