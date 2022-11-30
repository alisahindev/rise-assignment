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
import { useJob } from "src/context";
import { priorityColors } from "src/constants";
import AutoCompleteFormInput from "../autocomplete/AutoCompleteFormInput";

type FormData = {
  jobName: string;
  jobPriority: {
    name: string;
    value: number;
  };
};

const CreateBar = () => {
  const { addJob, jobPriorities } = useJob();

  const schema = yup
    .object({
      jobName: yup.string().required("Job name is required").max(255),
      jobPriority: yup.object().required("Job priority is required").nullable(),
    })
    .required();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    addJob(data);
    reset();
  };

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
              <AutoCompleteFormInput
                options={jobPriorities}
                value={value}
                onChange={onChange}
                errors={errors}
              />
            )}
          />
        </Grid>
        <Grid
          item
          lg={1}
          md={2}
          xs={12}
          sx={{
            "& button": {
              mt: "24px",
            },
          }}
        >
          <Button
            type='submit'
            variant='contained'
            fullWidth
            startIcon={<Plus />}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateBar;
