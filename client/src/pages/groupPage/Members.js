import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainAppBar, NavBar, DialogAddMember } from "../common";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MemBers = () => {
  const { id } = useParams();
  const auth = localStorage.getItem("token");

  const [owner, setOwner] = useState({});
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [isOpenDialogAddMember, setIsOpenDialogAddMember] = useState(false);

  const handleCloseDialogAddMember = () => {
    setEmail("");
    setIsOpenDialogAddMember(false);
  };

  const fetchUsersInGroup = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/groups/${id}/users`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      setOwner(response.data.data.owner);
      setMembers(response.data.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersInGroup();
  }, []);

  return (
    <Box>
      <MainAppBar />

      <Grid container>
        <Grid
          item
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            background: "#dbe5f2",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
          }}
        >
          <NavBar />
        </Grid>
        <Grid
          xs
          item
          sx={{
            pt: 2,
            px: 3,
            display: "flex",
            background: "white",
            alignItems: "center",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setIsOpenDialogAddMember(true);
              }}
            >
              Add Member
            </Button>
          </Box>

          <Box sx={{ mt: 2, width: "100%" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Owner</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>{owner.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{owner.email}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Members</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Grid container spacing={2}>
                    {members.map((member) => {
                      return (
                        <React.Fragment key={member.id}>
                          <Grid item xs={6}>
                            <Typography>{member.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{member.email}</Typography>
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>

      <DialogAddMember
        isOpenDialogAddMember={isOpenDialogAddMember}
        handleCloseDialogAddMember={handleCloseDialogAddMember}
        email={email}
        setEmail={setEmail}
      />
    </Box>
  );
};

export default MemBers;
