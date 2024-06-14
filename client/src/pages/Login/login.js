import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: username,
        password: password,
      });

      localStorage.setItem("token", response.data.data.token);
      
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        navigate("/groups");
      }
    } catch (error) {
      setLoginStatus("Invalid username or password");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "30vw", mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Login
        </Typography>

        <Box>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Email"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: "red", mb: 1 }}>
            {loginStatus}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleLogin}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
