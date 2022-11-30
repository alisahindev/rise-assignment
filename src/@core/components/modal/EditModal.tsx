import React, { useEffect } from "react";
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
import Edit from "../icons/Edit";
import { IJobType } from "src/context/JobContext";
import TextInput from "../text-input/TextInput";
import AutoCompleteFormInput from "../autocomplete/AutoCompleteFormInput";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type Props = {
  job: IJobType;
};

const EditModal = ({ job }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] = React.useState(
    job.jobPriority
  );

  const { editJob, jobPriorities } = useJob();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    editJob({ ...job, jobPriority: selectedPriority });
    handleClose();
  };

  useEffect(() => {
    setSelectedPriority(job.jobPriority);
  }, [job.jobPriority]);

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
        <Edit width='20' />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        sx={{
          "& .MuiDialog-paper": {
            p: `24px 36px 32px`,
          },
        }}
        maxWidth='sm'
        fullWidth
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
        >
          {"Job Edit"}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2 }}>
          <TextInput
            label='Job Name'
            value={job.jobName}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
          <AutoCompleteFormInput
            options={jobPriorities}
            value={selectedPriority}
            onChange={(value: any) => {
              setSelectedPriority(value);
            }}
            required
          />
        </DialogContent>
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
            px: 4,
          }}
        >
          <RiseButton variant='contained' color='inherit' onClick={handleClose}>
            Cancel
          </RiseButton>
          <RiseButton variant='contained' color='error' onClick={handleEdit}>
            Approve
          </RiseButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditModal;
