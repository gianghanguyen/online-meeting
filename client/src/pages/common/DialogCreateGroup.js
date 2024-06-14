import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const DialogCreateGroup = ({
  isOpenDialogCreateGroup,
  handleCloseDialogCreateGroup,
  handleCreateGroup,
  groupName,
  setGroupName,
  groupDesc,
  setGroupDesc,
}) => {
  return (
    <Dialog
      open={isOpenDialogCreateGroup}
      onClose={handleCloseDialogCreateGroup}
    >
      <DialogTitle>Create Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            sx={{ mb: 2 }}
            autoFocus
            fullWidth
            label="Name"
            margin="dense"
            variant="filled"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            multiline
            margin="dense"
            variant="filled"
            label="Description"
            rows={4}
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
          />
        </DialogContentText>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialogCreateGroup}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateGroup}>
            Next
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateGroup;
