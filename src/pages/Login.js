import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = async () => {
    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/accounts/login`,
        data
      );

      console.log({ response });

      if (response.status === 200) {
        window.localStorage.setItem(
          "profile",
          JSON.stringify(response.data.data)
        );

        addToast(<p>{response.data.message}</p>, {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      addToast(<p>{err.response.data.message}</p>, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={5} sx={{ padding: "20px" }}>
        <Grid container spacing={3} sx={{ maxWidth: "600px" }}>
          <Grid item xs={12}>
            <h3> Welcome Back</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={onHandleSubmit}
              disabled={!email || !password}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="end">
            Don't have an account ?{" "}
            <Button variant="text" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
