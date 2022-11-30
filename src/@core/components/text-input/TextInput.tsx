import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { InputBaseProps } from "@mui/material/InputBase/InputBase";
import FormHelperText from "@mui/material/FormHelperText";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 6,
    position: "relative",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    fontSize: 16,
    padding: "8px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 0.1rem ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
  "&.Mui-error": {
    "& .MuiInputBase-input": {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 0.1rem ${alpha(theme.palette.error.main, 0.25)}`,
    },
  },
}));

interface Props extends InputBaseProps {
  label: string;
  helperText?: string | undefined;
  error?: boolean;
}

const TextInput = ({
  onChange,
  value,
  name,
  placeholder,
  type,
  label,
  onFocus,
  error,
  onBlur,
  helperText,
  ...props
}: Props) => {
  return (
    <FormControl fullWidth variant='standard'>
      <InputLabel
        shrink
        htmlFor='jobName'
        sx={{
          color: (theme) =>
            error ? theme.palette.error.main : theme.palette.text.primary,
        }}
      >
        {label}
      </InputLabel>
      <BootstrapInput
        {...props}
        placeholder={placeholder}
        type={type}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value || ""}
        id='jobName'
        onChange={onChange}
        error={error}
      />
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextInput;
