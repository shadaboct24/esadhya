import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const buttonStyle = {
  color: "black",
  "&:hover": {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "black",
  },
  marginRight: 2,
};

function Navbar() {
  const isMobile = useMediaQuery("(max-width: 900px)"); // Adjust as needed
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
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
  ];

  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#AC8968",
          //top:120,zIndex:1000
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box sx={{ p: 2, width: 200, boxShadow: 3 }}>
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
            // <Button component={Link} to="/" sx={{ color: 'black' }}>Home</Button>
            <Box sx={{ display: "flex" }}>
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
          <Typography variant="h6">Your Logo</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
