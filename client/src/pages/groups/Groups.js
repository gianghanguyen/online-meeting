import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  Group,
  MainAppBar,
  DialogAddMember,
  DialogCreateGroup,
} from "../common";

const Groups = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [ownerGroupList, setOwnerGroupList] = useState([]);
  const [memberGroupList, setMemberGroupList] = useState([]);
  const [isOpenDialogAddMember, setIsOpenDialogAddMember] = useState(false);
  const [isOpenDialogCreateGroup, setIsOpenDialogCreateGroup] = useState(false);

  const handleOpenDialogCreateGroup = () => {
    setIsOpenDialogCreateGroup(true);
  };

  const handleCloseDialogCreateGroup = () => {
    setNewGroupName("");
    setNewGroupDesc("");
    setIsOpenDialogCreateGroup(false);
  };

  const handleCreateGroup = async () => {
    handleCloseDialogCreateGroup();
    setIsOpenDialogAddMember(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/groups",
        {
          name: newGroupName,
          description: newGroupDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      const groupId = response.data.data.id;
      localStorage.setItem("groupId", groupId);

      fetchGroupList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialogAddMember = () => {
    setEmail("");
    setIsOpenDialogAddMember(false);
  };

  const fetchGroupList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/groups", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      const groupList = response.data.data;
      const ownerGroups = groupList.filter((group) => group.isOwner);
      const memberGroups = groupList.filter((group) => !group.isOwner);

      setOwnerGroupList(ownerGroups);
      setMemberGroupList(memberGroups);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchGroupList();
  }, []);

  return (
    <Box>
      <MainAppBar />

      <Box sx={{ px: "24px" }}>
        <Box
          sx={{
            my: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              sx={{ mr: 1 }}
              variant="outlined"
              onClick={handleOpenDialogCreateGroup}
            >
              Create Group
            </Button>
            <Button variant="outlined">Pending Invites</Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/new-meeting");
            }}
          >
            New Meeting
          </Button>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ my: 2 }}>
            Groups
          </Typography>
          <Box sx={{ display: "wrap", flexWrap: "wrap" }}>
            {memberGroupList.map((group) => {
              return (
                <Group
                  key={group.id}
                  groupId={group.id}
                  groupName={group.name}
                />
              );
            })}
          </Box>
          <Typography variant="h5" sx={{ my: 2 }}>
            My Groups
          </Typography>
          <Box sx={{ display: "wrap", flexWrap: "wrap" }}>
            {ownerGroupList.map((group) => {
              return (
                <Group
                  key={group.id}
                  groupId={group.id}
                  groupName={group.name}
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      <DialogCreateGroup
        isOpenDialogCreateGroup={isOpenDialogCreateGroup}
        handleCloseDialogCreateGroup={handleCloseDialogCreateGroup}
        handleCreateGroup={handleCreateGroup}
        groupName={newGroupName}
        setGroupName={setNewGroupName}
        groupDesc={newGroupDesc}
        setGroupDesc={setNewGroupDesc}
      />

      <DialogAddMember
        isOpenDialogAddMember={isOpenDialogAddMember}
        handleCloseDialogAddMember={handleCloseDialogAddMember}
        email={email}
        setEmail={setEmail}
      />
    </Box>
  );
};

export default Groups;
