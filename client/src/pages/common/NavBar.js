import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Group, NavBarButton } from "../common";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const NavBar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");

  const fetchGroupInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setGroupId(response.data.data.id);
      setGroupName(response.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);
  return (
    <>
      <Button
        sx={{ fontWeight: "bold", fontSize: "18px", textTransform: "none" }}
        onClick={() => navigate("/groups")}
        startIcon={<ArrowBackIosRoundedIcon />}
      >
        All Group
      </Button>
      <Group groupId={groupId} groupName={groupName} isDisabled={true} />
      <NavBarButton content="General" />
      <NavBarButton content="Members" />
      <NavBarButton content="Schedule Meeting" />
    </>
  );
};

export default NavBar;
