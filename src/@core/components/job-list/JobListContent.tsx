import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useJob } from "src/context";
import { Box, CardContent, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const JobListContent = () => {
  const { jobs } = useJob();

  return (
    <Grid item xs={12}>
      <Card sx={{ borderRadius: "2px" }}>
        <CardContent sx={{ p: 0, pb: `0 !important` }}>
          <Box
            display='flex'
            sx={{
              backgroundColor: "#cdefee",
              p: 1,
            }}
          >
            <Grid item xs={8}>
              Name
            </Grid>
            <Grid item xs={3}>
              Priority
            </Grid>
            <Grid item xs={1} textAlign='center'>
              Action
            </Grid>
          </Box>
          <List sx={{ p: 0 }}>
            {jobs.map((job: any) => (
              <ListItem key={job.id} disablePadding>
                <ListItemButton sx={{ p: 1, py: 2 }}>
                  <Grid container>
                    <Grid item xs={8}>
                      <ListItemText primary={job.jobName} />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText primary={job.jobPriority} />
                    </Grid>
                    <Grid item xs={1}>
                      <Stack direction='row' spacing={1} margin='auto'>
                        <IconButton aria-label='edit'>
                          <Edit />
                        </IconButton>
                        <IconButton aria-label='delete'>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobListContent;
