import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a theme instance with custom transitions
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
    },
  },
});

const ProgressStepper = ({ setCurrentSection }) => {
  const [activeStep, setActiveStep] = useState(0);
  const chnageProgress = () => {};
  const steps = [
    { label: "child-profiling", id: 0 },
    { label: "assessments", id: 1 },
    { label: "diagnosis", id: 2 },
    { label: "iep", id: 3 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.id}
            onClick={() => {
              setActiveStep(index);
              setCurrentSection(steps[index].label);
            }}
            sx={{
              flex: 1,
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor:
                index === activeStep
                  ? "primary.main"
                  : index < activeStep
                    ? "primary.light"
                    : "background.paper",
              color: index <= activeStep ? "white" : "text.secondary",
              borderRadius:
                index === 0
                  ? "4px 0 0 4px"
                  : index === steps.length - 1
                    ? "0 4px 4px 0"
                    : 0,
              typography: "button",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
              },
              boxShadow: index === activeStep ? 1 : 0,
              borderRadius: 30,
            }}
          >
            {step.label}
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default ProgressStepper;
