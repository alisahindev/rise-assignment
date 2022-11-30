import React from "react";
import JobListContent from "./JobListContent";
import JobListHeader from "./JobListHeader";
import Grid from "@mui/material/Grid";

const JobList = () => {
  return (
    <Grid container spacing={2} marginTop={4}>
      <JobListHeader />
      <JobListContent />
    </Grid>
  );
};

export default JobList;
