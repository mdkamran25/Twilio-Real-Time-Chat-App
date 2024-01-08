import React, { SyntheticEvent, useState } from "react";
import {
  Grid,
  TextField,
  Card,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Styles {
  header: React.CSSProperties;
  grid: React.CSSProperties;
  card: React.CSSProperties;
  textField: React.CSSProperties;
  gridItem: React.CSSProperties;
  button: React.CSSProperties;
}

interface ChangeEventWithElement<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}

const WelcomeScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const navigate = useNavigate();

  const styles: Styles = {
    header: {paddingBottom: 12, textAlign: "center"},
    grid: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    card: { padding: 40 },
    textField: { width: 300 },
    gridItem: { paddingTop: 12, paddingBottom: 12, display: "flex", justifyContent:'center' },
    button: { width: 300 },
  };

  const handleChange = (event: ChangeEventWithElement<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "room") {
      setRoom(value);
    }
  };

  const login = () => {
    if (email && room) {
      navigate("chat", { state: { room, email } });
    }
  };

  return (
    <React.Fragment>
      <Grid
        style={styles.grid}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card style={styles.card} elevation={10}>
        <Typography variant="h5" style={styles.header}>
           Welcome To Twilio Chat App using React and Programmable Chat Feature
          </Typography>
          <Grid item style={styles.gridItem}>
            <TextField
              name="email"
              required
              style={styles.textField}
              label="Email address"
              placeholder="Enter email address"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item style={styles.gridItem}>
            <TextField
              name="room"
              required
              style={styles.textField}
              label="Room"
              placeholder="Enter room name"
              variant="outlined"
              value={room}
              onChange={handleChange}
            />
          </Grid>
          <Grid item style={styles.gridItem}>
            <Button
              color="primary"
              variant="contained"
              style={styles.button}
              onClick={login}
            >
              Login
            </Button>
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default WelcomeScreen;
