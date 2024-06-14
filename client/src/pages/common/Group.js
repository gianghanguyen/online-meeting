import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function Group({ groupId, groupName, isDisabled = false }) {
  const hash = hashString(groupName);
  const backgroundColor = getColorFromHash(hash);
  const abbreviation = getAbbreviation(groupName);

  const navigate = useNavigate();

  return (
    <Button
      sx={{ textTransform: "none" }}
      disabled={isDisabled}
      onClick={() => {
        navigate(`/groups/${groupId}/general`);
      }}
    >
      <Box
        sx={{
          width: "200px",
          margin: "20px",
          padding: "10px",
          borderRadius: "5px",
          alignItems: "center",
          display: "inline-flex",
          flexDirection: "column",
          backgroundColor: "#dbe5f2",
        }}
      >
        <Box
          sx={{
            backgroundColor,
            width: "70px",
            height: "70px",
            display: "flex",
            borderRadius: "5px",
            alignItems: "center",
            justifyContent: "center",
            my: 3,
          }}
        >
          <Typography variant="h6" style={{ color: "white" }}>
            {abbreviation}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          style={{
            color: "#000000",
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginBottom: "24px",
            textOverflow: "ellipsis",
          }}
        >
          {groupName}
        </Typography>
      </Box>
    </Button>
  );
};

const getAbbreviation = (groupName) => {
  if (!groupName) return "";
  let abbreviation = "";
  const words = groupName.split(" ");
  for (let i = 0; i < words.length && abbreviation.length < 2; i++) {
    abbreviation += words[i][0].toUpperCase();
  }
  return abbreviation;
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

const getColorFromHash = (hash) => {
  const color =
    "#" +
    ((hash >> 24) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 8) & 0xff).toString(16).padStart(2, "0");
  return color;
};

export default Group;
