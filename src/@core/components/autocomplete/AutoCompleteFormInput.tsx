import React from "react";
import AutoComplete from "./AutoComplete";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import TextInput from "../text-input/TextInput";
import { priorityColors } from "src/constants";

interface IAutoCompleteFormInputProps {
  errors?: any;
  options: any;
  value: any;
  onChange: any;
  required?: boolean;
}

const AutoCompleteFormInput = ({
  errors,
  options,
  value,
  onChange,
  required,
}: IAutoCompleteFormInputProps) => {
  return (
    <AutoComplete
      getOptionLabel={(option) => option.label || ""}
      onChange={(e, value) => onChange(value)}
      value={value || ""}
      options={options}
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
          <TextInput
            {...params}
            required={required}
            label='Job Priority'
            placeholder='Choose'
            error={!!errors?.jobPriority}
            helperText={errors?.jobPriority?.message}
          />
        </div>
      )}
    />
  );
};

export default AutoCompleteFormInput;
