import React from "react";
import ReinforceAssessment from "./Reinforcement_assessment";
import ISAA from "./ISAA";
import Sensory_assessment from "./Sensory_Screening_Checklist";
import { Typography } from "@mui/material";
import ChildRegistration from "./ChildRegistration";

export default function ShowAssessment({
  assessmentType,
  selectedChild,
  currentSection,
}) {
  return (
    <>
      {assessmentType === "Reinforce" && currentSection === "assessments" && (
        <ReinforceAssessment selectedChild={selectedChild} />
      )}
      {assessmentType === "ISAA" && currentSection === "assessments" && (
        <ISAA selectedChild={selectedChild} />
      )}
      {assessmentType === "Sensory Assessment" &&
        currentSection === "assessments" && (
          <Sensory_assessment selectedChild={selectedChild} />
        )}
      {currentSection === "child-profiling" &&
        assessmentType === "Child Registration" && <ChildRegistration />}
    </>
  );
}
