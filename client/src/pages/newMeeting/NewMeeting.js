import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";

const NewMeeting = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [notification, setNotification] = useState(
    "Send notification to other members"
  );
  const [presentPermission, setPresentPermission] = useState(
    "Everyone can present"
  );

  return (
    <Box sx={{ px: 30, pt: 10 }}>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            pr: 5,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccountCircleIcon />
              <Typography variant="h5">User 1</Typography>
            </Box>
            <Box
              sx={{
                height: "50vh",
                display: "flex",
                background: "black",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mb: 1 }}>
                <IconButton sx={{ mr: 2 }} onClick={() => setIsMicOn(!isMicOn)}>
                  {isMicOn ? (
                    <MicRoundedIcon color="primary" fontSize="large" />
                  ) : (
                    <MicOffRoundedIcon color="error" fontSize="large" />
                  )}
                </IconButton>

                <IconButton onClick={() => setIsCamOn(!isCamOn)}>
                  {isCamOn ? (
                    <VideocamRoundedIcon color="primary" fontSize="large" />
                  ) : (
                    <VideocamOffRoundedIcon color="error" fontSize="large" />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                sx={{ textTransform: "none" }}
                startIcon={<MicRoundedIcon />}
              >
                <Typography variant="h6">Microphone</Typography>
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                startIcon={<VolumeUpRoundedIcon />}
              >
                <Typography variant="h6">Speaker</Typography>
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                startIcon={<VideocamRoundedIcon />}
              >
                <Typography variant="h6">Camera</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ py: 4 }}>
            Setting
          </Typography>
          <Box>
            <Select
              fullWidth
              sx={{ mb: 2 }}
              value={presentPermission}
              onChange={(e) => setPresentPermission(e.target.value)}
            >
              <MenuItem value="Everyone can present">
                Everyone can present
              </MenuItem>
              <MenuItem value="Only Host can present">
                Only Host can present
              </MenuItem>
            </Select>

            <Select
              fullWidth
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
            >
              <MenuItem value="Send notification to other members">
                Send notification to other members
              </MenuItem>
              <MenuItem value="Don't send notification">
                Don't send notification
              </MenuItem>
            </Select>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button variant="contained">Start Meeting</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewMeeting;
