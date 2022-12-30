// import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";

import { FileUploader } from "react-drag-drop-files";

import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { auth, db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

import { useAuthValue } from "./AuthContext";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const theme = createTheme();

export default function SignUp() {
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState("+380");
  const [date, setDate] = useState(dayjs("2022-04-07"));
  const [value, setValue] = useState(null);

  const [error, setError] = useState("");
  const { login } = useAuthValue();

  const handleChange = (newValue) => {
    setPhone(newValue);
  };
  const handleChangeFile1 = (file) => {
    setFile(file);
  };
  const handleChangeFile = () => {
    // if (file == null) return;
    // const imageRef = ref(storage, `images/${file.name + auth.currentUser.uid}`);
    // uploadBytes(imageRef, file).then(() => {
    //   console.log("file upload");
    // });
  };

  const userCollection = collection(db, "users");

  const register = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPass = data.get("password");
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then(async () => {
        await addDoc(userCollection, {
          id: auth.currentUser.uid,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
          phone: phone,
          // file: file,
          date: date.$d,
          lastLogin: Date.now(),
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  fullWidth
                  id="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUploader
                  handleChange={(file) => {
                    handleChangeFile(file);
                  }}
                  id="file"
                  name="file"
                  types={fileTypes}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      disableFuture
                      label="Birthday"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={date}
                      onChange={(date) => {
                        setDate(date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
