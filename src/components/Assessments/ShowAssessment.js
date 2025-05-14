import React from "react";
import ReinforceAssessment from "./Reinforcement_assessment";
import ISAA from "./ISAA";
import Sensory_assessment from "./Sensory_Screening_Checklist";
import ChildRegistration from "./ChildRegistration";
import ChildCaseHistory from "./ChildCaseHistory";
import IepPartA from "../../IEP/IepPartA";
import IepPartB from "../../IEP/IepPartB";
import SubtaskManager from "../../IEP/SubtaskManager";
import { Button, Dialog, DialogContent } from "@mui/material";
import { API_URL } from "../../Constants/api_url";
import axios from "axios";
import { useState } from "react";
import TaskAnalysisRecord from "../../IEP/TaskAnalysisRecord";
import Create_Training_pacakage from "../CAI/Create_Training_pacakage";
import Create_comprehension from "../CAI/Create_comprehension";
import UploadContent from "../Repository/UploadContent";

export default function ShowAssessment({
  assessmentType,
  selectedChild,
  currentSection,
}) {
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const generateiepreport = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/iepreport/get/${selectedChild.registrationNo}`, //chnages it
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setShowPdfDialog(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating report. Please try again.");
    }
  };

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
        assessmentType === "Update Child Details" && (
          <ChildRegistration selectedChild={selectedChild} />
        )}
      {currentSection === "child-profiling" &&
        assessmentType === "Case History" && <ChildCaseHistory />}
      {currentSection === "iep" && assessmentType === "IEP Part-A" && (
        <IepPartA selectedChild={selectedChild} />
      )}
      {currentSection === "iep" && assessmentType === "IEP Part-B" && (
        <IepPartB selectedChild={selectedChild} />
      )}
      {currentSection === "iep" &&
        assessmentType === "Subtask for shortterm objective" && (
          <SubtaskManager selectedChild={selectedChild} />
        )}

      {currentSection === "iep" && assessmentType === "" && (
        <Button variant="contained" onClick={generateiepreport}>
          Report
        </Button>
      )}
      {currentSection === "iep" &&
        assessmentType === "Task Analysis Record" && (
          <TaskAnalysisRecord selectedChild={selectedChild} />
        )}
      {currentSection === "iep" &&
        assessmentType === "Create Training pacakage" && (
          <Create_Training_pacakage selectedChild={selectedChild} />
        )}
      {currentSection === "iep" &&
        assessmentType === "Create Comprehension" && (
          <Create_comprehension selectedChild={selectedChild} />
        )}
      {currentSection === "iep" && assessmentType === "Upload-Content" && (
        <UploadContent />
      )}

      <Dialog
        open={showPdfDialog}
        onClose={() => {
          setShowPdfDialog(false);
          URL.revokeObjectURL(pdfUrl);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="Assessment Report"
            style={{ border: "none" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
