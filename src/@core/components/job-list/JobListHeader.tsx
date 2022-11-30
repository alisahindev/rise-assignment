import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const JobListHeader = () => {
  return (
    <Grid item xs={12}>
      <Typography variant='h6' sx={{ fontWeight: 700, mb: 2 }}>
        Create New Job
      </Typography>
    </Grid>
  );
};

export default JobListHeader;
