import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../text-input/TextInput";
import AutoComplete from "../autocomplete/AutoComplete";
import Plus from "mdi-material-ui/Plus";
import Button from "../button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetcher } from "src/utils/fetcher";
import { Chip, ListItem, ListItemText } from "@mui/material";

type FormData = {
  jobName: string;
  jobPriority: string;
};

const CreateBar = () => {
  const [jobPriorities, setJobPriorities] = React.useState([]);

  const schema = yup
    .object({
      jobName: yup.string().required("Job name is required").max(255),
      jobPriority: yup.object().required("Job priority is required").nullable(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    fetcher("/server", "GET").then((res) => setJobPriorities(res));
  }, []);

  const priorityColors: any = {
    Urgent: "error",
    Regular: "warning",
    Trivial: "primary",
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' sx={{ fontWeight: 700, mb: 2 }}>
            Create New Job
          </Typography>
        </Grid>
        <Grid item lg={8} md={7} xs={12}>
          <Controller
            name='jobName'
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  label='Job Name'
                  placeholder="What's the job?"
                  onChange={onChange}
                  value={value}
                  // Max 255 characters
                  inputProps={{ maxLength: 255 }}
                  helperText={errors.jobName?.message}
                  error={!!errors.jobName}
                />
              );
            }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Controller
            name='jobPriority'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AutoComplete
                getOptionLabel={(option) => option.label || ""}
                onChange={(e, value) => onChange(value)}
                value={value || ""}
                options={jobPriorities}
                renderOption={(option: any, opt, state) => {
                  return (
                    <ListItem
                      {...option}
                      components='div'
                      sx={{
                        backgroundColor: (theme: any) =>
                          theme.palette[priorityColors[option.key]].light,
                      }}
                    >
                      <ListItemText primary={option.key} />
                    </ListItem>
                  );
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <TextInput
                      {...params}
                      label='Job Priority'
                      placeholder='Choose'
                      error={!!errors.jobPriority}
                      helperText={errors.jobPriority?.message}
                    />
                  </div>
                )}
              />
            )}
          />
        </Grid>
        <Grid item lg={1} md={2} xs={12}>
          <Button
            type='submit'
            variant='contained'
            fullWidth
            startIcon={<Plus />}
            sx={{ justifySelf: "flex-end" }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateBar;
