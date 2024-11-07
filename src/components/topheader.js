import React from "react";
import { Box } from "@mui/material";
import LanguageSelector from "./homeCards/languages";

function TopHeader() {
  return (
    <div
            style={{
                backgroundColor: "#3A3838",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height:"15px",
                position:'static',
                //borderBottom:'1px solid black'
            }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <a
          href="#mainContent"
          style={{ textDecoration: "none", fontSize: "14px", color: "#FFFFFF" }}
        >
          Skip to main content
        </a>
        <Box sx={{mr: 0,  height: '24px',  borderRight: '1px solid',borderColor: 'grey.300'}}/>
        <a
          href="/sitemap"
          style={{ textDecoration: "none", fontSize: "14px", color: "#FFFFFF" }}
        >
          Sitemap
        </a>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <span style={{ fontSize: "14px", marginRight: "10px", color:'#FFFFFF' }}>English</span> */}
          <LanguageSelector/>
          {/* <span style={{ fontSize: "14px",color:'#FFFFFF',marginLeft:'10px' }}>हिन्दी</span> */}
        </div>
        <Box sx={{mr: 0,  height: '24px',  borderRight: '1px solid',borderColor: 'grey.300'}}/>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              fontSize: "14px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px"
            }}
          >
            A+
          </button>
          <button
            style={{
              fontSize: "14px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px"
            }}
          >
            A=
          </button>
          <button
            style={{
              fontSize: "14px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px"
            }}
          >
            A-
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
