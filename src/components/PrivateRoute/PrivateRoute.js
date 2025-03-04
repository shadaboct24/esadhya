import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Define roles and their accessible components
const rolesFunction = {
  SpecialEducator: ["Assessment_child"],
  MedicalO: ["checkup"],
  Psy: ["nothing"],
  clinicalA: ["nothing"],
  Parent: ["nothing"],
  Admin: ["everything"],
};

// Define the actual paths
const extraComponent = {
  Assessment_child: { path: "/assessment_child", text: "Assessment" },
  checkup: { path: "/checkup", text: "Medical Checkup" },
};

// Function to check access
const checkAccess = (token, path) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    // Check if token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token"); // Remove expired token
      return false;
    }

    const userRole = decodedToken.role; // Extract role from token
    const allowedItems = rolesFunction[userRole] || [];

    // Admin has access to everything
    if (allowedItems.includes("everything")) return true;

    // Check if the current path is allowed for the role
    return allowedItems.some((role) => extraComponent[role]?.path === path);
  } catch (error) {
    console.error("Invalid Token");
    return false;
  }
};

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const currentPath = location.pathname;

  const isAuthorized = checkAccess(token, currentPath);

  return isAuthorized ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
