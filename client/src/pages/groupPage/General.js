import { useNavigate } from "react-router-dom";
import { MainAppBar, NavBar } from "../common";
import { Box, Button, Grid } from "@mui/material";

const General = () => {
  const navigate = useNavigate();

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
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/new-meeting");
              }}
            >
              New Meeting
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default General;
