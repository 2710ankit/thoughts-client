"use client";
import { Box, TextField, Button, Snackbar, Container } from "@mui/material";
import React from "react";
import axiosInterceptorInstance from "../interceptor/interceptor.";

const Page = () => {
  const [userForm, setThoughtForm] = React.useState({
    username: "",
    password: "",
  });

  const [thoughtSaved, setThoughtSaved] = React.useState(false);

  //   const router = useRouter();

  const handleSignIn = () => {
    if (userForm.username && userForm.password) {
      const data = {
        username: userForm.username,
        password: userForm.password,
      };

      axiosInterceptorInstance.post("auth/sign-in/", data).then(
        (res) => {
          setThoughtSaved(true);
          localStorage.setItem("token", res.data.token);
          //   router.push("/");
        },
        (err) => {}
      );
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setThoughtForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  return (
    <Container style={{ background: "black", height: "100vh" }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            padding: "20px",
            background: "#110b0b",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            label="Username"
            multiline
            maxRows={4}
            name="username"
            value={userForm.username}
            onChange={handleInputChange}
            color="primary"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
          <TextField
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            label="Password"
            multiline
            maxRows={4}
            name="password"
            value={userForm.password}
            onChange={handleInputChange}
            color="primary"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />

          <Button
            variant="outlined"
            style={{ borderColor: "green", color: "green" }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={thoughtSaved}
        autoHideDuration={1}
        message="Login Success"
      />
    </Container>
  );
};

export default Page;
