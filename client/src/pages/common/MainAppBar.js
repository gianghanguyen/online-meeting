import { useState } from "react";
import { Menu, AppBar, Toolbar, MenuItem, IconButton } from "@mui/material";
import profileUser from "../../assets/profile-user.png";
import { useNavigate } from "react-router-dom";

const MainAppBar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          color="inherit"
          aria-haspopup="true"
          aria-controls="menu-appbar"
          onClick={handleOpenMenu}
        >
          <img
            src={profileUser}
            alt="profile-user"
            style={{ width: "32px", height: "32px" }}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate("/login");
              localStorage.removeItem("token");
            }}
          >
            Log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
