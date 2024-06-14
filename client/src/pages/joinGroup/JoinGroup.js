import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

const JoinGroup = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  const { groupToken } = useParams();

  const handleDecline = () => {
    navigate("/groups");
  };

  const handleAccept = async () => {
    try {
      await axios.post(
        `http://localhost:3001/groups/users`,
        { token: groupToken },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      navigate("/groups");
    } catch (error) {
      alert('You are already in the group');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth) {
      localStorage.setItem("redirectAfterLogin", `/invite/${groupToken}`);
      navigate("/login");
    }
  }, [auth, navigate, groupToken]);

  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: "flex",
          minWidth: "40vw",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          You've been invited to join this group!
        </Typography>
        <Typography variant="h5">Would you like to join?</Typography>

        <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
          <Button variant="contained" color="error" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="contained" onClick={handleAccept}>
            Accept
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default JoinGroup;
