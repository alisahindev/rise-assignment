import React from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextInput from "../text-input/TextInput";

interface IAutoCompleteProps extends AutocompleteProps<any, any, any, any> {}

const AutoComplete = ({ ...props }: IAutoCompleteProps) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      sx={{
        display: "inline-block",
        "& input": {
          width: 200,
          bgcolor: "background.paper",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
          borderRadius: 4,
        },
      }}
      id='custom-input-demo'
      options={props.options}
    />
  );
};

export default AutoComplete;
