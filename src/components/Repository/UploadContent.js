import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import UploadPictures from "./UploadPictures";
import UploadReinforcement from "./UploadReinforcement";
import EntertainmentLesson from "./EntertainmentLesson";
import EditPictureDescription from "./EditPictureDescription";
import PictureEditandUpdateUpload from "./PictureEditandUpdateUpload";

// Tab data structure for easier management
const tabData = [
  { id: "1", label: "REINFORCEMENTS", component: <UploadReinforcement /> },
  {
    id: "2",
    label: "UPLOAD PICTURES",
    component: <PictureEditandUpdateUpload />,
  },
  {
    id: "3",
    label: "ENTERTAINMENT LESSONS",
    component: <EntertainmentLesson />,
  },
  {
    id: "4",
    label: "PERSONALIZED ENT. LESSONS",
    component: <Typography>Help component will go here</Typography>,
  },
];

export default function UploadContent() {
  const [value, setValue] = React.useState("1");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event, newValue) => {
    setIsLoading(true);
    // Simulate loading when changing tabs (you can remove this in production)
    setTimeout(() => {
      setValue(newValue);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: "70%",
        typography: "body1",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden", // Prevents content from overflowing on small screens
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 0,
            borderColor: "divider",
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: "8px 8px 0 0",
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <TabList value={value} onChange={handleChange} variant="scrollable">
            {tabData.map((tab) => (
              <Tab key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </TabList>
        </Box>

        <Box
          sx={{
            p: 3,
            // width: "70%",
            minHeight: 300,
            position: "relative",
            transition: "all 0.3s ease",
          }}
        >
          {/* Show loading indicator if needed */}
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Render tab panels */}
          {tabData.map((tab) => (
            <TabPanel key={tab.id} value={tab.id} sx={{ p: 0 }}>
              {tab.component}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
}
