import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useJob } from "src/context";

const JobListHeader = () => {
  const { jobs, total, filteredCount } = useJob();

  return (
    <Grid
      item
      xs={12}
      justifyContent='space-between'
      display='flex'
      alignItems='center'
    >
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Job List
      </Typography>
      <Typography variant='body2'>{`(${filteredCount}/${total})`}</Typography>
    </Grid>
  );
};

export default JobListHeader;
