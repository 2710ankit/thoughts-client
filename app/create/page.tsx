"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Snackbar } from "@mui/material";
import axiosInterceptorInstance from "../interceptor/interceptor.";
import { useRouter } from "next/navigation";

export default function Page() {
  const [thoughtForm, setThoughtForm] = React.useState({
    place: "",
    thought: "",
  });

  const [thoughtSaved, setThoughtSaved] = React.useState(false);

  const router = useRouter();

  const handleThoughtSend = () => {
    console.log(thoughtForm.place);
    if (thoughtForm.place && thoughtForm.thought) {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const currentTimeString = `${hours}:${minutes}:${seconds}`;

      const data = {
        thought: thoughtForm.thought,
        place: thoughtForm.place,
        time: currentTimeString,
        date: new Date(),
      };

      axiosInterceptorInstance.post("thoughts/", data).then(
        (res) => {
          setThoughtSaved(true);
          router.push("/");
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
            padding:"20px",
            background:"#110b0b" 
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            label="Place"
            multiline
            maxRows={4}
            name="place"
            value={thoughtForm.place}
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
            label="Thought"
            multiline
            rows={10}
            name="thought"
            value={thoughtForm.thought}
            onChange={handleInputChange}
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
            onClick={handleThoughtSend}
          >
            Send
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={thoughtSaved}
        autoHideDuration={1}
        message="Thought Send"
      />
    </Container>
  );
}
