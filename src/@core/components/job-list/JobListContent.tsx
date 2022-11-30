import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";

const JobListContent = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        <ListItem disablePadding></ListItem>
        <ListItem disablePadding>
          <ListItemText primary='Drafts' />
        </ListItem>
      </List>
    </Box>
  );
};

export default JobListContent;
