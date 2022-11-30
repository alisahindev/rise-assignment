import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useJob } from "src/context";
import {
  Box,
  CardContent,
  IconButton,
  Slide,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import { priorityColors } from "src/constants";
import Chip from "@mui/material/Chip";

const breakpoints = {
  jobName: 8,
  jobPriority: 3,
  action: 1,
};

const JobListContent = () => {
  const { filterJobs, search, selected, sort, setSort } = useJob();
  const containerRef = React.useRef(null);
  const [localData, setLocalData] = React.useState([]);

  useEffect(() => {
    setLocalData(filterJobs(search, selected, sort));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selected, sort.sortBy, sort.order, []]);

  return (
    <Grid item xs={12}>
      <Card sx={{ borderRadius: "2px" }}>
        <CardContent sx={{ p: 0, pb: `0 !important` }}>
          <Grid
            container
            sx={{
              backgroundColor: "#cdefee",
              p: 1,
            }}
          >
            <Grid item xs={breakpoints.jobName}>
              <Typography
                variant='body2'
                color={sort.sortBy === "jobName" ? "primary" : "GrayText"}
                fontWeight={700}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setSort({
                    sortBy: "jobName",
                    order: sort.order === "asc" ? "desc" : "asc",
                  });
                }}
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={breakpoints.jobPriority}>
              <Typography
                variant='body2'
                color={sort.sortBy === "jobPriority" ? "primary" : "GrayText"}
                fontWeight={700}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setSort({
                    sortBy: "jobPriority",
                    order: sort.order === "asc" ? "desc" : "asc",
                  });
                }}
              >
                Priority
              </Typography>
            </Grid>
            <Grid item xs={breakpoints.action} textAlign='center'>
              <Typography variant='body2' color={"GrayText"} fontWeight={700}>
                Action
              </Typography>
            </Grid>
          </Grid>
          <List
            sx={{
              p: 0,
              "& .MuiListItem-root:nth-of-type(odd)": {
                backgroundColor: "#f5f5f5",
              },
              maxHeight: "43vh",
              overflow: "hidden",
              overflowY: "auto",
            }}
            ref={containerRef}
          >
            {localData.length > 0 ? (
              localData.map((job: any) => (
                <Zoom in={true} exit={true} key={job.id}>
                  <ListItem key={job.id} disablePadding>
                    <ListItemButton sx={{ p: 1, py: 2 }} disableTouchRipple>
                      <Grid container>
                        <Grid item xs={breakpoints.jobName}>
                          <ListItemText primary={job.jobName} />
                        </Grid>
                        <Grid item xs={breakpoints.jobPriority}>
                          <Chip
                            label={job.jobPriority.label}
                            sx={{
                              backgroundColor: (theme: any) =>
                                theme.palette[
                                  priorityColors[job.jobPriority.value]
                                ].light,
                              borderRadius: "4px",
                              color: "white",
                              fontWeight: 700,
                            }}
                          />
                        </Grid>
                        <Grid item xs={breakpoints.action}>
                          <Stack
                            direction='row'
                            justifyContent={"center"}
                            spacing={1}
                            margin='auto'
                          >
                            <IconButton
                              sx={{
                                p: 1,
                                borderRadius: "4px",
                                backgroundColor: (theme) =>
                                  theme.palette.grey[200],
                              }}
                              aria-label='edit'
                            >
                              <Edit width='20' />
                            </IconButton>
                            <IconButton
                              sx={{
                                p: 1,
                                borderRadius: "4px",
                                backgroundColor: (theme) =>
                                  theme.palette.grey[200],
                              }}
                              aria-label='delete'
                            >
                              <Delete width='20' />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                </Zoom>
              ))
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography variant='body2' color={"GrayText"} fontWeight={700}>
                  No Jobs Found
                </Typography>
              </Box>
            )}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobListContent;
