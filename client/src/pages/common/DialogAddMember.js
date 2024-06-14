import axios from "axios";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DialogAddMember = ({
  isOpenDialogAddMember,
  handleCloseDialogAddMember,
  email,
  setEmail,
}) => {
  const auth = localStorage.getItem("token");

  const [id, setId] = useState(useParams().id);

  const handleAddMember = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/groups/send-invite-email",
        {
          email: email,
          groupId: Number(id),
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      alert('User not found');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) {
      setId(localStorage.getItem("groupId"));
    }
  }, [id]);

  return (
    <Dialog open={isOpenDialogAddMember} onClose={handleCloseDialogAddMember}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent sx={{ width: "30vw" }}>
        <DialogContentText>
          <TextField
            sx={{ mb: 2 }}
            autoFocus
            fullWidth
            label="Email"
            margin="dense"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContentText>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleCloseDialogAddMember();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleAddMember(email);
              handleCloseDialogAddMember();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddMember;
