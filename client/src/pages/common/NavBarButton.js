import { Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const NavBarButton = ({ content }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const path = content.split(" ")[0].toLowerCase();
  return (
    <Box sx={{ width: "100%" }}>
      <Button
        sx={{
          width: "100%",
          fontSize: "16px",
          textTransform: "none",
          background: window.location.pathname.includes(path)
            ? "white"
            : "none",
        }}
        onClick={() => navigate(`/groups/${id}/${path}`)}
      >
        {content}
      </Button>
    </Box>
  );
};

export default NavBarButton;
