import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = async () => {
    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/accounts/register`,
        data
      );

      addToast(<p>{response.data.message}</p>, {
        appearance: "success",
        autoDismiss: true,
      });

      navigate("/login");
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
      <Paper maxWidth={600} elevation={5} sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3> Please register</h3>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
              fullWidth
            />
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={onHandleSubmit}
              disabled={!email || !password || !firstName || !lastName}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;
