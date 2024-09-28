// LoginPage.js
import React, { useState } from "react";
import { useLogin, useNotify, useTranslate } from "react-admin";
import { Button, TextField, Box, Typography } from "@mui/material";

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).catch(() => {
      notify("Invalid email or password");
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f5f5f5">
      <Box component="form" onSubmit={handleSubmit} p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={2}>
          {translate("Login")}
        </Typography>
        <TextField label="Email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField label="Password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {translate("Login")}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
