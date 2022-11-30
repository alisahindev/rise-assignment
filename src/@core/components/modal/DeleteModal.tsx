import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Delete from "../icons/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Exclamation from "../icons/Exclamation";
import { useJob } from "src/context";
import RiseButton from "../button/Button";

type Props = {
  id: number;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteModal = ({ id }: Props) => {
  const [open, setOpen] = React.useState(false);

  const { deleteJob } = useJob();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteJob(id);
    handleClose();
  };

  return (
    <div>
      <IconButton
        sx={{
          p: 1,
          borderRadius: "4px",
          backgroundColor: (theme: any) => theme.palette.grey[200],
        }}
        aria-label='delete'
        onClick={handleClickOpen}
      >
        <Delete width='20' />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        sx={{
          "& .MuiDialog-paper": {
            p: `32px 56px`,
          },
        }}
      >
        <DialogTitle
          align='center'
          component={Typography}
          variant='h5'
          fontWeight={700}
          display='flex'
          flexDirection='column'
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            gap: 1,
            "& svg": {
              color: (theme: any) => theme.palette.error.main,
            },
            pt: 0,
          }}
        >
          <Exclamation width='56' />
          {"Are you sure you want to delete it?"}
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            display: "flex",
            "& button": {
              textTransform: "capitalize",
              width: "100%",
              fontWeight: 400,
              fontSize: "16px",
              letterSpacing: "0.5px",
            },
            gap: 4,
            p: 0,
          }}
        >
          <RiseButton variant='contained' color='inherit' onClick={handleClose}>
            Cancel
          </RiseButton>
          <RiseButton variant='contained' color='error' onClick={handleDelete}>
            Approve
          </RiseButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
