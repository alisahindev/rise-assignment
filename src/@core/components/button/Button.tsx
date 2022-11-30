import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface IButtonProps extends ButtonProps {}

const RiseButton = ({ ...props }: IButtonProps) => {
  return (
    <Button {...props} sx={{ p: "8px 16px", borderRadius: "4px" }}>
      {props.children}
    </Button>
  );
};

export default RiseButton;
