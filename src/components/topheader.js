import React from "react";
import { Box, Grid } from "@mui/material";
import LanguageSelector from "./homeCards/languages";

function TopHeader() {
  return (
    <Grid
      container
      justifyContent="center"
      backgroundColor="#3A3838"
      spacing={2}
    >
      <Grid item xs={8}>
        <div
          style={{
            // backgroundColor: "#3A3838",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            // minHeigh: "10px",
            position: "static",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <a
              href="#mainContent"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "#FFFFFF",
              }}
            >
              Skip to main content
            </a>
            <Box
              sx={{
                mr: 0,
                height: "24px",
                borderRight: "1px solid",
                borderColor: "grey.300",
              }}
            />
            <a
              href="/sitemap"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "#FFFFFF",
              }}
            >
              Sitemap
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LanguageSelector />
            </div>
            <Box
              sx={{
                mr: 0,
                height: "24px",
                borderRight: "1px solid",
                borderColor: "grey.300",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  fontSize: "14px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "4px",
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
                  borderRadius: "4px",
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
                  borderRadius: "4px",
                }}
              >
                A-
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default TopHeader;
