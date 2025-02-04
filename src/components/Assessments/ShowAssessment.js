import React from "react";
import ReinforceAssessment from "./Reinforcement_assessment";
import ISAA from "./ISAA";
import Sensory_assessment from "./Sensory_Screening_Checklist";

export default function ShowAssessment({ assessmentType, selectedChild }) {
  return (
    <>
      {assessmentType === "Reinforce" && (
        <ReinforceAssessment selectedChild={selectedChild} />
      )}
      {assessmentType === "ISAA" && <ISAA selectedChild={selectedChild} />}
      {assessmentType === "Sensory Assessment" && (
        <Sensory_assessment selectedChild={selectedChild} />
      )}
    </>
  );
}
