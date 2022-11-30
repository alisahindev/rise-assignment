import React from "react";
import JobListContent from "./JobListContent";
import JobListHeader from "./JobListHeader";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

const JobList = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <JobListHeader />
      <JobListContent />
    </Box>
  );
};

export default JobList;
