import React, { memo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useJob } from "src/context";
import TextInput from "../text-input/TextInput";
import AutoComplete from "../autocomplete/AutoComplete";
import { priorityColors } from "src/constants";
import {
  debounce,
  InputAdornment,
  ListItem,
  ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";

const JobListHeader = () => {
  const {
    total,
    filteredCount,
    jobPriorities,
    search,
    setSearch,
    selected,
    setSelected,
  } = useJob();

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <Grid container spacing={2}>
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
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            boxShadow: "none",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: "#cdefee",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextInput
                placeholder='Job Name'
                value={search}
                onChange={handleSearch}
                sx={{
                  "& .MuiInputBase-input": {
                    pl: 4,
                  },
                }}
                startAdornment={
                  <InputAdornment
                    position='end'
                    sx={{
                      position: "absolute",
                      left: 0,
                      zIndex: 1,
                      transform: "translate(0,-100%)",
                    }}
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM5 9.5C5 6.47 7.47 4 9.5 4C11.53 4 14 6.47 14 9.5C14 11.25 13.31 12.78 12.24 13.76L11.76 14.24C10.78 13.19 9.25 12.5 7.5 12.5C6.12 12.5 4.88 12.88 4 13.5V9.5H5Z'
                        fill='#8D9A9E'
                      />
                    </svg>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={4}>
              <AutoComplete
                getOptionLabel={(option) => option.label || ""}
                value={selected || ""}
                onChange={(event, newValue) => {
                  setSelected(newValue);
                }}
                options={jobPriorities}
                renderOption={(option: any, opt, state) => {
                  return (
                    <ListItem
                      {...option}
                      components='div'
                      sx={{
                        backgroundColor: (theme: any) =>
                          theme.palette[priorityColors[opt.value]].light,
                      }}
                    >
                      <ListItemText primary={opt.label} />
                    </ListItem>
                  );
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <TextInput {...params} placeholder='Priority' />
                  </div>
                )}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default memo(JobListHeader);
